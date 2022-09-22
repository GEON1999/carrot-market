import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/layout";
import ProfileInfo from "@components/profile";
import useSWR from "swr";
import { ChatRoom, Messages, User } from "@prisma/client";
import { useMemo } from "react";
import timeForToday from "@libs/client/timeForToday";

interface ChatRoomWith extends ChatRoom {
  messages: Messages[];
  buyer: User;
  seller: User;
}

interface ChatRoomResponse {
  ok: boolean;
  chatRooms: ChatRoomWith[];
}
const Chats: NextPage = () => {
  const { data: userData } = useSWR("/api/users/me");
  const { data } = useSWR<ChatRoomResponse>(`/api/chatRoom`);

  return (
    <Layout title="채팅" hasTabBar>
      <div className="divide-y-[1px] py-2">
        {data?.chatRooms?.map((chatRoom: any) => (
          <Link href={`chats/${chatRoom.id}`} key={chatRoom.id}>
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
                      <span className="text-xs text-gray-400 mr-5 ">
                        {timeForToday(
                          Number(new Date(`${chatRoom.messages[0].updatedAt}`))
                        )}
                      </span>
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
