import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/layout";
import ProfileInfo from "@components/profile";
import useSWR from "swr";
import { ChatRoom, Messages, User } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import timeForToday from "@libs/client/timeForToday";
import useDelete from "@libs/client/useDelete";

interface ChatRoomWith extends ChatRoom {
  messages: Messages[];
  buyer: User;
  seller: User;
  _count: { notifications: number };
}

interface ChatRoomResponse {
  ok: boolean;
  chatRooms: ChatRoomWith[];
}
const Chats: NextPage = () => {
  const { data: userData } = useSWR("/api/users/me");
  const { data } = useSWR<ChatRoomResponse>(`/api/chatRoom`);
  const [active, setActive] = useState(false);
  const activeDeleteBtn = () => {
    setActive((prev) => !prev);
  };
  const [deleteChatRoom] = useDelete(`/api/chatRoom`);
  const onClicked = (chatRoomId: number, e: any) => {
    deleteChatRoom(chatRoomId);
    location.reload();
  };

  return (
    <Layout title="채팅" hasTabBar>
      <div className="flex justify-end my-1 mr-2">
        <button onClick={activeDeleteBtn} className="mr-2">
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
      <div className="divide-y-[1px] py-2">
        {data?.chatRooms?.map((chatRoom: any) => (
          <Link href={active ? "" : `chats/${chatRoom.id}`} key={chatRoom.id}>
            <a>
              {chatRoom.sellerId === userData?.profile?.id ||
              chatRoom.buyerId === userData?.profile?.id ? (
                <>
                  {chatRoom.messages[0] ? (
                    <div className="flex justify-between items-center">
                      <ProfileInfo
                        big
                        name={
                          chatRoom.sellerId === userData?.profile?.id
                            ? chatRoom.buyer.name
                            : chatRoom.buyerId === userData?.profile?.id
                            ? chatRoom.seller.name
                            : ""
                        }
                        avatar={
                          chatRoom.sellerId === userData?.profile?.id
                            ? chatRoom.buyer.avatar
                            : chatRoom.buyerId === userData?.profile?.id
                            ? chatRoom.seller.avatar
                            : ""
                        }
                        subtitle={chatRoom.messages?.[0].message}
                        position={"m-4"}
                      />
                      <div className="mr-4 space-x-2 flex items-center">
                        {chatRoom.messages?.[0].userId !==
                        userData?.profile?.id ? (
                          chatRoom._count.notifications !== 0 ? (
                            <span className="text-sm text-white w-5 h-5 bg-orange-400 rounded-full flex items-center justify-center">
                              {chatRoom._count.notifications}
                            </span>
                          ) : (
                            <span></span>
                          )
                        ) : (
                          <span></span>
                        )}
                        {active ? (
                          <button onClick={(e) => onClicked(chatRoom.id, e)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6 text-gray-700"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400 mr-5 ">
                            {timeForToday(
                              Number(
                                new Date(`${chatRoom.messages[0].updatedAt}`)
                              )
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  ) : null}
                </>
              ) : null}
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
