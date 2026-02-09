import React from "react";
import PostsList from "../../features/posts/components/PostsList";
import Seo from "../../Components/Seo/Seo";
import CreatePostForm from "../../features/posts/components/CreatePostForm";
import ProfileCard from "../../features/profile/components/ProfileCard";

function Profile() {
  return (
    <>
      <Seo
        title="Profile"
        description="View your profile, manage your posts, and update your details."
      />
      <ProfileCard />
      <CreatePostForm />
      <PostsList isHome={false} />
    </>
  );
}

export default Profile;
