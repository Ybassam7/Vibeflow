import React, { useContext, useState } from "react";
import { Avatar, Dropdown, DropdownItem } from "flowbite-react";
import { formatDate } from "../../../utils/formatDate";
import { HiDotsHorizontal, HiPencil, HiTrash } from "react-icons/hi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast, Slide } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import DeleteModal from "./DeleteModal";

export default function VibeHeader({
  name,
  photo,
  createdAt,
  entityId,
  creatorId,
  isComment = false,
  onEdit,
}) {
  const { userData } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [openModal, setOpenModal] = useState(false);

  const endPoint = isComment ? "comments" : "posts";
  const queryKeyToInvalidate = isComment ? "postDetails" : "posts";

  const { mutate: handleDeletePost } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success(`${isComment ? "Comment" : "Post"} deleted successfully`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Slide,
      });
      queryClient.invalidateQueries({ queryKey: [queryKeyToInvalidate] });
      setOpenModal(false);
    },
    onError: (error) => {
      console.log(error);
      const itemType = isComment ? "Comment" : "Post";
      const serverMessage = error.response?.data?.message;
      toast.error(serverMessage || `${itemType} deletion failed`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Slide,
      });
      setOpenModal(false);
    },
  });
  async function deletePost() {
    return await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/${endPoint}/${entityId}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
  }

  return (
    <header className="flex items-center mb-2">
      <Avatar
        alt={name}
        img={
          !photo.includes("undefined")
            ? photo
            : `${import.meta.env.VITE_BASE_URL}/uploads/default-profile.png`
        }
        rounded
        className="me-4"
      />
      <div className="flex flex-col">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white hover:underline cursor-pointer">
          {name}
        </h2>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {formatDate(createdAt)}
        </span>
      </div>
      {userData?._id === creatorId && (
        <div className="ml-auto">
          <Dropdown
            inline
            arrowIcon={false}
            label={
              <span className="block p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors">
                <HiDotsHorizontal className="text-xl" />
              </span>
            }
          >
            <DropdownItem icon={HiPencil} onClick={onEdit}>
              Edit
            </DropdownItem>
            <DropdownItem
              icon={HiTrash}
              className="text-red-600 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-900/20"
              onClick={() => setOpenModal(true)}
            >
              Delete
            </DropdownItem>
          </Dropdown>

          <DeleteModal
            show={openModal}
            onClose={() => setOpenModal(false)}
            onConfirm={handleDeletePost}
            itemType={isComment ? "comment" : "post"}
          />
        </div>
      )}
    </header>
  );
}
