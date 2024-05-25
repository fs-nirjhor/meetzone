import { getUser } from "@lib/actions/user";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const { id } = params;
    const user = await getUser(id);
    return new NextResponse(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};
