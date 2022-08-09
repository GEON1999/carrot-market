import React from "react";

interface SubmitBtnProps {
  title: string;
  px?: string;
  py?: string;
  mt?: string;
  mb?: string;
  mr?: string;
  ml?: string;
}

export default function SubmitBtn({
  title,
  px,
  py,
  mt,
  mb,
  mr,
  ml,
}: SubmitBtnProps) {
  return (
    <button
      className={`py-${py} px-${px} mb-${mb} mt-${mt} mr-${mr} ml-${ml} bg-orange-500 rounded-md w-full py-2 px-3 text-white shadow-sm hover:bg-orange-600 outline-none`}
    >
      {title}
    </button>
  );
}
