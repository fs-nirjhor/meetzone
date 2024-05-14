import TopBar from "@components/layout/TopBar";
import Heading from "@components/layout/Heading";

const MainContainer = ({ children }) => {
  return (
    <section className="flex-1 flex flex-col max-w-3xl px-4 lg:px-4 md:px-10 xl:px-20">
      <TopBar />
      <Heading />
      {children}
    </section>
  );
};
export default MainContainer;
