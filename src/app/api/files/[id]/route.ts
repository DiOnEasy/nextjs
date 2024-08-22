import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    try {
        const file = await prisma.pdfFile.findUnique({
            where: { id },
        });

        if (!file) {
            return NextResponse.json(
                { message: "Файл не найден" },
                { status: 404 }
            );
        }

        return NextResponse.json(file);
    } catch (error: any) {
        console.error("Ошибка получения файла:", error.message, error.stack);
        return NextResponse.json(
            { message: "Ошибка получения файла" },
            { status: 500 }
        );
    }
}
