// src/app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const files = await prisma.pdfFile.findMany();
        return NextResponse.json(files);
    } catch (error: any) {
        console.error("Ошибка получения файлов:", error.message, error.stack);
        return NextResponse.json(
            { message: "Ошибка получения файлов" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    const id = Date.now();
    try {
        const formData = await req.formData();
        const file = formData.get("file");
        const title = formData.get("title") as string;

        if (!file || !(file instanceof File)) {
            return NextResponse.json(
                { message: "Файл не найден" },
                { status: 400 }
            );
        }

        if (!title) {
            return NextResponse.json(
                { message: "Заголовок не указан" },
                { status: 400 }
            );
        }

        const fileName =
            path.parse(file.name).name + "_" + id + path.extname(file.name);
        const filePath = path.join(process.cwd(), "public/pdf", fileName);

        // Создание папки, если она не существует
        const dirPath = path.dirname(filePath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        // Сохранение файла на диск
        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(filePath, buffer);

        // Запись информации о файле в базу данных
        const savedFile = await prisma.pdfFile.create({
            data: {
                name: title,
                path: fileName,
            },
        });

        return NextResponse.json({
            message: "Файл загружен успешно",
            file: savedFile,
        });
    } catch (error: any) {
        console.error("Ошибка загрузки файла:", error.message, error.stack);
        return NextResponse.json(
            { message: "Ошибка загрузки файла" },
            { status: 500 }
        );
    }
}
