import React from "react";

interface SubmitBtnProps {
  title: string;
  [key: string]: any;
}

export default function SubmitBtn({ title, position }: SubmitBtnProps) {
  return (
    <button
      className={`${position} bg-orange-500 rounded-md w-full py-2 px-3 text-white shadow-sm hover:bg-orange-600 outline-none`}
    >
      {title}
    </button>
  );
}
