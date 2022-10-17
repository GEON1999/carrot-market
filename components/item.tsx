import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ItemProps {
  title: string;
  subtitle: string;
  price?: number | string;
  id: number;
  comments?: number;
  hearts?: number;
  prodcut?: string | null;
  ad?: boolean;
  sold?: boolean;
}

export default function Item({
  title,
  subtitle,
  price,
  id,
  comments = 0,
  hearts = 0,
  prodcut,
  ad = false,
  sold = false,
}: ItemProps) {
  return (
    <Link href={`/products/${id}`}>
      <a>
        <div
          className={`py-4 border-b border-gray-100 flex justify-between ${
            ad ? `bg-orange-50 rounded-lg` : ``
          }`}
        >
          <div className={`space-x-3 flex justify-center items-center ml-2`}>
            {prodcut ? (
              <Image
                alt="prodcut"
                width={80}
                height={80}
                src={`https://imagedelivery.net/xE6X7mlbIExkQau-XHoj-A/${prodcut}/profile`}
                className=" w-20 h-20 rounded-md"
                quality={100}
              />
            ) : (
              <div className="bg-gray-600 w-20 h-20 rounded-md" />
            )}
            <div className="flex flex-col">
              {ad ? (
                <div className="flex items-center">
                  <h3>{title} </h3>
                  <div className="px-2 py-1 ml-1 bg-orange-200 rounded-lg text-xs text-center ">
                    AD
                  </div>
                </div>
              ) : (
                <h3>{title}</h3>
              )}

              <span className="text-xs text-gray-400 mt-1 mb-2">
                {subtitle}
              </span>
              <div className="space-x-2">
                {sold ? (
                  <span className="text-xs text-white py-1 px-2 bg-gray-700 rounded-md">
                    거래완료
                  </span>
                ) : null}
                <span className="font-bold">
                  {price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-end space-x-2 mr-2">
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
      </a>
    </Link>
  );
}
