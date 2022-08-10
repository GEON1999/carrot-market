import React from "react";

interface TextareaProps {
  label?: boolean;
  title?: string;
  id?: string;
  placeholder?: string;
}

export default function Textarea({
  label,
  title,
  id,
  placeholder,
}: TextareaProps) {
  return (
    <>
      {label ? (
        <label className="text-gray-500 text-sm" htmlFor={id}>
          {title}
        </label>
      ) : null}

      <div>
        <textarea
          id={id}
          rows={4}
          placeholder={placeholder}
          className="w-full rounded-md border-2 border-gray-300 hover:border-orange-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
        />
      </div>
    </>
  );
}
