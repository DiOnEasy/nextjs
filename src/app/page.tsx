'use server'
import BookCard from "@/components/BookCard";
import prisma from "@/lib/prisma";
import { PdfFile } from "@prisma/client";
import { GetStaticProps } from "next";
import Image from "next/image";

export default async function Home() {
    const files = await fetch('http://localhost:3000/api/files', {
        method: "GET",
    }).then((res) => res.json());

    return (
        <main className="flex min-h-screen items-start justify-start gap-10 p-12">
            {files.map((file: any) => (
                <BookCard
                    key={file.id}
                    id={file.id}
                    name={file.name}
                    path={file.path}
                />
            ))}
        </main>
    );
}
