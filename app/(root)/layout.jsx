import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  UserProfile,
} from "@clerk/nextjs";

export const metadata = {
  title: "Home",
  description: "Meetzone - The best meetups app in the world",
};

export default function RootLayout({ children }) {
  return (
    <main>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
          {/* <UserProfile /> */}
          {/* <SignOutButton /> */}
        </SignedIn>
      </header>
      {children}
    </main>
  );
}
