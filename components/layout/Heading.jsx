"use client";
import { pageTitles } from "@constants";
import { usePathname } from "next/navigation";

const Heading = () => {
  const currentPath = usePathname();
  const regex = /^\/([^\/]+)/;
  const firstPath = currentPath.match(regex)
    ? currentPath.match(regex)[0]
    : currentPath;
  const title = pageTitles.find((page) => page.url === firstPath)?.title || "";

  return (
    <h1 className="my-5 text-heading2-bold max-sm:text-heading3-bold text-light-1">
      {title}
    </h1>
  );
};
export default Heading;
