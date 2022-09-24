import type { NextPage } from "next";
import Layout from "@components/layout";
import Input from "@components/input";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ChatRoom, Messages, User } from "@prisma/client";
import Message from "@components/message";
import { useEffect, useRef } from "react";

interface MessageForm {
  message: string;
}

interface MessageResponse {
  ok: boolean;
  message: string;
}

interface MessageWithUser extends Messages {
  user: User;
}

interface ChatRoomWith extends ChatRoom {
  messages: MessageWithUser[];
  buyer: User;
  seller: User;
}

interface ChatRoomResponse {
  ok: boolean;
  chatRoom: ChatRoomWith;
}

const ChatDetail: NextPage = () => {
  const router = useRouter();
  const chatRoomId = router.query.id;
  const scrollRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const [send, { loading, data: messageData }] = useMutation<MessageResponse>(
    `/api/chatRoom/${chatRoomId}/messages`
  );
  const { data, mutate } = useSWR<ChatRoomResponse>(
    chatRoomId ? `/api/chatRoom/${chatRoomId}` : null,
    {
      refreshInterval: 300,
      revalidateOnFocus: true,
    }
  );
  const { data: userData } = useSWR("/api/users/me");

  const [countingNoti] = useMutation(`/api/chatRoom/notification`);

  const otherUser = data?.chatRoom?.messages?.map((message) => {
    return message.user.id === userData?.profile?.id ? null : message.user.id;
  });
  const contactId = otherUser?.find((e) => (e !== null ? e : null));
  const onValid = (validForm: MessageForm) => {
    mutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          chatRoom: {
            ...prev.chatRoom,
            messages: [
              ...prev.chatRoom.messages,
              {
                id: Date.now(),
                message: validForm.message,
                user: { ...userData.profile },
              },
            ],
          },
        } as any),
      false
    );
    send(validForm);
    if (contactId && chatRoomId) {
      countingNoti({ contactId, chatRoomId });
    }
    reset();
  };
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [data]);

  return (
    <>
      <Layout canGoBack hasTabBar>
        <div className="px-4 py-2 space-y-5">
          <div className="">
            <div className="space-y-7 mb-6 ">
              {data?.chatRoom?.messages?.map((message) => (
                <div key={message.id}>
                  <Message
                    avatar={message.user.avatar}
                    text={message.message}
                    mine={
                      message.user.id === userData?.profile?.id ? true : false
                    }
                  />
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit(onValid)}>
              <Input
                position={"relative"}
                kind="chat"
                register={register("message", { required: true })}
              />
            </form>
          </div>
        </div>
      </Layout>

      <div ref={scrollRef} />
    </>
  );
};

export default ChatDetail;
