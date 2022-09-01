import type { NextPage } from "next";
import Layout from "@components/layout";
import Message from "@components/message";
import ProfileInfo from "@components/profile";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Stream } from "@prisma/client";
import Input from "@components/input";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect, useRef } from "react";

interface StreamMessage {
  id: number;
  message: string;
  user: {
    id: number;
    avatar: string;
    name: string;
  };
}

interface StreamWithMessage extends Stream {
  user: {
    name: string;
  };
  streamMessages: StreamMessage[];
}

interface StreamResponse {
  ok: boolean;
  stream: StreamWithMessage;
}

interface MessageForm {
  message: string;
}

const StreamDetail: NextPage = () => {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: userData } = useSWR(`/api/users/me`);
  const streamId = router.query.id;
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const [sendMessage, { data: sendMessageData, loading }] = useMutation(
    `/api/streams/${streamId}/messages`
  );
  const { data, mutate } = useSWR<StreamResponse>(
    streamId ? `/api/streams/${streamId}` : null,
    {
      refreshInterval: 1000,
      revalidateOnFocus: true,
    }
  );
  const onValid = async (validForm: MessageForm) => {
    if (loading) return;
    mutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          stream: {
            ...prev.stream,
            streamMessages: [
              ...prev.stream.streamMessages,
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
    sendMessage(validForm);
    reset();
  };
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [data]);
  ` `;
  return (
    <Layout canGoBack hasTabBar>
      <div className=" px-4 py-2 space-y-7">
        <div className="space-y-2 pt-7">
          <div className="w-full aspect-video bg-gray-400 shadow-sm rounded-2xl" />
          <div className="space-y-3 ml-2">
            <h3 className="font-semibold first:text-xl text-gray-700">
              {data?.stream?.streamTitle}
            </h3>
            <ProfileInfo
              big
              name={data?.stream?.user.name}
              subtitle="I got eveything you want"
            />
            <div className=" pt-4 border-t">
              <h1 className=" text-xl font-semibold">{data?.stream?.title}</h1>
              <p className="mb-10">$ {data?.stream?.price}</p>
              <p>{data?.stream?.description}</p>
            </div>
          </div>
        </div>
        <div className="px-4 space-y-7 py-4 h-[40vh] overflow-scroll scrollbar scrollbar-thumb-inherit">
          {data?.stream?.streamMessages?.map((message) => (
            <div key={message.id}>
              <Message
                text={message.message}
                mine={message.user.id === userData?.profile?.id ? true : false}
              />
              <div ref={scrollRef} />
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit(onValid)}>
          <Input
            position={"relative -top-2"}
            kind="chat"
            register={register("message")}
          />
        </form>
      </div>
    </Layout>
  );
};

export default StreamDetail;
