"use client";

import Loading from "@components/Loading";
import Posting from "@components/forms/Posting";
import { useEffect, useState } from "react";

const EditPost = ({ params }) => {
  const [loading, setLoading] = useState(true);

  const [postData, setPostData] = useState({});

  const getPost = async () => {
    const response = await fetch(`/api/post/${params?.id}`);
    const data = await response.json();
    setPostData(data);
    setLoading(false);
  };
 
  useEffect(() => {
    getPost();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="pt-6">
      <Posting
        post={postData}
        apiEndpoint={`/api/post/${params?.id}`}
        method="PUT"
      />
    </div>
  );
};

export default EditPost;
