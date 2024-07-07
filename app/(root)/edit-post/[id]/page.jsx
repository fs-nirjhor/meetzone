"use client";

import Loading from "@components/Loading";
import Posting from "@components/forms/Posting";
import { useEffect, useState } from "react";

const EditPost = ({ params }) => {
  const [loading, setLoading] = useState(true);

  const [postData, setPostData] = useState({});

  useEffect(() => {
  const getPost = async () => {
    const response = await fetch(`/api/post/${params?.id}`);
    const data = await response.json();
    setPostData(data);
    setLoading(false);
  };
   getPost();
  }, [params?.id]);

  const postInfo = {
    creator: postData?.creator?._id,
    caption: postData?.caption,
    tag: postData?.tag,
    postPhoto: postData?.postPhoto,
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="pt-6">
      <Posting
        post={postInfo}
        apiEndpoint={`/api/post/${params?.id}`}
        method="PUT"
      />
    </div>
  );
};

export default EditPost;
