import { getFeedPost } from "@lib/actions/post";
import { NextResponse } from "next/server";
import { createPost } from "@lib/actions/post";
import path from "path";
import { writeFile } from "fs/promises";

export const GET = async (request) => {
  try {
    const post = await getFeedPost();
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

export const POST = async (request) => {
  const currentWorkingDirectory = process.cwd();
  try {
    const data = await request.formData();
    let postPhoto = data.get("postPhoto");
    // save photo to server
    if (postPhoto !== "string") {
      const bytes = await postPhoto.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const postPhotoPath = path.join(
        currentWorkingDirectory,
        "public",
        "uploads",
        postPhoto.name
      );
      await writeFile(postPhotoPath, buffer);
      postPhoto = `/uploads/${postPhoto.name}`;
    }

    const postData = {
      creator: data.get("creator"),
      caption: data.get("caption"),
      tag: data.get("tag"),
      postPhoto,
    };
    const post = await createPost(postData);
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
