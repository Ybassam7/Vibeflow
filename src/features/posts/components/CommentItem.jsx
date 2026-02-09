import React, { useEffect, useState } from "react";
import VibeHeader from "./VibeHeader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast, Slide } from "react-toastify";
import Button from "../../../components/ui/Button";

export default function CommentItem({ comment }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);

  const queryClient = useQueryClient();

  useEffect(() => {
    setContent(comment.content);
  }, [comment.content]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["postDetails"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      toast.success("Comment updated", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
        transition: Slide,
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.error || "Update failed");
    },
  });

  async function updateComment() {
    return await axios.put(
      `${import.meta.env.VITE_BASE_URL}/comments/${comment._id}`,
      { content: content },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
  }

  return (
    <div className="mb-4">
      <VibeHeader
        name={comment.commentCreator.name}
        photo={comment.commentCreator.photo}
        createdAt={comment.createdAt}
        entityId={comment._id}
        creatorId={comment.commentCreator._id}
        isComment={true}
        onEdit={() => setIsEditing(true)}
      />

      <div className="ps-14 -mt-2">
        {isEditing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              mutate();
            }}
            className="flex flex-col gap-2 animate-fadeIn"
          >
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              rows="2"
            ></textarea>

            <div className="flex gap-2">
              <Button
                type="submit"
                isLoading={isPending}
                size="xs"
                className="px-3 py-1 text-xs"
              >
                Save
              </Button>
              <button
                type="button"
                onClick={() => {
                  setContent(comment.content);
                  setIsEditing(false);
                }}
                className="px-3 py-1 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <p className="whitespace-pre-wrap bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl rounded-tl-none inline-block text-gray-700 dark:text-gray-300">
            {content}
          </p>
        )}
      </div>
    </div>
  );
}
