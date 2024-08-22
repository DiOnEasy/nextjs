import Image from "next/image";
import Link from "next/link";
// import styles from "../styles/BookCard.module.css";

type BookCardProps = {
    id: string;
    name: string;
    path: string;
};

const BookCard = ({ name, path, id }: BookCardProps) => (
    <div className="p-10 bg-gray radius-1 rounded-xl flex items-center justify-center flex-col">
        <Image
            width={60}
            height={78}
            src={
                "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781506287256/digital-sat-preview-what-to-expect--tips-and-strategies-9781506287256_hr.jpg"
            }
            alt=""
            className=""
        />
        <h2 className="text-2xl">{name}</h2>
        <Link className="text-blue" href={`/book/${id}`}>
            View Details
        </Link>
    </div>
);

export default BookCard;
