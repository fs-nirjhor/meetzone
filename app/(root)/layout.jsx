import RightSideBar from "@components/layout/RightSideBar";
import LeftSideBar from "@components/layout/LeftSideBar";
import BottomBar from "@components/layout/BottomBar";
import MainContainer from "@components/MainContainer";

export const metadata = {
  title: "Home",
  description: "Meetzone - The best meetups app in the world",
};

export default function RootLayout({ children }) {
  return (
    <main className="h-screen flex flex-col justify-between">
      <section className="flex justify-between">
        <LeftSideBar />
        <MainContainer>{children}</MainContainer>
        <RightSideBar />
      </section>
      <BottomBar />
    </main>
  );
}
