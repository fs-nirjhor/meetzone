import { getAllUser } from "@lib/actions/user";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const user = await getAllUser();
    return new NextResponse(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
      statusText: error.message
    });
  }
};
