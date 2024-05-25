import { getAllPost } from "@lib/actions/post";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const post = await getAllPost();
    return new NextResponse(JSON.stringify(post), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};
