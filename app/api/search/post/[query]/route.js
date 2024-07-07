import { getSearchedPosts } from "@lib/actions/post";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    try {
      const post = await getSearchedPosts(params?.query);
      return new NextResponse(JSON.stringify(post), {
        status: 200,
      });
    } catch (error) {
      return new NextResponse(error.message, {
        status: 500,
      });
    }
  };