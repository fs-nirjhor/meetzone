"use client";
import { sidebarLinks } from "@constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomBar = () => {
  const pathname = usePathname();
  return (
    <div className="flex justify-between items-center gap-2 fixed bottom-0 right-0 bg-dark-1 py-3 px-6 w-full md:hidden">
      {sidebarLinks.map((link) => (
        <Link
          key={link.label}
          href={link.route}
          className={`flex items-center gap-2 p-2  rounded-lg text-light-1 text-small-bold ${
            pathname === link.route
              ? "bg-purple-1 hover:bg-purple-1"
              : "hover:bg-dark-1"
          }`}
        >
          <span>{link.icon}</span>
          <span className="max-sm:hidden">{link.label}</span>
        </Link>
      ))}
    </div>
  );
};
export default BottomBar;
