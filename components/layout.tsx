import { cls } from "@libs/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  hasSearch?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  title,
  canGoBack,
  hasTabBar,
  children,
  hasSearch,
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
        {hasSearch ? (
          <Link href="/search">
            <a className="fixed right-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </a>
          </Link>
        ) : null}
      </div>
      <div className={cls("pt-16", hasTabBar ? "pb-16" : "")}>{children}</div>
      {hasTabBar ? (
        <nav className="max-w-lg bg-white py-3 px-5 border-t flex justify-between items-center fixed bottom-0 w-full cursor-pointer">
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
              <span className="text-xs">홈</span>
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
              <span className="text-xs">동네생활</span>
            </a>
          </Link>
          <Link href="/ad">
            <a
              className={cls(
                "flex flex-col items-center  text-sm",
                router.asPath === "/ad"
                  ? "text-orange-500"
                  : "hover:text-gray-500 transition-colors"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                />
              </svg>

              <span className="text-xs">광고</span>
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
                <span className="text-xs">채팅</span>
              </div>
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
              <span className="text-xs">나의 당근</span>
            </a>
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
