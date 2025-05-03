import Link from "next/link";
import UserProfile from "./UserProfile";
import { Button } from "@/components/ui/button";

const Nav = () => {
  return (
    <nav className="border-b-solid flex h-20 w-full items-center justify-between border-b-2 px-4">
      <ul className="flex gap-4 font-semibold">
        <li>
          <Link href="/">
            <Button variant="link" className="text-base font-bold">
              Store
            </Button>
          </Link>
        </li>
        <li>
          <Link href="/tickets">
            <Button variant="link" className="text-base font-bold">
              My Tickets
            </Button>
          </Link>
        </li>
      </ul>
      <UserProfile />
    </nav>
  );
};
export default Nav;
