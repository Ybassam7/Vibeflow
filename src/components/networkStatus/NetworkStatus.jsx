import React from "react";
import { Offline, Online } from "react-detect-offline";
import { RiWifiOffLine, RiWifiLine } from "react-icons/ri";

export default function NetworkStatus() {
  return (
    <>
      <Offline>
        <div className="fixed bottom-6 left-6 z-50 animate-bounce-slow">
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-red-500/90 backdrop-blur-sm text-white shadow-lg shadow-red-500/20 border border-white/10">
            <div className="bg-white/20 p-1.5 rounded-full">
              <RiWifiOffLine className="text-lg animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-wide">
                No Connection
              </span>
              <span className="text-[10px] opacity-90 font-medium">
                Trying to reconnect...
              </span>
            </div>
          </div>
        </div>
      </Offline>
    </>
  );
}
