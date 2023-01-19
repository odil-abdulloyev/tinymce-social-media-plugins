import tinymce from 'tinymce';
import { pasteHtmlAtCaret } from '../utils/pasteHtmlAtCaret';

const YOUTUBE_PLUGIN_NAME = 'youtubeembed';
const YOUTUBE_POST_URL_REGEX =
  /https?:\/\/((youtu\.be\/([a-z0-9_-]+))|(www\.)?youtube\.com\/watch\/?\?v=([a-z0-9_-]+))/i;

tinymce.PluginManager.add(YOUTUBE_PLUGIN_NAME, (editor, url) => {
  editor.ui.registry.addIcon(
    'youtube',
    `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48"><path fill="#FF3D00" d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"></path><path fill="#FFF" d="M20 31L20 17 32 24z"></path></svg>`
  );

  editor.ui.registry.addButton(YOUTUBE_PLUGIN_NAME, {
    icon: 'youtube',
    tooltip: 'Embed youtube video',
    onAction() {
      editor.windowManager.open({
        title: 'Embed youtube video',
        body: {
          type: 'panel',
          items: [
            {
              type: 'input',
              name: 'url',
              label: 'Youtube video url',
              placeholder: 'https://youtu.be/jNQXAC9IVRw',
              inputMode: 'url',
            },
            {
              type: 'input',
              name: 'start',
              label: 'Start time (seconds)',
              inputMode: 'numeric',
            },
            {
              type: 'checkbox',
              name: 'controls',
              label: 'Enable controls',
            },
          ],
        },
        initialData: {
          url: '',
          start: 0,
          controls: true,
        },
        buttons: [
          { type: 'cancel', text: 'Cancel' },
          { type: 'submit', text: 'Save', primary: true },
        ],
        onSubmit(api) {
          const { url, start, controls } = api.getData();
          const groups = YOUTUBE_POST_URL_REGEX.exec(url);
          const videoId = groups?.[3] || groups?.[5];
          if (videoId) {
            const html = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}?start=${start}&amp;controls=${
              controls ? 1 : 0
            }" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" data-youtube-video allowfullscreen></iframe>`;
            pasteHtmlAtCaret(editor.contentWindow, html);
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
        name: 'Youtube',
        url,
      };
    },
  };
});
