"use client";

import { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { useSearchParams } from "next/navigation"; // Импортируем useRouter
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

function onDocumentLoadError(error: Error) {
    console.error("Error while loading document:", error);
}

export default function Book({ params }: any) {
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [file, setFile] = useState<any>('');

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    useEffect(() => {
        if (params.id) {
            const getFile = async () => {
                const response = await fetch(
                    `http://localhost:3000/api/files/${params.id}`,
                    {
                        method: "GET",
                    }
                ).then((res) => res.json());
                setFile(response);
            };
            getFile();
        }
    }, [params.id]);
    console.log(file);

    return (
        <main className="flex min-h-screen items-start justify-start gap-10 p-12">
            <Document
                file={`/pdf/${file.path}`} // Используем id для формирования пути к PDF
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
            >
                <Page
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    pageNumber={pageNumber}
                />
            </Document>
            <p>
                Page {pageNumber} of {numPages}
            </p>
            <button
                onClick={() => {
                    setPageNumber(pageNumber + 1);
                }}
            >
                Следующая страница
            </button>
        </main>
    );
}
