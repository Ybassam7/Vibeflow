import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import VibeNav from "./Navbar";
import VibeFooter from "./Footer";

function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a] text-gray-100 font-rubik">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <VibeNav />

        <main className="grow container mx-auto px-4 py-8">
          <Outlet />
        </main>

        <VibeFooter />
      </div>
    </div>
  );
}

export default Layout;
