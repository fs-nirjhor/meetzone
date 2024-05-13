import Image from "next/image";
import Link from "next/link";
import Menu from "@components/layout/Menu";
import Profile from "@components/layout/Profile";
import ManageAccount from "@components/layout/ManageAccount";

const LeftSideBar = () => {
  return (
    <aside className="h-screen flex flex-col gap-5 sticky top-0 left-0 overflow-auto custom-scrollbar px-10 py-6 max-md:hidden">
      <Link href="/">
        <Image
          src="/assets/logo.png"
          alt="logo"
          width={200}
          height={200}
          className="mx-auto"
        />
      </Link>
      <Profile />
      <hr />
      <Menu />
      <hr />
      <ManageAccount />
    </aside>
  );
};
export default LeftSideBar;
