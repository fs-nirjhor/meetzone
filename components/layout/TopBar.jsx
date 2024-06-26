import { Add, Search, Logout } from "@mui/icons-material";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

const TopBar = () => {
  return (
    <header className="flex justify-between items-center gap-3 py-3">
      <form className="relative">
        <input type="text" placeholder="Search" className="search-bar" />
        <button type="submit" className="search-icon">
          <Search />
        </button>
      </form>
      <button className="create-post-btn">
        <Link href="/create-post">
          <Add /> Create Post
        </Link>
      </button>
      <section className="flex text-light-1 text-body-bold md:hidden">
        <SignedOut>
          <SignInButton className="cl-formButtonPrimary w-full py-2" />
        </SignedOut>
        <SignedIn>
          <div className="flex gap-4 items-center">
            <SignOutButton>
              <Logout />
            </SignOutButton>
            <UserButton />
          </div>
        </SignedIn>
      </section>
    </header>
  );
};
export default TopBar;
