import BookCard from "@/components/BookCard";
import Image from "next/image";

export default function Home() {
    return (
        <main className="flex min-h-screen items-start justify-start gap-10 p-12">
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
        </main>
    );
}
