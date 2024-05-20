import { getUser } from "@lib/actions/user";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const { id } = params;
    const user = await getUser(id);
    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    return new Response(error.message, {
      status: 500,
    });
  }
};
