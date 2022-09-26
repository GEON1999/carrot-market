import { cls } from "@libs/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  title,
  canGoBack,
  hasTabBar,
  children,
}: LayoutProps) {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  const { data: userData } = useSWR("/api/users/me");
  const { data } = useSWR(`/api/chatRoom`);
  const [state, setState] = useState(false);
  useEffect(() => {
    data?.chatRooms?.map((chatRoom: any) => {
      if (
        chatRoom.sellerId === userData?.profile?.id ||
        chatRoom.buyerId === userData?.profile?.id
      ) {
        if (chatRoom.messages?.[0]?.userId !== userData?.profile?.id) {
          if (chatRoom._count.notifications !== 0) {
            setState(true);
          } else {
            setState(false);
          }
        }
      }
    });
  }, [data, state, router, userData]);
  return (
    <div>
      <div
        className={cls(
          "max-w-lg bg-white text-lg text-gray-700 font-semibold py-3 border-b border-gray-100 flex items-center fixed top-0 w-full cursor-pointer",
          canGoBack ? "justify-start px-4" : "justify-center"
        )}
      >
        {title ? (
          <span>{title}</span>
        ) : canGoBack ? (
          <span onClick={onClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </span>
        ) : null}
      </div>
      <div className={cls("pt-16", hasTabBar ? "pb-16" : "")}>{children}</div>
      {hasTabBar ? (
        <nav className="max-w-lg bg-white py-3 px-8 border-t flex justify-between items-center fixed bottom-0 w-full cursor-pointer">
          <Link href="/">
            <a
              className={cls(
                "flex flex-col items-center  text-sm",
                router.asPath === "/"
                  ? "text-orange-500"
                  : "hover:text-gray-500 transition-colors"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>홈</span>
            </a>
          </Link>
          <Link href="/community">
            <a
              className={cls(
                "flex flex-col items-center  text-sm",
                router.asPath === "/community"
                  ? "text-orange-500"
                  : "hover:text-gray-500 transition-colors"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              <span>동네생활</span>
            </a>
          </Link>

          <Link href="/chats">
            <a
              className={cls(
                "flex flex-col items-center  text-sm",
                router.asPath === "/chats"
                  ? "text-orange-500"
                  : "hover:text-gray-500 transition-colors"
              )}
            >
              {state ? (
                <div className="opacity-90 text-xs absolute h-6 w-6 bg-orange-500 text-white items-center flex justify-center text-center rounded-full -top-[0.1px] ml-4">
                  N
                </div>
              ) : null}
              <div className="flex flex-col justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <span>채팅</span>
              </div>
            </a>
          </Link>
          <Link href="/streams">
            <a
              className={cls(
                "flex flex-col items-center  text-sm",
                router.asPath === "/streams"
                  ? "text-orange-500"
                  : "hover:text-gray-500 transition-colors"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>라이브</span>
            </a>
          </Link>
          <Link href="/profile">
            <a
              className={cls(
                "flex flex-col items-center  text-sm",
                router.asPath === "/profile"
                  ? "text-orange-500"
                  : "hover:text-gray-500 transition-colors"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>나의 당근</span>
            </a>
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
