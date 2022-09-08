import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/layout";
import ProfileInfo from "@components/profile";
import useSWR from "swr";
import { ChatRoom, Messages, User } from "@prisma/client";

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
  console.log(data);
  return (
    <Layout title="채팅" hasTabBar>
      <div className="divide-y-[1px] py-2">
        {data?.chatRooms?.map((chatRoom: any) => (
          <Link href={`chats/${chatRoom.id}`} key={chatRoom.id}>
            <a>
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
                subtitle={chatRoom.messages.slice(-1)[0].message}
                position={"m-4"}
              />
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
