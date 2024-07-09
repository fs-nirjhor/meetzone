"use client";
import { useAuth } from "@clerk/nextjs";
import { PersonAddAlt, PersonRemove } from "@mui/icons-material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ProfileCard({ profileData }) {
  const { isLoaded, userId } = useAuth();
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [refreshCount, setRefreshCount] = useState(0);
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`);
        const data = await response.json();
        setCurrentUser(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    userId && getUser();
  }, [userId, refreshCount]);

  const isFollowing = currentUser?.following?.find(
    (u) => u._id === profileData._id
  );

  const handleFollow = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/user/${currentUser._id}/follow/${profileData._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setRefreshCount(refreshCount + 1);
      } else {
        toast.error(response.statusText);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  return <figure className="flex gap-5 items-center max-md:flex-col max-md:items-start p-3">
      <Image
        src={profileData?.profilePhoto}
        width={100}
        height={100}
        alt={profileData.username}
        className="rounded-full ring ring-light-1"
      />
      <section className="flex gap-3 justify-between items-start w-full">
      <div className="flex flex-col gap-1">
        <p className="text-light-1 text-heading3-bold flex gap-1 text-nowrap">
          <span>{profileData?.firstName}</span> <span>{profileData?.lastName}</span>
        </p>
        <p className="text-light-3 text-base-bold">
          @{profileData?.username}
        </p>
        <section className="flex gap-5 justify-between text-center mt-2">
            <div className="flex flex-col gap-1 justify-center items-center">
                <p className="text-purple-1 text-base-bold">{profileData?.posts?.length}</p>
                <p className="text-light-3 text-small-bold">Posts</p>
            </div>
            <div className="flex flex-col gap-1 justify-center items-center">
                <p className="text-purple-1 text-base-bold">{profileData?.followers?.length}</p>
                <p className="text-light-3 text-small-bold">Followers</p>
            </div>
            <div className="flex flex-col gap-1 justify-center items-center">
                <p className="text-purple-1 text-base-bold">{profileData?.following?.length}</p>
                <p className="text-light-3 text-small-bold">Following</p>
            </div>
        </section>
      </div>
      {currentUser?.clerkId !== profileData?.clerkId &&
        (!isLoaded || isLoading ? (
          <div className="mySpinner h-3 w-3" />
        ) : isFollowing ? (
          <PersonRemove className="text-purple-1 cursor-pointer" onClick={handleFollow}/>
        ) : (
          <PersonAddAlt className="text-purple-1 cursor-pointer" onClick={handleFollow} />
        ))}
        </section>
  </figure>;
}
