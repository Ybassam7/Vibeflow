import React from "react";

export default function PostSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-6 mb-4 bg-white border border-gray-100 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800 animate-pulse">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gray-200 rounded-full dark:bg-gray-700 me-4"></div>

        <div className="flex flex-col gap-2">
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
        </div>
      </div>

      <div className="space-y-2 mb-2">
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-4/6"></div>
      </div>

      <div className="w-full h-64 bg-gray-200 rounded-lg dark:bg-gray-700 mt-2 mb-2"></div>

      <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
        <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
        <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
        <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
      </div>
    </div>
  );
}
