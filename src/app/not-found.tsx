import Link from "next/link";
import Home from "./page";

const NotFoundPage = () => {
    return (
        <div className="flex items-center flex-col justify-center w-full h-lvh">
            <p>Page not found!</p>
            <Link className="text-red" href={"/"}>
                Go to main page
            </Link>
        </div>
    );
};
export default NotFoundPage;
