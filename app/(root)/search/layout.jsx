export const generateMetadata = async ({ searchParams }) => {
  return {
    title: "Search",
  };
};

export default function SearchLayout({ children }) {
  return <>{children}</>;
}
