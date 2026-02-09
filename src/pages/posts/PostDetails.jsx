import React from "react";
import { useParams } from "react-router-dom";
import PostItem from "../../features/posts/PostItem";
import PostSkeleton from "../../features/posts/components/PostSkeleton";
import useVibeFetch from "../../hooks/useVibeFetch";

export default function PostDetails() {
  const { details } = useParams();

  const { data, isLoading, isError, error } = useVibeFetch(
    ["postDetails", details],
    `posts/${details}`,
    {
      enabled: !!details,
    },
  );

  const post = data?.post;

  return (
    <section className="min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <PostSkeleton />
          ) : isError ? (
            <div className="flex justify-center mt-10">
              <p className="text-red-500 text-xl font-medium">
                {error?.response?.data?.error || "Failed to load post"}
              </p>
            </div>
          ) : (
            post && <PostItem post={post} showAllComments={true} />
          )}
        </div>
      </div>
    </section>
  );
}
