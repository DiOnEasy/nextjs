"use client";
import { useState } from "react";
import { Document, Page } from "react-pdf";

import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();
function onDocumentLoadError(error: Error) {
    console.error("Error while loading document:", error);
}

export default function Book() {
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }
    return (
        <main className="flex min-h-screen items-start justify-start gap-10 p-12">
            <Document
            
                file="/pdf/marketing.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError} // Добавляем обработчик ошибок
            >
                <Page renderAnnotationLayer={false} renderTextLayer={false} pageNumber={pageNumber} />
            </Document>
            <p>
                Page {pageNumber} of {numPages}
            </p>
            <button
                onClick={() => {
                    setPageNumber(pageNumber + 1);
                }}
            >
                sfdfsdfsdf
            </button>
        </main>
    );
}
