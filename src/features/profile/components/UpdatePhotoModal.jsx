import React, { useContext, useEffect, useState } from "react";
import { Modal, ModalBody, Label, FileInput } from "flowbite-react";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa"; // Added FaTimes for clearing
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Button from "../../../components/ui/Button";
import { toast, Slide } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";

import { zodResolver } from "@hookform/resolvers/zod";
import { profileImageSchema } from "../schemas/profileImage.schema";
import Alert from "../../../components/ui/Alert";

const glassModalTheme = {
  root: {
    base: "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
    show: {
      on: "flex bg-gray-900/80 backdrop-blur-sm p-4",
      off: "hidden",
    },
  },
  content: {
    base: "relative h-full w-full p-4 md:h-auto max-w-md",
    inner:
      "relative rounded-[2rem] bg-gray-800/95 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col",
  },
};

export default function UpdatePhotoModal({ show, onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(profileImageSchema),
  });

  const { getProfileData } = useContext(AuthContext);

  const [preview, setPreview] = useState(null);

  const selectedFile = watch("photo");

  useEffect(() => {
    if (selectedFile && selectedFile[0]) {
      const file = selectedFile[0];
      const fileUrl = URL.createObjectURL(file);
      setPreview(fileUrl);

      return () => URL.revokeObjectURL(fileUrl);
    } else {
      setPreview(null);
    }
  }, [selectedFile]);

  async function ChangeProfilePhoto(data) {
    const formData = new FormData();
    if (data.photo && data.photo[0]) {
      formData.append("photo", data.photo[0]);
    }

    return await axios.put(
      `${import.meta.env.VITE_BASE_URL}/users/upload-photo`,
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      },
    );
  }

  const { mutate: handleChangeProfilePhoto, isPending } = useMutation({
    mutationFn: ChangeProfilePhoto,
    onSuccess: () => {
      toast.success("Profile photo updated successfully", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Slide,
      });

      getProfileData(localStorage.getItem("token"));
      reset();
      setPreview(null);
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Photo update failed", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Slide,
      });
    },
  });

  const handleClose = () => {
    reset();
    setPreview(null);
    onClose();
  };

  return (
    <Modal
      show={show}
      size="md"
      onClose={handleClose}
      popup
      theme={glassModalTheme}
      position="center"
    >
      <ModalBody className="pt-8 pb-8 px-6">
        <form
          onSubmit={handleSubmit(handleChangeProfilePhoto)}
          className="space-y-6"
        >
          {/* Header */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white tracking-wide">
              Update Profile Photo
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Upload a new photo to change your look
            </p>
          </div>

          <div className="flex w-full items-center justify-center relative">
            <Label
              htmlFor="dropzone-file"
              className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-gray-900/50 hover:bg-gray-900/80 hover:border-blue-500/50 transition-all duration-300 group overflow-hidden"
            >
              {preview ? (
                <div className="relative h-full w-full flex items-center justify-center">
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full w-full object-contain p-2"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white font-medium">Click to change</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <FaCloudUploadAlt className="mb-4 h-12 w-12 text-gray-500 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300" />

                  <p className="mb-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    <span className="font-semibold text-blue-400">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
              )}

              <FileInput
                {...register("photo")}
                id="dropzone-file"
                className="hidden"
              />
            </Label>
          </div>

          {errors.photo && (
            <div className="text-center mt-2">
              <Alert error={errors.photo.message} />
            </div>
          )}

          <div className="flex justify-center gap-3">
            <Button
              type="submit"
              isLoading={isPending}
              loadingText="Uploading..."
              className="flex-1 bg-blue-600! hover:bg-blue-500! text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 rounded-xl border-0 focus:ring-0"
            >
              Upload Photo
            </Button>

            <Button
              color="gray"
              onClick={handleClose}
              disabled={isPending}
              className="flex-1 bg-white/5! border-white/10! text-gray-300 hover:bg-white/10! hover:text-white! rounded-xl focus:ring-0"
            >
              Cancel
            </Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}
