export const metadata = {
  title: "Auth",
  description: "Meetzone - The best meetups app in the world",
};

export default function RootLayout({ children }) {
  return <main className="flex justify-center p-3">{children}</main>;
}
