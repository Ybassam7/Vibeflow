import React, { useContext, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { FaBirthdayCake } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
import { AuthContext } from "../../../context/AuthContext";
import UpdatePhotoModal from "./UpdatePhotoModal";

const ProfileCard = () => {
  const { userData } = useContext(AuthContext);
  const [openPhotoModal, setOpenPhotoModal] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <>
      {userData && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 mt-6 mb-6">
          <div
            className={`flex flex-col items-center p-6 
            bg-gray-800/30 
            backdrop-blur-xl 
            rounded-2xl 
            border border-white/10 
            shadow-xl hover:shadow-2xl transition-all duration-300
            gap-3`}
          >
            <div className="relative mb-2">
              <div className="w-28 h-28 p-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <img
                  src={
                    userData.photo ||
                    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                  }
                  alt={userData.name}
                  className="w-full h-full rounded-full object-cover object-center shadow-inner"
                />
              </div>

              <button
                onClick={() => setOpenPhotoModal(true)}
                className="absolute bottom-1 right-1 
                bg-blue-600 hover:bg-blue-500 text-white 
                p-2 rounded-full shadow-lg border-4 border-[#1f2937] 
                transition-all duration-200 cursor-pointer group"
                title="Change Profile Photo"
              >
                <MdEdit className="text-sm group-hover:scale-110 transition-transform" />
              </button>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <h3 className="text-xl font-medium text-white tracking-wide text-center mb-1">
                {userData.name}
              </h3>

              {userData.dateOfBirth && (
                <div className="flex items-center gap-2 text-gray-400 group hover:text-blue-400 transition-colors duration-200">
                  <FaBirthdayCake className="text-base" />
                  <span className="text-sm font-normal">
                    Born {userData.dateOfBirth}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2 text-gray-400 group hover:text-blue-400 transition-colors duration-200">
                <HiOutlineMail className="text-base" />
                <span className="text-sm font-normal">
                  {userData.email || "No Email"}
                </span>
              </div>

              {userData.createdAt && (
                <div className="flex items-center gap-2 text-gray-400 group hover:text-blue-400 transition-colors duration-200">
                  <LuCalendarDays className="text-base" />
                  <span className="text-sm font-normal">
                    Joined {formatDate(userData.createdAt)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <UpdatePhotoModal
        show={openPhotoModal}
        onClose={() => setOpenPhotoModal(false)}
      />
    </>
  );
};

export default ProfileCard;
