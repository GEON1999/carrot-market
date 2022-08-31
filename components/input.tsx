import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form"; // import type : type 만을 import 함

interface InputProps {
  id?: string;
  title?: string;
  type?: string;
  placeholder?: string;
  kind?: "text" | "phone" | "price" | "chat";
  register?: UseFormRegisterReturn;
  [key: string]: any;
}

export default function Input({
  id,
  title,
  type,
  placeholder,
  kind,
  register,
  position,
}: InputProps) {
  return (
    <>
      <label className="text-sm text-gray-500" htmlFor={id}>
        {title}
      </label>
      {kind === "phone" ? (
        <>
          <div className="flex rounded-sm shadow-sm">
            <span className="flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none text-sm">
              +82
            </span>
            <input
              id={id}
              type={type}
              placeholder={placeholder}
              {...register}
              className="appearance-none border-gray-300 w-full border px-3 py-2 placeholder:text-gray-500 placeholder:text-sm rounded-md rounded-l-none   focus:outline-none focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        </>
      ) : null}
      {kind === "text" ? (
        <>
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            {...register}
            className={`${position}  border-gray-300 shadow-sm w-full border placeholder:text-gray-500 placeholder:text-sm rounded-md  px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-orange-500`}
          />
        </>
      ) : null}
      {kind === "chat" ? (
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
      ) : null}
      {kind === "price" ? (
        <div className="rounded-md relative flex  items-center shadow-sm">
          <div className="absolute left-0 pointer-events-none pl-3 flex items-center justify-center">
            <span className="text-gray-500 text-sm">\</span>
          </div>
          <input
            id={id}
            {...register}
            type={type}
            className="appearance-none pl-7 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
          <div className="absolute right-0 pointer-events-none pr-3 flex items-center">
            <span className="text-gray-500">KRW</span>
          </div>
        </div>
      ) : null}
    </>
  );
}
