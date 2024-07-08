import { likeOrUnlikePost } from "@lib/actions/post";
import { NextResponse } from "next/server";

export const POST = async (request, { params }) => {
  try {
    const { id, userId } = params;
    const post = await likeOrUnlikePost(id, userId);
    return new NextResponse(JSON.stringify(post), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
      statusText: error.message,
    });
  }
};
