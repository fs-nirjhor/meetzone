import { getSearchedUser } from "@lib/actions/user";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    try {
      const post = await getSearchedUser(params?.query);
      return new NextResponse(JSON.stringify(post), {
        status: 200,
      });
    } catch (error) {
      return new NextResponse(JSON.stringify(error), {
        status: 500,
        statusText: error.message
      });
    }
  };