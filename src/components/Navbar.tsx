import Link from 'next/link';

const Navbar = () => (
  <nav className='flex flex-col gap-2'>
    <Link href="/">Home</Link>
    <Link href="/books">Books</Link>
    <Link href="/notes">Notes</Link>
  </nav>
);

export default Navbar;