import React, { useState } from "react";

interface SubmitBtnProps {
  title: string;
  [key: string]: any;
  mine?: boolean;
}

export default function SubmitBtn({
  title,
  position,
  mine = false,
}: SubmitBtnProps) {
  return (
    <button
      disabled={mine}
      className={`${position} ${
        mine
          ? ` bg-gray-300 hover:bg-gray-400 focus:bg-gray-400 rounded-md w-full py-2 px-3 text-white shadow-sm outline-none`
          : "bg-orange-500 rounded-md w-full py-2 px-3 text-white shadow-sm hover:bg-orange-600 outline-none"
      } `}
    >
      {mine ? "불가능 합니다" : title}
    </button>
  );
}
