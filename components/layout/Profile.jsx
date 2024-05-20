"use client";

import { useAuth } from "@clerk/nextjs";
import Loading from "@components/Loading";
import Image from "next/image";
import { useEffect, useState } from "react";

const Profile = () => {
  const { isLoaded, userId } = useAuth();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  //const user = await getUser(userId);
  const getUser = async () => {
    try {
      const response = await fetch(`/api/user/${userId}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, [userId]);

  return !isLoaded || isLoading ? (
    <Loading />
  ) : (
    <section className="flex flex-col gap-2">
      <Image
        src={user?.profilePhoto}
        alt="avatar"
        width={50}
        height={50}
        className="rounded-full mx-auto"
      />
      <p className="text-small-bold text-light-1 text-center">{`${user?.firstname} ${user?.lastname}`}</p>
      <div className="flex justify-between text-center">
        <div>
          <span className="text-base-bold">{user?.posts?.length}</span>
          <br />
          <span className="text-tiny-medium">Posts</span>
        </div>
        <div>
          <span className="text-base-bold">{user?.followers?.length}</span>
          <br />
          <span className="text-tiny-medium">Followers</span>
        </div>
        <div>
          <span className="text-base-bold">{user?.following?.length}</span>
          <br />
          <span className="text-tiny-medium">Following</span>
        </div>
      </div>
    </section>
  );
};
export default Profile;
