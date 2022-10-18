import Image from "next/image";
import React, { useRef } from "react";

interface MessageProps {
  text: string;
  mine?: boolean;
  avatar?: string | null;
}

export default function Message({ text, mine, avatar }: MessageProps) {
  return (
    <>
      <div
        className={
          mine
            ? `flex items-start justify-start space-x-3 flex-row-reverse space-x-reverse`
            : `flex items-start justify-start space-x-3`
        }
      >
        {mine ? null : avatar ? (
          <Image
            width={40}
            height={40}
            alt="profile"
            src={`https://imagedelivery.net/xE6X7mlbIExkQau-XHoj-A/${avatar}/profile`}
            className="rounded-full bg-gray-300 z-0"
            quality={100}
          />
        ) : (
          <div className="rounded-full bg-gray-300 w-10 h-10" />
        )}

        <div
          className={` px-4 py-2 w-1/2 shadow-sm rounded-3xl text-sm ${
            mine
              ? "bg-orange-400 text-white"
              : "bg-gray-100  dark:text-gray-800"
          }`}
        >
          <p>{text}</p>
        </div>
      </div>
    </>
  );
}
