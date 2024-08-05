import type { NextPage } from "next";
import Layout from "@components/layout";
import Input from "@components/input";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ChatRoom, Messages, Product, User } from "@prisma/client";
import Message from "@components/message";
import { useEffect, useRef } from "react";
import useDelete from "@libs/client/useDelete";
import Image from "next/image";
import Link from "next/link";

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
  product: Product;
}

const ChatDetail: NextPage = () => {
  const router = useRouter();
  const chatRoomId = router.query.id;
  const scrollRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const [send] = useMutation<MessageResponse>(
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
  const [deleteNoti] = useDelete(`/api/chatRoom/notification`);
  const lastMessage = data?.chatRoom?.messages?.slice(-1)[0];
  const deleteNotification = () => {
    if (lastMessage?.user.id !== userData?.profile?.id) {
      deleteNoti({ chatRoomId });
    }
  };
  useEffect(() => {
    if (chatRoomId && lastMessage) {
      setInterval(deleteNotification, 3000);
    }
  }, [chatRoomId, lastMessage]);

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
    if (chatRoomId) {
      countingNoti({ chatRoomId });
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
        <div className="md:mx-auto md:max-w-4xl mt-10">
          <div className="relative pb-4 border-b w-full opacity-80 flex items-center space-x-3 ">
            <div className="ml-5">
              <Link href={`/products/${data?.product?.id}`}>
                <a>
                  <img
                    alt="product"
                    src={data?.product?.image}
                    className="object-cover rounded-lg w-20 h-20"
                  />
                </a>
              </Link>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-sm text-gray-700 dark:text-white">
                {data?.product?.title}
              </span>
              <span className="text-sm font-semibold">
                {data?.product?.price
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                원
              </span>
            </div>
          </div>
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
              <form className="mb-4" onSubmit={handleSubmit(onValid)}>
                <Input
                  position={"relative"}
                  kind="chat"
                  register={register("message", { required: true })}
                />
              </form>
            </div>
          </div>
        </div>
      </Layout>

      <div ref={scrollRef} />
    </>
  );
};

export default ChatDetail;
