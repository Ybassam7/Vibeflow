import React, { useRef, useState } from "react";
import { FaImage, FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "../../../components/ui/Button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "../../../components/ui/Alert";
import { toast, Slide } from "react-toastify";

import { useMutation, useQueryClient } from "@tanstack/react-query";

const defaultValues = {
  body: "",
};

const schema = z.object({
  body: z
    .string()
    .trim()
    .min(1, { message: "Post content cannot be empty" })
    .max(1000, { message: "Post is too long (max 1000 characters)" }),
});

export default function CreatePostForm() {
  // const navigate = useNavigate();
  const fileInputRef = useRef();
  const [imagePreview, setImagePreview] = useState(null);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    setValue("image", null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts`,
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      toast.success("Post created successfully", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Slide,
      });

      reset();
      clearImage();
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.error || "Post creation failed", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Slide,
      });
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("body", data.body);

    if (fileInputRef.current?.files[0]) {
      formData.append("image", fileInputRef.current.files[0]);
    }

    mutate(formData);
  };

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 mt-6">
      <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/10 transition-all duration-300 hover:shadow-2xl">
        <h3 className="text-xl font-medium text-white mb-4 pl-1">
          Post Something...
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="relative">
            <textarea
              {...register("body")}
              id="post"
              className="w-full bg-gray-900/50 text-gray-100 border border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all h-32 resize-none placeholder-gray-500"
              placeholder="What's on your mind?"
            ></textarea>
            <Alert error={errors.body?.message} />
          </div>

          {imagePreview && (
            <div className="relative w-full h-64 bg-gray-900/50 rounded-xl overflow-hidden border border-white/10 mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={clearImage}
                className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full transition backdrop-blur-sm"
              >
                <FaTimes />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between mt-4">
            <div>
              <input
                className="hidden"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-medium py-2 px-6 rounded-xl transition-all duration-200 flex items-center gap-2"
              >
                <FaImage className="text-lg" />
                <span>{imagePreview ? "Change Image" : "Upload Image"}</span>
              </button>
            </div>

            <Button
              type="submit"
              isLoading={isPending}
              loadingText="Posting..."
            >
              Post
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
