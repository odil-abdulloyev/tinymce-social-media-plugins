import tinymce from 'tinymce';
import { pasteHtmlAtCaret } from '../utils/pasteHtmlAtCaret';

const TELEGRAM_POST_URL_REGEX =
  /https?:\/\/(www\.)?(t|telegram)\.me\/([a-z0-9_-]+\/\d+)\/?$/i;
const TELEGRAM_WIDGET_SCRIPT = 'https://telegram.org/js/telegram-widget.js';
const TELEGRAM_PLUGIN_NAME = 'telegramembed';

tinymce.PluginManager.add(TELEGRAM_PLUGIN_NAME, (editor, url) => {
  editor.ui.registry.addIcon(
    'telegram',
    `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48"><path fill="#29b6f6" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"></path><path fill="#fff" d="M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 c-0.001-0.001,0.651-0.235,1.126-0.234C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z"></path><path fill="#b0bec5" d="M23,30.505l-3.426,3.374c0,0-0.149,0.115-0.348,0.12c-0.069,0.002-0.143-0.009-0.219-0.043 l0.964-5.965L23,30.505z"></path><path fill="#cfd8dc" d="M29.897,18.196c-0.169-0.22-0.481-0.26-0.701-0.093L16,26c0,0,2.106,5.892,2.427,6.912 c0.322,1.021,0.58,1.045,0.58,1.045l0.964-5.965l9.832-9.096C30.023,18.729,30.064,18.416,29.897,18.196z"></path></svg>`
  );

  editor.ui.registry.addButton(TELEGRAM_PLUGIN_NAME, {
    icon: 'telegram',
    tooltip: 'Embed telegram post',
    onAction() {
      editor.windowManager.open({
        title: 'Embed telegram post',
        body: {
          type: 'panel',
          items: [
            {
              type: 'input',
              name: 'url',
              label: 'Telegram post url',
              placeholder: 'https://t.me/telegram/123',
              inputMode: 'url',
            },
            {
              type: 'input',
              name: 'width',
              label: 'Width',
            },
            {
              type: 'checkbox',
              name: 'dark',
              label: 'Dark theme',
            },
            {
              type: 'checkbox',
              name: 'userpic',
              label: 'Show avatar',
            },
            {
              type: 'colorpicker',
              name: 'color',
            },
          ],
        },
        buttons: [
          { type: 'cancel', text: 'Cancel' },
          { type: 'submit', text: 'Save', primary: true },
        ],
        initialData: {
          url: '',
          width: '455px',
          dark: false,
          userpic: true,
          color: '#2481cc',
        },
        onSubmit(api) {
          const { url, width, dark, userpic, color } = api.getData();
          const telegramPostId = TELEGRAM_POST_URL_REGEX.exec(url)?.[3];
          if (telegramPostId) {
            const html = `<div style="max-width:100%;width:${width}"><div data-telegram-post="${telegramPostId}" data-width="100%" data-userpic="${userpic}" data-color="${color}" data-dark="${
              dark ? 1 : 0
            }"></div></div>`;
            pasteHtmlAtCaret(editor.contentWindow, html);
            const containers =
              editor.contentDocument.querySelectorAll<HTMLElement>(
                '[data-telegram-post]'
              );
            containers.forEach((container) => {
              loadTelegramWidgetScript(container);
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
        name: 'Telegram',
        url,
      };
    },
  };
});

const loadTelegramWidgetScript = (container: HTMLElement, version?: number) => {
  const src = version
    ? `${TELEGRAM_WIDGET_SCRIPT}?${version}`
    : TELEGRAM_WIDGET_SCRIPT;
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  Object.entries(container.dataset).forEach(([name, value]) => {
    script.dataset[name] = value;
  });
  container.replaceChildren(script);
};
