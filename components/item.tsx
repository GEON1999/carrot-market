import Link from "next/link";
import React from "react";

interface ItemProps {
  title: string;
  subtitle: string;
  price?: number;
  id: number;
  comments?: number;
  hearts?: number;
}

export default function Item({
  title,
  subtitle,
  price,
  id,
  comments = 0,
  hearts = 0,
}: ItemProps) {
  return (
    <div className="py-4 border-b flex justify-between ">
      <Link href={`/products/${id}`}>
        <a>
          <div className="space-x-3 flex justify-center items-center">
            <div className="bg-gray-600 w-20 h-20" />
            <div className="flex flex-col">
              <h3 className="font-semibold">{title}</h3>
              <span className="text-sm text-gray-500">{subtitle}</span>
              <span className="mt-2 font-bold text-lg">$ {price}</span>
            </div>
          </div>
        </a>
      </Link>
      <div className="flex items-end space-x-2">
        <div className="flex items-center space-x-0.5">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
          <span>{hearts}</span>
        </div>
        <div className="flex items-center space-x-0.5">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
          </svg>
          <span>{comments}</span>
        </div>
      </div>
    </div>
  );
}
