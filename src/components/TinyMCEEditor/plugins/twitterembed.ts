import tinymce from 'tinymce';
import { pasteHtmlAtCaret } from '../utils/pasteHtmlAtCaret';

const TWITTER_PLUGIN_NAME = 'twitterembed';
const TWITTER_POST_URL_REGEX =
  /https?:\/\/(www\.)?twitter\.com\/[a-z0-9_-]+\/status\/(\d+)/i;
const TWITTER_WIDGET_SCRIPT = 'https://platform.twitter.com/widgets.js';

tinymce.PluginManager.add(TWITTER_PLUGIN_NAME, (editor, url) => {
  editor.ui.registry.addIcon(
    'twitter',
    `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48"><path fill="#03A9F4" d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"></path></svg>`
  );

  editor.ui.registry.addButton(TWITTER_PLUGIN_NAME, {
    icon: 'twitter',
    tooltip: 'Embed twitter post',
    onAction() {
      editor.windowManager.open({
        title: 'Embed twitter post',
        body: {
          type: 'panel',
          classes: ['ok'],
          items: [
            {
              type: 'input',
              name: 'url',
              label: 'Twitter post url',
              placeholder:
                'https://twitter.com/Twitter/status/1601692766257709056',
              inputMode: 'url',
            },
            {
              type: 'input',
              name: 'width',
              label: 'Width',
            },
            {
              type: 'input',
              name: 'lang',
              label: 'Language',
            },
            {
              type: 'checkbox',
              name: 'dark',
              label: 'Dark theme',
            },
          ],
        },
        initialData: {
          url: '',
          width: '455px',
          lang: 'ru',
          dark: false,
        },
        buttons: [
          { type: 'cancel', text: 'Cancel' },
          { type: 'submit', text: 'Save', primary: true },
        ],
        onSubmit(api) {
          const { url, lang, dark, width } = api.getData();
          const tweetId = TWITTER_POST_URL_REGEX.exec(url)?.[2];
          if (tweetId) {
            const html = `<div data-tweet-id="${tweetId}" data-lang="${lang}" data-theme="${
              dark ? 'dark' : 'light'
            }" style="width:${width};max-width:100%"></div>`;
            pasteHtmlAtCaret(editor.contentWindow, html);
            const containers =
              editor.contentDocument.querySelectorAll<HTMLElement>(
                '[data-tweet-id]'
              );
            containers.forEach((container) => {
              loadTwitterWidgetScript(container, editor.contentWindow);
            });
            api.close();
          } else {
            api.redial({
              title: 'Error',
              body: {
                type: 'panel',
                items: [
                  {
                    type: 'alertbanner',
                    text: 'Invalid url',
                    level: 'error',
                    icon: 'warning',
                  },
                ],
              },
              buttons: [{ type: 'cancel', text: 'Close', primary: true }],
            });
          }
        },
      });
    },
  });

  return {
    getMetadata() {
      return {
        name: 'Twitter',
        url,
      };
    },
  };
});

const loadTwitterWidgetScript = (
  container: HTMLElement,
  ctx: Window,
  version?: number
) => {
  const script = document.createElement('script');
  script.async = true;
  script.src = TWITTER_WIDGET_SCRIPT;
  const ctxWithTwttr = ctx as any;
  script.onload = () => {
    if (
      ctxWithTwttr.twttr &&
      ctxWithTwttr.twttr.widgets &&
      typeof ctxWithTwttr.twttr.widgets.createTweetEmbed === 'function'
    ) {
      const tweetId = container.dataset.tweetId;
      const lang = container.dataset.lang;
      const theme = container.dataset.theme;
      ctxWithTwttr.twttr.widgets.createTweetEmbed(tweetId, container, {
        lang: lang,
        theme: theme,
        widgetsVersion: version,
      });
    }
  };
  container.replaceChildren(script);
};
