// src/app/upload/UploadForm.tsx
"use client";
import { useState } from "react";

const UploadForm: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState<string>("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
    };
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!file) {
            alert("Выберите файл для загрузки.");
            return;
        }
        if (!title) {
          alert("Введите название документа");
          return;
      }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);

        try {
            const response = await fetch("/api/files", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Файл загружен успешно");
                setFile(null); // Очистить выбранный файл после успешной загрузки
            } else {
                alert("Ошибка при загрузке файла");
            }
        } catch (error) {
            console.error("Ошибка при загрузке файла:", error);
            alert("Ошибка при загрузке файла");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
            />
            <input
                style={{ color: "black" }}
                type="text"
                placeholder="Book title"
                value={title}
                onChange={handleTitleChange}
            />
            <button type="submit">Загрузить файл</button>
        </form>
    );
};

export default UploadForm;
