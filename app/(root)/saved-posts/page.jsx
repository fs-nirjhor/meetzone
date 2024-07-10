"use client";
import { useAuth } from "@clerk/nextjs";
import PostCard from "@components/cards/PostCard";
import Loading from "@components/Loading";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SavedPost = () => {
  const { isLoaded, userId } = useAuth();
  const [savedPosts, setSavedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const getUser = async () => {
    try {
      const response = await fetch(`/api/user/${userId}`);
      const data = await response.json();
      if(response.ok){
        setSavedPosts(data?.savedPosts);
      }else{
        toast.error(response.statusText);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
    useEffect(() => {
     userId && getUser();
    });
    return !isLoaded || isLoading ? (
      <Loading />
    ) : (
      <section className="flex flex-col gap-5">
        {savedPosts.length === 0 ? <p className="text-light-1 text-base-bold text-center mt-10">No posts saved</p> : savedPosts.map((post) => (
          <PostCard key={post._id} postData={post} update={getUser} />
        ))}
      </section>
    );
  };

  export default SavedPost;
  