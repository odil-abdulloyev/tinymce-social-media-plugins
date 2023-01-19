import tinymce from 'tinymce';
import { pasteHtmlAtCaret } from '../utils/pasteHtmlAtCaret';

const INSTAGRAM_WIDGET_NAME = 'instagramembed';
const INSTAGRAM_POST_URL_REGEX =
  /(https?:\/\/(www\.)?instagram\.com\/p\/([a-z0-9_-])+)/i;
const INSTAGRAM_WIDGET_SCRIPT = '//www.instagram.com/embed.js';

tinymce.PluginManager.add(INSTAGRAM_WIDGET_NAME, (editor, url) => {
  editor.ui.registry.addIcon(
    'instagram',
    `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 40 40"><path fill="#8585cc" d="M30.5,38.5c4.418,0,8-3.582,8-8v-21c0-4.418-3.582-8-8-8h-21c-4.418,0-8,3.582-8,8v21 c0,4.418,3.582,8,8,8H30.5z"></path><path fill="#8d8dd8" d="M3.4,4.331C2.217,5.726,1.5,7.528,1.5,9.5v21c0,4.418,3.582,8,8,8h21c4.418,0,8-3.582,8-8v-21 c0-0.503-0.052-0.992-0.141-1.469C32.135,4.22,24.832,2,17,2C12.229,2,7.657,2.832,3.4,4.331z"></path><path fill="#bd82f4" d="M1.505,9.404C1.504,9.437,1.5,9.468,1.5,9.5v21c0,4.418,3.582,8,8,8h21c4.418,0,8-3.582,8-8V12.897 C32.439,8.56,25.021,6,17,6C11.465,6,6.22,7.226,1.505,9.404z"></path><path fill="#ed73f4" d="M1.5,13.88V30.5c0,4.418,3.582,8,8,8h21c4.418,0,8-3.582,8-8V17.981C32.724,13.013,25.217,10,17,10 C11.394,10,6.124,11.414,1.5,13.88z"></path><path fill="#f97dcd" d="M17,14c-5.705,0-11.014,1.664-15.5,4.509V30.5c0,4.418,3.582,8,8,8h21c4.418,0,8-3.582,8-8v-6.935 C33.194,17.698,25.534,14,17,14z"></path><path fill="#fc9c95" d="M17,18c-5.861,0-11.237,2.033-15.5,5.411V30.5c0,4.418,3.582,8,8,8h21c4.418,0,8-3.582,8-8v-0.238 C34.143,22.925,26.152,18,17,18z"></path><path fill="#ffac99" d="M17,22c-6.145,0-11.66,2.651-15.5,6.859V30.5c0,4.418,3.582,8,8,8h21c2.465,0,4.668-1.117,6.136-2.87 C33.648,27.674,25.999,22,17,22z"></path><path fill="#ffc49c" d="M30.5,38.5c0.957,0,1.87-0.177,2.721-0.485C31.087,31.065,24.649,26,17,26 c-6.186,0-11.592,3.309-14.566,8.248C3.778,36.777,6.437,38.5,9.5,38.5H30.5z"></path><path fill="#ffde8d" d="M17,30c-5.137,0-9.573,2.984-11.684,7.309C6.535,38.06,7.964,38.5,9.5,38.5h19.683 C27.35,33.542,22.595,30,17,30z"></path><path fill="#fff69f" d="M17,34c-3.319,0-6.193,1.813-7.753,4.487C9.332,38.49,9.415,38.5,9.5,38.5h15.26 C23.203,35.818,20.324,34,17,34z"></path><path fill="#8b75a1" d="M31,2c3.86,0,7,3.14,7,7v22c0,3.86-3.14,7-7,7H9c-3.86,0-7-3.14-7-7V9c0-3.86,3.14-7,7-7H31 M31,1H9 C4.582,1,1,4.582,1,9v22c0,4.418,3.582,8,8,8h22c4.418,0,8-3.582,8-8V9C39,4.582,35.418,1,31,1L31,1z"></path><path fill="#fff" d="M27.5 11A1.5 1.5 0 1 0 27.5 14A1.5 1.5 0 1 0 27.5 11Z"></path><path fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" d="M20 14A6 6 0 1 0 20 26A6 6 0 1 0 20 14Z"></path><path fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" d="M33,14.5c0-4.142-3.358-7.5-7.5-7.5 c-2.176,0-8.824,0-11,0C10.358,7,7,10.358,7,14.5c0,2.176,0,8.824,0,11c0,4.142,3.358,7.5,7.5,7.5c2.176,0,8.824,0,11,0 c4.142,0,7.5-3.358,7.5-7.5C33,23.324,33,16.676,33,14.5z"></path></svg>`
  );

  editor.ui.registry.addButton(INSTAGRAM_WIDGET_NAME, {
    icon: 'instagram',
    tooltip: 'Embed instagram post',
    onAction() {
      editor.windowManager.open({
        title: 'Embed instagram post',
        body: {
          type: 'panel',
          items: [
            {
              type: 'input',
              name: 'url',
              label: 'Instagram post url',
              placeholder: 'https://www.instagram.com/p/C',
              inputMode: 'url',
            },
            {
              type: 'input',
              name: 'width',
              label: 'Width',
            },
            {
              type: 'checkbox',
              name: 'captioned',
              label: 'Include caption',
            },
          ],
        },
        initialData: {
          url: '',
          width: '455px',
          captioned: false,
        },
        buttons: [
          { type: 'cancel', text: 'Cancel' },
          { type: 'submit', text: 'Save', primary: true },
        ],
        onSubmit(api) {
          const { url, width, captioned } = api.getData();
          const permalink = INSTAGRAM_POST_URL_REGEX.exec(url)?.[1];
          if (permalink) {
            const html = `<div data-instgrm-permalink="${permalink}"${
              captioned ? 'data-instgrm-captioned="true"' : ''
            } data-width="${width}"></div>`;
            pasteHtmlAtCaret(editor.contentWindow, html);
            const containers =
              editor.contentDocument.querySelectorAll<HTMLElement>(
                '[data-instgrm-permalink]'
              );
            containers.forEach((container) => {
              loadInstagramWidgetScript(container, editor.contentWindow);
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
        name: 'Instagram',
        url,
      };
    },
  };
});

const loadInstagramWidgetScript = (
  container: HTMLElement,
  ctx: Window,
  version?: number
) => {
  const script = document.createElement('script');
  script.async = true;
  script.src = INSTAGRAM_WIDGET_SCRIPT;
  const blockquote = document.createElement('blockquote');
  blockquote.className = 'instagram-media';
  blockquote.style.maxWidth = '100%';
  if (container.dataset.width) {
    blockquote.style.width = container.dataset.width;
  }
  Object.entries(container.dataset).forEach(([name, value]) => {
    blockquote.dataset[name] = value;
  });
  if (version) {
    blockquote.dataset.widgetVersion = version.toString();
  }
  container.replaceChildren(blockquote, script);
  script.onload = () => {
    const windowWithInstgrm = ctx as any;
    if (
      windowWithInstgrm.instgrm &&
      windowWithInstgrm.instgrm.Embeds &&
      typeof windowWithInstgrm.instgrm.Embeds.process === 'function'
    ) {
      windowWithInstgrm.instgrm.Embeds.process();
    }
  };
};
