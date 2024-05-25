"use client";

import { useUser } from "@clerk/nextjs";
import Loading from "@components/Loading";
import { BorderColor } from "@mui/icons-material";
import Image from "next/image";

const PostCard = ({ post }) => {
  const { user, isLoaded } = useUser();
  return !isLoaded ? (
    <Loading />
  ) : (
    <figure className="flex flex-col bg-dark-1 rounded-lg p-3 gap-3">
      <section className="flex justify-between items-center">
        <div className="flex gap-3">
          <Image
            src={user?.imageUrl}
            alt="avatar"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="flex flex-col gap-1">
            <p className="text-heading4-bold text-light-1">{`${user?.firstName} ${user?.lastName}`}</p>
            <p className="text-body text-light-2">{user?.username}</p>
          </div>
        </div>
        <BorderColor sx={{ color: "white", fontSize: "26px" }} />
      </section>
      <Image
        src={post?.postPhoto}
        alt="post"
        width={250}
        height={200}
        className="w-full rounded-lg"
      />
    </figure>
  );
};
export default PostCard;
