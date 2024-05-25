"use client";

import { useForm } from "react-hook-form";
import { Image } from "next/image";
import { AddPhotoAlternateOutlined } from "@mui/icons-material";

const PostForm = ({ postData, handlePost }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: postData,
  });

  const onSubmit = (data) => handlePost(data);

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div>
          <label htmlFor="postPhoto" className="flex items-center gap-4">
            {watch("postPhoto") ? (
              // check if the photo as link or as file
              typeof watch("postPhoto") === "string" ? (
                <Image
                  src={watch("postPhoto")}
                  alt="post"
                  height={200}
                  width={250}
                  className="object-cover rounded-lg"
                />
              ) : (
                <Image
                  src={URL.createObjectURL(watch("postPhoto")[0])}
                  alt="post"
                  height={200}
                  width={250}
                  className="object-cover rounded-lg"
                />
              )
            ) : (
              <figure>
                <AddPhotoAlternateOutlined
                  sx={{ color: "white", fontSize: "100px" }}
                />
                <span className="text-light-1 text-body-bold">
                  Upload a photo
                </span>
              </figure>
            )}
          </label>
          <input
            type="file"
            name="postPhoto"
            id="postPhoto"
            accept="image/*"
            className="hidden"
            {...register("postPhoto", { required: "Photo is required" })}
          />
          {errors?.postPhoto && (
            <p className="text-red-500">{errors?.postPhoto?.message} </p>
          )}
        </div>
        <div>
          <label htmlFor="caption" className="text-light-1">
            Caption
          </label>
          <textarea
            name="caption"
            id="caption"
            rows={3}
            className="input text-light-1 w-full"
            placeholder="What's on your mind?"
            //required
            {...register("caption", {
              required: "Caption is required",
              minLength: { value: 3, message: "Caption is too short" },
            })}
          />
          {errors?.caption && (
            <p className="text-red-500">{errors?.caption?.message} </p>
          )}
        </div>
        <div>
          <label htmlFor="tag" className="text-light-1">
            Tag
          </label>
          <input
            type="text"
            name="tag"
            id="tag"
            className="input text-light-1 w-full"
            placeholder="#tag"
            //required
            {...register("tag", { required: "Tag is required" })}
          />
          {errors?.tag && (
            <p className="text-red-500">{errors?.tag?.message} </p>
          )}
        </div>
        <button type="submit" className="myBtn w-full py-2.5 mt-3">
          Publish
        </button>
      </form>
    </section>
  );
};
export default PostForm;
