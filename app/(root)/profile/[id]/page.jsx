import { useParams } from "next/navigation";

const Profile = () => {
  const { id } = useParams();
  return <div>Profile</div>;
};
export default Profile;
