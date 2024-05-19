import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Logout } from "@mui/icons-material";

const ManageAccount = () => {
  return (
    <section className="text-light-1 text-body-bold">
      <SignedOut>
        <SignInButton className="myBtn w-full py-2" />
      </SignedOut>
      <SignedIn>
        <label className="flex gap-4 items-center mb-3">
          <UserButton />
          <p>Manage Account</p>
        </label>
        <SignOutButton>
          <div className="flex gap-4 items-center">
            <Logout />
            <p>Log Out</p>
          </div>
        </SignOutButton>
      </SignedIn>
    </section>
  );
};
export default ManageAccount;
