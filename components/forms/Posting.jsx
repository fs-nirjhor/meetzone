"use client";

import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Posting = ({ post, apiEndpoint, method }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: post,
  });

  const router = useRouter();

  const handlePublish = async (data) => {
    try {
      const postForm = new FormData();

      postForm.append("creator", data.creator);
      postForm.append("caption", data.caption);
      postForm.append("tag", data.tag);

      if (typeof data.postPhoto !== "string") {
        postForm.append("postPhoto", data.postPhoto[0]);
      } else {
        postForm.append("postPhoto", data.postPhoto);
      }

      const response = await fetch(apiEndpoint, {
        method: method,
        body: postForm,
      });

      if (response.ok) {
        toast.success("Post successfully");
        router.push(`/profile/${data.creator}?tab=posts`);
      } else {
        toast.error("Failed to post");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form
      className="flex flex-col gap-3 pb-24"
      onSubmit={handleSubmit(handlePublish)}
    >
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
          {...register("postPhoto", {
            validate: (value) => {
              if (value === "" || value === null || value === undefined) {
                return "Photo is required";
              }
            },
          })}
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
          {...register("caption", {
            required: "Caption is required",
            minLength: { value: 3, message: "Caption is too short" },
          })}
          type="text"
          rows={3}
          placeholder="What's on your mind?"
          className="w-full input"
          id="caption"
        />

        {errors.caption && (
          <p className="text-red-500">{errors.caption.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="tag" className="text-light-1">
          Tag
        </label>
        <input
          {...register("tag", { required: "Tag is required" })}
          type="text"
          placeholder="#tag"
          className="w-full input"
        />

        {errors.tag && <p className="text-red-500">{errors.tag.message}</p>}
      </div>

      <button
        type="submit"
        className="py-2.5 rounded-lg mt-10 bg-purple-1 hover:bg-pink-1 text-light-1"
      >
        Publish
      </button>
    </form>
  );
};

export default Posting;
