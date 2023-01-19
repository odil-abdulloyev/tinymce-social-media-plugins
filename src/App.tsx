import { FormEvent, useEffect, useRef, useState } from 'react';
import { Editor as EditorType } from 'tinymce';
import { TinyMCEEditor } from './components/TinyMCEEditor';
import { httpClient } from './http';

interface Data {
  content: string;
}

export const App = () => {
  const editorRef = useRef<EditorType | null>(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await httpClient.get<Data>('/api/content');
      setContent(data.content);
    };
    fetchData();
  }, []);

  const handleChange = (value: string) => {
    setContent(value);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const editor = editorRef.current;
    if (editor) {
      const { data } = await httpClient.post<Data>('/api/content', {
        content: editor.getContent(),
      });
      editor.setContent(data.content);
    }
  };

  return (
    <div className='app'>
      <div className='container'>
        <form onSubmit={handleFormSubmit}>
          <TinyMCEEditor
            editorRef={editorRef}
            value={content}
            onChange={handleChange}
          />
          <button className='submit mt-1'>Submit</button>
        </form>
      </div>
    </div>
  );
};
