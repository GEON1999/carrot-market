import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form"; // import type : type 만을 import 함

interface InputProps {
  id?: string;
  title?: string;
  type?: string;
  placeholder?: string;
  pl?: string;
  phone?: boolean;
  register?: UseFormRegisterReturn;
}

export default function Input({
  id,
  title,
  type,
  placeholder,
  phone,
  pl,
  register,
}: InputProps) {
  return (
    <>
      <label className="text-sm text-gray-500" htmlFor={id}>
        {title}
      </label>
      {phone ? (
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
      ) : (
        <>
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            {...register}
            className={`pl-${pl} border-gray-300 shadow-sm w-full border placeholder:text-gray-500 placeholder:text-sm rounded-md  px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-orange-500`}
          />
        </>
      )}
    </>
  );
}
