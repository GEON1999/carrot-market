import React from "react";

interface SubmitBtnProps {
  title: string;
  [key: string]: any;
  disabled?: boolean;
}

export default function SubmitBtn({
  title,
  position,
  disabled = false,
}: SubmitBtnProps) {
  return (
    <button
      disabled={disabled}
      className={`${position} bg-orange-500 rounded-md w-full py-2 px-3 text-white shadow-sm hover:bg-orange-600 outline-none`}
    >
      {title}
    </button>
  );
}
