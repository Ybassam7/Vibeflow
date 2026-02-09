import React from "react";
import { Link } from "react-router-dom";
import { HiHome, HiOutlineExclamationCircle } from "react-icons/hi";
import Seo from "../../Components/seo/Seo";

export default function Notfound() {
  return (
    <>
      <Seo title="Page Not Found" />

      <section className="flex min-h-[80vh] items-center justify-center p-4">
        <div className="relative w-full max-w-lg text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-gray-800/50 p-10 shadow-2xl backdrop-blur-xl">
            <div className="relative">
              <h1 className="text-[9rem] font-black leading-none text-transparent bg-clip-text bg-linear-to-b from-white to-white/10 select-none">
                404
              </h1>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <HiOutlineExclamationCircle className="text-9xl text-blue-500/20 rotate-12" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Lost in the Vibe?
              </h2>
              <p className="text-gray-400 max-w-md mx-auto">
                The page you are looking for doesn't exist or has been moved.
                Let's get you back to the flow.
              </p>
            </div>

            <Link to="/" className="w-full sm:w-auto">
              <button
                type="button"
                className="group relative flex items-center justify-center gap-2 px-8 py-3 w-full sm:w-auto
                bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl 
                shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 
                transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <HiHome className="text-xl group-hover:scale-110 transition-transform" />
                <span>Back to Home</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
