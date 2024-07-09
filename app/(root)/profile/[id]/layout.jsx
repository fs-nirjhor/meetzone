import { getUser } from "@lib/actions/user";

export const generateMetadata = async ({ params }) => {
    const user = await getUser(params?.id);
    return {
        title: user?.username || "Profile",
    };
}

export default function ProfileLayout({ children }) {
    return <>{children}</>;
}