import React from "react";
import { IoSend } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast, Slide } from "react-toastify";
import Button from "../../../components/ui/Button";

export default function AddComment({ post }) {
  const { register, handleSubmit, reset } = useForm();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["postDetails", post?._id] });

      reset();
      toast.success("Comment created successfully", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Slide,
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.error || "Comment creation failed", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Slide,
      });
    },
  });

  async function addComment(data) {
    const commentData = {
      content: data.content,
      post: post?._id,
    };
    return axios.post(
      `${import.meta.env.VITE_BASE_URL}/comments`,
      commentData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(mutate)();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(mutate)}
      className="flex items-start gap-2 mb-2"
    >
      <div className="grow relative">
        <textarea
          {...register("content", { required: true })}
          rows="1"
          disabled={isPending}
          onKeyDown={handleKeyDown}
          className={`block w-full p-3 pl-4 text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none transition-all duration-200 ${
            isPending ? "opacity-50 cursor-not-allowed" : ""
          }`}
          placeholder="Write a comment..."
          style={{ minHeight: "46px" }}
        ></textarea>
      </div>

      <Button
        type="submit"
        isLoading={isPending}
        className="p-0! inline-flex items-center justify-center w-[46px] h-[46px] rounded transition-colors duration-200"
      >
        <IoSend className="w-5 h-5 ml-1" />
        <span className="sr-only">Post comment</span>
      </Button>
    </form>
  );
}
