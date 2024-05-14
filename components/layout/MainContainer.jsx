import TopBar from "@components/layout/TopBar";

const MainContainer = ({ children }) => {
  return (
    <section className="grow px-5">
      <TopBar />
      {children}
    </section>
  );
};
export default MainContainer;
