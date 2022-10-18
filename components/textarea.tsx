import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextareaProps {
  label?: boolean;
  title?: string;
  id?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
}

export default function Textarea({
  label,
  title,
  id,
  placeholder,
  register,
}: TextareaProps) {
  return (
    <>
      {label ? (
        <label
          className="text-gray-500 text-sm dark:text-gray-300"
          htmlFor={id}
        >
          {title}
        </label>
      ) : null}

      <div>
        <textarea
          id={id}
          rows={4}
          placeholder={placeholder}
          {...register}
          className="w-full rounded-md border-2 border-gray-300 hover:border-orange-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500 dark:text-black"
        />
      </div>
    </>
  );
}
