import { getSinglePost, updatePost } from "@lib/actions/post";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export const GET = async (request, { params }) => {
  try {
    const post = await getSinglePost(params?.id);
    return new NextResponse(JSON.stringify(post), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};

export const PUT = async (request, { params }) => {
  try {
    const data = await request.formData();
    let postPhoto = data.get("postPhoto");
    // save photo to server
    if (typeof postPhoto !== "string") {
      const currentWorkingDirectory = process.cwd();
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
      caption: data.get("caption"),
      tag: data.get("tag"),
      postPhoto,
    };

    const post = await updatePost(params?.id, postData);
    return new NextResponse(JSON.stringify(post), {
      status: 200,
    });
  } catch (error) {
    console.log(error.message);
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};
