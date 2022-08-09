import React from "react";

interface ItemProps {
  title: string;
  subtitle: string;
  price?: string;
  px?: string;
  py?: string;
  mt?: string;
  mb?: string;
}

export default function Item({
  title,
  subtitle,
  price,
  px,
  py,
  mt,
  mb,
}: ItemProps) {
  return (
    <div className="space-x-3 flex justify-center items-center">
      <div className="bg-gray-600 w-20 h-20" />
      <div className="flex flex-col">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-sm text-gray-500">{subtitle}</span>
        <span className="mt-2 font-bold text-lg">$ {price}</span>
      </div>
    </div>
  );
}
