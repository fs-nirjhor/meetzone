"use client";
import PostCard from "@components/cards/PostCard";
import UserCard from "@components/cards/UserCard";
import Loading from "@components/Loading";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const type = searchParams.get("type");
  const [isLoading, setIsLoading] = useState(true);
  const [searchedPost, setSearchedPost] = useState([]);
  const [searchedUser, setSearchedUser] = useState([]);
 
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

  useEffect(() => {
    type === "people" ? getUsers() : getPosts();
  }, [query, type]);

  return (
    <main className="flex flex-col gap-5">
      <section className="flex gap-5 px-2">
        <button
          className={`py-2.5 px-5 rounded-lg mt-10 bg-dark-2 hover:bg-opacity-80 text-light-1 ${type !== "people" && "bg-purple-1"}`}
          onClick={() => router.push(`${pathname}?type=post&query=${query}`)}
        >
          Post
        </button>
        <button
          className={`py-2.5 px-5 rounded-lg mt-10 bg-dark-2 hover:bg-opacity-80 text-light-1 ${type === "people" && "bg-purple-1"}`}
          onClick={() => router.push(`${pathname}?type=people&query=${query}`)}
        >
          People
        </button>
      </section>

      {isLoading ? <Loading /> : <section className="flex flex-col gap-5">
        {type !== "people" && (searchedPost.length === 0 ? (
          <p className="mt-20 text-center">No Post Found</p>
        ) : (
          searchedPost.map((post) => <PostCard key={post._id} postData={post} update={getPosts} />)
        ))}
        {type === "people" && (searchedUser.length === 0 ? (
          <p className="mt-20 text-center">No User Found</p>
        ) : (
          searchedUser.map((user) => <UserCard key={user._id} userData={user} update={getUsers} />)
        ))}
      </section>}
    </main>
  );
}
