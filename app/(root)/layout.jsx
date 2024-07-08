import RightSideBar from "@components/layout/RightSideBar";
import LeftSideBar from "@components/layout/LeftSideBar";
import BottomBar from "@components/layout/BottomBar";
import MainContainer from "@components/layout/MainContainer";

export const metadata = {
  title: "Home",
  description: "Meetzone - The best meetups app in the world",
};

export default function RootLayout({ children }) {
  return (
    <main>
      <section className="flex justify-between gap-6 mb-20">
        <LeftSideBar />
        <MainContainer>{children}</MainContainer>
        <RightSideBar />
      </section>
      <BottomBar />
    </main>
  );
}
