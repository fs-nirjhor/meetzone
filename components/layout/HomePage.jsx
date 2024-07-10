"use client";
import Loading from "@components/Loading";
import PostCard from "@components/cards/PostCard";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  const [postsData, setPostsData] = useState([]);

  const getPosts = async () => {
    const response = await fetch(`/api/post`);
    const data = await response.json();
    setPostsData(data);
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  });

  return loading ? (
    <Loading />
  ) : (
    <section className="flex flex-col gap-5">
      {postsData.map((post) => (
        <PostCard key={post._id} postData={post} update={getPosts} />
      ))}
    </section>
  );
};

export default HomePage;
