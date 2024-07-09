"use client";
import { useAuth } from "@clerk/nextjs";
import { PersonAddAlt, PersonRemove } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UserCard({ userData }) {
  const { isLoaded, userId } = useAuth();
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [refreshCount, setRefreshCount] = useState(0);
  const router = useRouter();

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
    getUser();
  }, [userId, refreshCount]);
  const isFollowing = currentUser?.following?.find(
    (u) => u._id === userData._id
  );

  const handleFollow = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/user/${currentUser._id}/follow/${userData._id}`, {
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

  return (
    <div className="flex justify-between items-center px-3 py-2.5">
      <figure className="flex gap-3 items-center">
        <Image
          src={userData.profilePhoto}
          width={50}
          height={50}
          alt={userData.useraname}
          className="rounded-full"
          onClick={() => router.push(`/profile/${userData.clerkId}`)}
        />
        <div className="flex flex-col gap-1">
          <p className="text-light-1 text-small-semibold flex gap-1">
            <span>{userData.firstName}</span> <span>{userData.lastName}</span>
          </p>
          <p className="text-light-3 text-subtle-medium">
            @{userData.username}
          </p>
        </div>
      </figure>
      {currentUser?.clerkId !== userData?.clerkId &&
        (!isLoaded || isLoading ? (
          <div className="mySpinner h-3 w-3" />
        ) : isFollowing ? (
          <PersonRemove className="text-purple-1 cursor-pointer" onClick={handleFollow} />
        ) : (
          <PersonAddAlt className="text-purple-1 cursor-pointer" onClick={handleFollow} />
        ))}
    </div>
  );
}
