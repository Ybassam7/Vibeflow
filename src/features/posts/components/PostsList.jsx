import React, { useContext, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import PostItem from "./PostItem";
import PostSkeleton from "./PostSkeleton";
import { AuthContext } from "../../../context/AuthContext";

export default function PostsList({ isHome = true }) {
  const { userData } = useContext(AuthContext);

  const fetchPosts = async ({ pageParam = 1 }) => {
    const limit = 15;

    const baseUrl = isHome
      ? `/posts?limit=${limit}&sort=-createdAt&page=${pageParam}`
      : `/users/${userData?._id}/posts?limit=${limit}`;

    const FULL_URL = `${import.meta.env.VITE_BASE_URL}${baseUrl}`;

    const { data } = await axios.get(FULL_URL, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    return data;
  };

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", isHome, userData?._id],
    queryFn: fetchPosts,

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { currentPage, numberOfPages } = lastPage.paginationInfo || {};
      return currentPage < numberOfPages ? currentPage + 1 : undefined;
    },

    enabled: isHome || !!userData?._id,
    staleTime: 60 * 2000,
  });

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100;

      if (bottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <section className="py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </>
          ) : isError ? (
            <div className="flex justify-center mt-10">
              <p className="text-red-500 text-xl font-medium">
                {error?.response?.data?.error || "حدث خطأ ما"}
              </p>
            </div>
          ) : (
            <>
              {data?.pages.map((page, i) => (
                <React.Fragment key={i}>
                  {page.posts.map((post) => (
                    <PostItem key={post._id} post={post} />
                  ))}
                </React.Fragment>
              ))}

              {isFetchingNextPage && (
                <div className="py-4">
                  <PostSkeleton />
                </div>
              )}

              {!isLoading && data?.pages[0]?.posts.length === 0 && (
                <div className="flex justify-center mt-10">
                  <p className="text-gray-500 text-xl font-medium">
                    No posts found.
                  </p>
                </div>
              )}

              {!hasNextPage && data?.pages[0]?.posts.length > 0 && (
                <p className="text-center text-gray-400 mt-4 text-sm">
                  The End of Posts
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
