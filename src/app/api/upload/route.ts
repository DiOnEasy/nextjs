// src/app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import prisma from '../../../lib/prisma'; // Импортируйте Prisma клиент

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ message: 'Файл не найден' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src/files', file.name);

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
        name: file.name,
        path: filePath,
      },
    });

    return NextResponse.json({ message: 'Файл загружен успешно', file: savedFile });
  } catch (error) {
    console.error('Ошибка загрузки файла:', error);
    return NextResponse.json({ message: 'Ошибка загрузки файла' }, { status: 500 });
  }
}
