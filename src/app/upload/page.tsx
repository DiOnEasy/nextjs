// src/app/upload/UploadForm.tsx
'use client'
import { useState } from 'react';

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      alert('Выберите файл для загрузки.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Файл загружен успешно');
        setFile(null); // Очистить выбранный файл после успешной загрузки
      } else {
        alert('Ошибка при загрузке файла');
      }
    } catch (error) {
      console.error('Ошибка при загрузке файла:', error);
      alert('Ошибка при загрузке файла');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button type="submit">Загрузить файл</button>
    </form>
  );
};

export default UploadForm;
