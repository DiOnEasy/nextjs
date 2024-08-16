import Link from "next/link";
import styles from "../styles/BookCard.module.css";

const BookCard = () => (
    <div className={styles.card}>
        <h2>title</h2>
        <p>Author: authot</p>
        <Link href={`/books/iddddd`}>View Details</Link>
    </div>
);

export default BookCard;
