"use client";

import { useAuth } from "@clerk/nextjs";
import Loading from "@components/Loading";
import {
  Bookmark,
  BookmarkBorder,
  BorderColor,
  Delete,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PostCard = ({ postData={}, update=() => {} }) => {
  const { isLoaded, userId } = useAuth();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, [userId, refreshCount]);

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/post/${postData?._id}/like/${user?._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        update();
        setRefreshCount(refreshCount + 1);
      } else {
        toast.error(response.statusText);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/post/${postData?._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        update();
        setRefreshCount(refreshCount + 1);
        toast.success("Post deleted successfully");
      } else {
        toast.error(response.statusText);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  const handleSave = async () => {
    try {
      const response = await fetch(`/api/post/${postData?._id}/save/${user?._id}`, {
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

  const isLiked = user?.likedPosts?.find(
    (likedPost) => likedPost?._id === postData?._id
  )
  const isSaved = user?.savedPosts?.find(
    (savedPost) => savedPost?._id === postData?._id
  );

  return !isLoaded || isLoading ? (
    <Loading />
  ) : (
    <article className="flex flex-col bg-dark-1 rounded-lg p-3 gap-5">
      <section className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src={postData?.creator?.profilePhoto}
            alt="avatar"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="flex flex-col gap-1">
            <p className="text-small-semibold text-light-1">{`${postData?.creator?.firstName} ${postData?.creator?.lastName}`}</p>
            <p className="text-subtle-medium text-light-3">
              @{postData?.creator?.username}
            </p>
          </div>
        </div>
        {userId === postData?.creator?.clerkId && (
          <Link href={`/edit-post/${postData?._id}`}>
            <BorderColor sx={{ color: "white", cursor: "pointer" }} />
          </Link>
        )}
      </section>
      <p className="text-body-normal max-sm:text-small-semibold text-light-1">
        {postData?.caption}
      </p>
      <Image
        src={postData?.postPhoto}
        alt="post"
        width={200}
        height={150}
        className="w-full rounded-lg"
      />
      <p className="text-base-semibold max-sm:text-small-semibold text-purple-1">
        {postData?.tag}
      </p>
      <div className="flex justify-between items-center">
        <p className="flex items-center gap-1" onClick={handleLike}>
          {isLiked ? (
            <Favorite sx={{ color: "red" }} />
          ) : (
            <FavoriteBorder sx={{ color: "white" }} />
          )}
          <span className="text-light-1">{postData?.likes?.length || 0}</span>
        </p>
        {userId === postData?.creator?.clerkId ? <Delete className="text-red-500" onClick={handleDelete} /> : <p onClick={handleSave}>
          {isSaved ? (
            <Bookmark className="text-purple-1" />
          ) : (
            <BookmarkBorder sx={{ color: "white" }} />
          )}
        </p>}
      </div>
    </article>
  );
};
export default PostCard;
