"use client";
import PostCard from "@components/cards/PostCard";
import ProfileCard from "@components/cards/ProfileCard";
import UserCard from "@components/cards/UserCard";
import Loading from "@components/Loading";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Profile = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const { id } = useParams();
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getUser = async () => {
    try {
      const response = await fetch(`/api/user/${id}`);
      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  },[id]);

  const tabList = ["posts", "followers", "following"];

  return isLoading ? (
    <Loading />
  ) : (
    <main className="flex flex-col gap-6">
      {/* Info */}
      <ProfileCard profileData={profileData} />
      {/* Tabs */}
      <section className="flex justify-start gap-5 px-1">
        {tabList.map((item, index) => (
          <button
            key={item}
            className={`py-2.5 px-5 rounded-lg bg-dark-2 hover:bg-opacity-80 text-light-1 capitalize ${tab === item && "bg-purple-1"} ${tab === null && index === 0 && "bg-purple-1"}`}
            onClick={() => router.push(`${pathname}?tab=${item}`)}
          >
            {item}
          </button>
        ))}
      </section>
      {/* Content */}
      <section className="flex flex-col gap-5">
        {tab === "following"
          ? (profileData?.following?.length === 0 ? <p className="text-center text-base-bold text-light-1 mt-6">No following</p> : profileData?.following?.map((user) => (
            <UserCard key={user._id} userData={user} update={getUser} />
          )))
          : tab === "followers"
          ? (profileData?.followers?.length === 0 ? <p className="text-center text-base-bold text-light-1 mt-6">No followers</p> : profileData?.followers?.map((user) => (
              <UserCard key={user._id} userData={user} update={getUser} />
            )))
          : (profileData?.posts?.length === 0 ? <p className="text-center text-base-bold text-light-1 mt-6">No posts</p> : profileData?.posts?.map((post) => <PostCard key={post._id} postData={post} update={getUser} />))}
      </section>
    </main>
  );
};
export default Profile;