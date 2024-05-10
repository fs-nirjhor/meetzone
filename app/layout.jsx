import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata = {
  title: {
    default: "Meetzone",
    template: "%s | Meetzone",
  },
  description: "Meetzone - The best meetups app in the world",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsPlacement: "top", // or 'bottom',
          socialButtonsVariant: "blockButton", // or 'iconButton',
          animations: true,
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.className} bg-purple-2 text-white`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
