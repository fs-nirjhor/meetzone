import RightSideBar from "@components/rightSideBar/RightSideBar";
import LeftSideBar from "@components/leftSideBar/LeftSideBar";
import BottomBar from "@components/bottomBar/BottomBar";
import TopBar from "@components/topBar/TopBar";

export const metadata = {
  title: "Home",
  description: "Meetzone - The best meetups app in the world",
};

export default function RootLayout({ children }) {
  return (
    <main className="h-screen flex flex-col justify-between">
      <section className="flex justify-between">
        <RightSideBar />
        <div>
          <TopBar />
          {children}
        </div>
        <LeftSideBar />
      </section>
      <BottomBar />
    </main>
  );
}
