import { FC, MutableRefObject } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as EditorType } from 'tinymce';
import content_style from './css/content.css?inline';
import './plugins/telegramembed';
import './plugins/instagramembed';
import './plugins/twitterembed';
import './plugins/youtubeembed';

interface Props {
  editorRef: MutableRefObject<EditorType | null>;
  value?: string;
  onChange?: (value: string, editor: EditorType) => void;
}

export const TinyMCEEditor: FC<Props> = ({
  editorRef,
  value = '',
  onChange = () => {},
}) => {
  return (
    <Editor
      value={value}
      onInit={(_, editor) => {
        editorRef.current = editor;
      }}
      onEditorChange={onChange}
      init={{
        height: 500,
        menubar: true,
        language: 'ru',
        plugins: [
          'preview',
          'searchreplace',
          'visualblocks',
          'fullscreen',
          'code',
          'help',
          'wordcount',
          'telegramembed',
          'instagramembed',
          'twitterembed',
          'youtubeembed',
        ],
        toolbar:
          'bold italic | alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist | preview fullscreen | forecolor backcolor | ' +
          'telegramembed | instagramembed | twitterembed | youtubeembed | code | help',
        content_style,
      }}
    />
  );
};
