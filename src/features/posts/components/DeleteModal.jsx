"use client";

import { Modal, ModalBody } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Button from "../../../components/ui/Button";

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

export default function DeleteModal({
  show,
  onClose,
  onConfirm,
  isLoading,
  itemType = "item",
}) {
  return (
    <Modal
      show={show}
      size="md"
      onClose={onClose}
      popup
      theme={glassModalTheme}
      position="center"
    >
      <ModalBody className="pt-8 pb-8 px-6">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
            <HiOutlineExclamationCircle className="h-12 w-12 text-red-500" />
          </div>

          <h3 className="mb-2 text-xl font-semibold text-white tracking-wide">
            Are you sure?
          </h3>

          <p className="mb-8 text-gray-400 font-normal text-base leading-relaxed">
            Do you really want to delete this{" "}
            <span className="text-gray-300 font-medium">{itemType}</span>?
            <br />
            This process cannot be undone.
          </p>

          <div className="flex justify-center gap-3">
            <Button
              onClick={onConfirm}
              isLoading={isLoading}
              loadingText="Deleting..."
              className="flex-1 bg-red-500! hover:bg-red-600! text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/30 rounded-xl border-0 focus:ring-0"
            >
              Yes, I'm sure
            </Button>

            <Button
              color="gray"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 bg-white/5! border-white/10! text-gray-300 hover:bg-white/10! hover:text-white! rounded-xl focus:ring-0"
            >
              No, cancel
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
