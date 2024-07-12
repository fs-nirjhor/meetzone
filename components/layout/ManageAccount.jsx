import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const ManageAccount = () => {
  return (
    <section className="text-light-1 text-body-bold">
      <SignedOut>
        <SignInButton className="myBtn w-full py-2" />
      </SignedOut>
      <SignedIn>
        <label className="flex gap-4 items-center mb-3">
          <UserButton afterSignOutUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL} />
          <p>Manage Account</p>
        </label>
      </SignedIn>
    </section>
  );
};
export default ManageAccount;
