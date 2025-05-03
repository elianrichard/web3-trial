import Link from "next/link";
import UserProfile from "./UserProfile";

const Nav = () => {
  return (
    <nav className="flex h-20 w-full items-center justify-between px-4">
      <ul className="flex gap-8 font-semibold">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/profile">About</Link>
        </li>
      </ul>
      <UserProfile />
    </nav>
  );
};
export default Nav;
