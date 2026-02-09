import React from "react";
import Add from "../../features/posts/components/CreatePostForm";
import PostsList from "../../features/posts/components/PostsList";
import Seo from "../../components/seo/Seo";

function Posts() {
  return (
    <>
      <Seo
        title="Home"
        description="See what's happening with your friends and community on Vibeflow."
      />
      <Add />
      <PostsList />
    </>
  );
}

export default Posts;
