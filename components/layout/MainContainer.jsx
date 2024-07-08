import TopBar from "@components/layout/TopBar";
import Heading from "@components/layout/Heading";

const MainContainer = ({ children }) => {
  return (
    <section className="flex-1 flex flex-col px-2 max-w-3xl">
      <TopBar />
      <Heading />
      <section className="h-screen overflow-y-auto custom-scrollbar">
        {children}
      </section>
    </section>
  );
};
export default MainContainer;
