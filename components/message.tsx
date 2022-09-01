import React, { useRef } from "react";

interface MessageProps {
  text: string;
  mine?: boolean;
}

export default function Message({ text, mine }: MessageProps) {
  return (
    <>
      <div
        className={
          mine
            ? `flex items-start justify-start space-x-3 flex-row-reverse space-x-reverse`
            : `flex items-start justify-start space-x-3`
        }
      >
        <div className="rounded-full bg-gray-300 p-5" />
        <div className="border p-2 w-1/2 shadow-sm rounded-md">
          <p>{text}</p>
        </div>
      </div>
    </>
  );
}
