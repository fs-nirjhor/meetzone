import Link from "next/link";

const NotFound = () => {
  return (
    <div className="text-center mt-32">
      <h1 className="text-xl mb-5">404 | Page Not Found</h1>
      <Link href="/" className="border p-2 rounded hover:opacity-75">
        Back to Home
      </Link>
    </div>
  );
};
export default NotFound;
