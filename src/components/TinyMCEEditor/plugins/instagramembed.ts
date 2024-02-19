import tinymce from 'tinymce';

const INSTAGRAM_WIDGET_NAME = 'instagramembed';
const INSTAGRAM_POST_URL_REGEX =
  /(https?:\/\/(www\.)?instagram\.com\/p\/([a-z0-9_-])+)/i;
const INSTAGRAM_WIDGET_SCRIPT = '//www.instagram.com/embed.js';

tinymce.PluginManager.add(INSTAGRAM_WIDGET_NAME, (editor, url) => {
  editor.ui.registry.addIcon(
    'instagram',
    `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 102 102"><defs><radialGradient id="a" cx="6.601" cy="99.766" r="129.502" gradientUnits="userSpaceOnUse"><stop offset=".09" stop-color="#fa8f21"/><stop offset=".78" stop-color="#d82d7e"/></radialGradient><radialGradient id="b" cx="70.652" cy="96.49" r="113.963" gradientUnits="userSpaceOnUse"><stop offset=".64" stop-color="#8c3aaa" stop-opacity="0"/><stop offset="1" stop-color="#8c3aaa"/></radialGradient></defs><path fill="url(#a)" d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361" data-name="Path 16"/><path fill="url(#b)" d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361" data-name="Path 17"/><path fill="#fff" d="M461.114,477.413a12.631,12.631,0,1,1,12.629,12.632,12.631,12.631,0,0,1-12.629-12.632m-6.829,0a19.458,19.458,0,1,0,19.458-19.458,19.457,19.457,0,0,0-19.458,19.458m35.139-20.229a4.547,4.547,0,1,0,4.549-4.545h0a4.549,4.549,0,0,0-4.547,4.545m-30.99,51.074a20.943,20.943,0,0,1-7.037-1.3,12.547,12.547,0,0,1-7.193-7.19,20.923,20.923,0,0,1-1.3-7.037c-.184-3.994-.22-5.194-.22-15.313s.04-11.316.22-15.314a21.082,21.082,0,0,1,1.3-7.037,12.54,12.54,0,0,1,7.193-7.193,20.924,20.924,0,0,1,7.037-1.3c3.994-.184,5.194-.22,15.309-.22s11.316.039,15.314.221a21.082,21.082,0,0,1,7.037,1.3,12.541,12.541,0,0,1,7.193,7.193,20.926,20.926,0,0,1,1.3,7.037c.184,4,.22,5.194.22,15.314s-.037,11.316-.22,15.314a21.023,21.023,0,0,1-1.3,7.037,12.547,12.547,0,0,1-7.193,7.19,20.925,20.925,0,0,1-7.037,1.3c-3.994.184-5.194.22-15.314.22s-11.316-.037-15.309-.22m-.314-68.509a27.786,27.786,0,0,0-9.2,1.76,19.373,19.373,0,0,0-11.083,11.083,27.794,27.794,0,0,0-1.76,9.2c-.187,4.04-.229,5.332-.229,15.623s.043,11.582.229,15.623a27.793,27.793,0,0,0,1.76,9.2,19.374,19.374,0,0,0,11.083,11.083,27.813,27.813,0,0,0,9.2,1.76c4.042.184,5.332.229,15.623.229s11.582-.043,15.623-.229a27.8,27.8,0,0,0,9.2-1.76,19.374,19.374,0,0,0,11.083-11.083,27.716,27.716,0,0,0,1.76-9.2c.184-4.043.226-5.332.226-15.623s-.043-11.582-.226-15.623a27.786,27.786,0,0,0-1.76-9.2,19.379,19.379,0,0,0-11.08-11.083,27.748,27.748,0,0,0-9.2-1.76c-4.041-.185-5.332-.229-15.621-.229s-11.583.043-15.626.229" data-name="Path 18" transform="translate(-422.637 -426.196)"/></svg>`
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
            editor.insertContent(html);
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
