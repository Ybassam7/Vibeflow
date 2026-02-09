import React, { useState, useEffect } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import VibeHeader from "./VibeHeader";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast, Slide } from "react-toastify";
import Button from "../../../components/ui/Button";

export default function PostItem({ post, showAllComments = false }) {
  const { body, image, createdAt, user, comments, _id } = post;

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(body);

  const queryClient = useQueryClient();

  useEffect(() => {
    setContent(body);
  }, [body]);

  const { mutate, isPending } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["postDetails"] });

      toast.success("Post updated successfully", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Slide,
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.error || "Update failed");
    },
  });

  async function updatePost() {
    const formData = new FormData();
    formData.append("body", content);
    return await axios.put(
      `${import.meta.env.VITE_BASE_URL}/posts/${_id}`,
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
  }

  let visibleComments = [];
  if (comments && comments.length > 0) {
    if (showAllComments) {
      visibleComments = [...comments].reverse();
    } else {
      const latestComment = comments[comments.length - 1];
      visibleComments = [latestComment];
    }
  }

  return (
    <div className="flex flex-col gap-3 p-6 mb-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/10 bg-gray-800/30 backdrop-blur-xl">
      <VibeHeader
        name={user.name}
        photo={user.photo}
        createdAt={createdAt}
        entityId={_id}
        creatorId={user._id}
        onEdit={() => setIsEditing(true)}
      />

      <div className="mb-2">
        {isEditing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              mutate();
            }}
            className="animate-fadeIn"
          >
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 text-base text-gray-100 bg-gray-900/50 rounded-xl border border-white/10 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all resize-none placeholder-gray-500 mb-3"
              rows="4"
            ></textarea>

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => {
                  setContent(body);
                  setIsEditing(false);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <Button type="submit" isLoading={isPending} size="sm">
                Update Post
              </Button>
            </div>
          </form>
        ) : (
          <p className="whitespace-pre-wrap text-base font-normal text-gray-200 leading-relaxed">
            {content}
          </p>
        )}
      </div>

      {image && (
        <div className="mt-2 mb-2 rounded-xl overflow-hidden bg-black/5 border border-white/5 flex justify-center items-center">
          <img
            src={image}
            alt="Post content"
            className="max-h-[400px] w-auto max-w-full object-contain hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      )}

      {/* Footer */}
      <footer className="flex items-center gap-6 pt-4 mt-2 border-t border-white/10 mb-2">
        <button className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-blue-400 transition-colors duration-200 group">
          <AiFillLike className="text-xl group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">Like</span>
        </button>

        <Link
          to={`/posts/${_id}`}
          className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-blue-400 transition-colors duration-200 group"
        >
          <FaComment className="text-lg group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">
            {comments?.length > 0 ? comments.length : 0} Comments
          </span>
        </Link>
      </footer>

      {visibleComments.length > 0 && (
        <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
          {visibleComments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))}
        </div>
      )}

      <CommentForm post={post} />
    </div>
  );
}
