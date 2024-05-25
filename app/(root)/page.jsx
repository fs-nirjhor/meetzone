"use client";
import Loading from "@components/Loading";
import PostCard from "@components/cards/PostCard";
import { useEffect, useState } from "react";

const Home = () => {
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
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <section>
      {postsData.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </section>
  );
};
export default Home;
