"use client";
import PostCard from "@components/cards/PostCard";
import UserCard from "@components/cards/UserCard";
import Loading from "@components/Loading";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState("post");
  const [searchedPost, setSearchedPost] = useState([]);
  const [searchedUser, setSearchedUser] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(`/api/search/post/${query}`);
      const data = await response.json();
      setSearchedPost(data);
      setIsLoading(false);
    };
    const getUsers = async () => {
      const response = await fetch(`/api/search/user/${query}`);
      const data = await response.json();
      setSearchedUser(data);
      setIsLoading(false);
    };
    searchType === "post" ? getPosts() : getUsers();
  }, [query, searchType]);

  return (
    <main className="flex flex-col gap-5">
      <section className="flex gap-5 px-2">
        <button
          className={`py-2.5 px-5 rounded-lg mt-10 bg-purple-1 hover:bg-opacity-80 text-light-1 ${searchType === "post" && "bg-pink-1"}`}
          onClick={() => setSearchType("post")}
        >
          Post
        </button>
        <button
          className={`py-2.5 px-5 rounded-lg mt-10 bg-purple-1 hover:bg-opacity-80 text-light-1 ${searchType === "user" && "bg-pink-1"}`}
          onClick={() => setSearchType("user")}
        >
          People
        </button>
      </section>

      {isLoading ? <Loading /> : <section className="flex flex-col gap-5">
        {searchType === "post" && (searchedPost.length === 0 ? (
          <p className="mt-20 text-center">No Post Found</p>
        ) : (
          searchedPost.map((post) => <PostCard key={post._id} post={post} />)
        ))}
        {searchType === "user" && (searchedUser.length === 0 ? (
          <p className="mt-20 text-center">No User Found</p>
        ) : (
          searchedUser.map((user) => <UserCard key={user._id} userData={user} />)
        ))}
      </section>}
    </main>
  );
}
