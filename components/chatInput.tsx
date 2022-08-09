import React from "react";

export default function ChatInput() {
  return (
    <>
      <input
        type="text"
        className="border-gray-400 shadow-sm w-full border placeholder:text-gray-500 placeholder:text-sm rounded-3xl  px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-orange-500"
      />
      <div className="absolute top-0.5 right-1.5 text-orange-500 hover:text-orange-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-9 w-9"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </>
  );
}
