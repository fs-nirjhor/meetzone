import { followOrUnfollowUser } from "@lib/actions/user";
import { NextResponse } from "next/server";

export const POST = async (request, { params }) => {
  try {
    const { id, followId } = params;
    const user = await followOrUnfollowUser(id, followId);
    return new NextResponse(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
      statusText: error.message,
    });
  }
};
