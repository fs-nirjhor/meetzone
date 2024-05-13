"use client";
import { sidebarLinks } from "@constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Menu = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-2">
      {sidebarLinks.map((link) => (
        <Link
          key={link.label}
          href={link.route}
          className={`flex items-center gap-4 py-2 px-4 rounded-lg text-light-1 ${
            pathname === link.route
              ? "bg-purple-1 hover:bg-purple-1"
              : "hover:bg-dark-1"
          }`}
        >
          <span>{link.icon}</span>
          <span>{link.label}</span>
        </Link>
      ))}
    </div>
  );
};
export default Menu;
