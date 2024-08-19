import Image from "next/image";
import Link from "next/link";
// import styles from "../styles/BookCard.module.css";

const BookCard = () => (
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
        <h2 className="text-2xl">Title</h2>
        <p className="text-lg">Author: authot</p>
        <Link className="text-blue" href={`/book/1`}>View Details</Link>
    </div>
);

export default BookCard;
