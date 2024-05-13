import TopBar from "@components/layout/TopBar";

const MainContainer = ({ children }) => {
  return (
    <section>
      <TopBar />
      {children}
    </section>
  );
};
export default MainContainer;
