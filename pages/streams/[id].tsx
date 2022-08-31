import type { NextPage } from "next";
import Layout from "@components/layout";
import Message from "@components/message";
import ProfileInfo from "@components/profile";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Stream } from "@prisma/client";
import Input from "@components/input";

interface StreamWithUser extends Stream {
  user: {
    name: string;
  };
}

interface StreamResponse {
  ok: boolean;
  stream: StreamWithUser;
}

const StreamDetail: NextPage = () => {
  const router = useRouter();
  console.log(router.query.id);
  const { data } = useSWR<StreamResponse>(`/api/streams/${router.query.id}`);
  console.log(data);
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
        <div className="px-4 space-y-7 py-4 h-[40vh] overflow-scroll">
          <Message text="I don't know what you've been told" />
          <Message text="But time is running out, no need to take it slow" />
          <Message text="I'm stepping to you toe-to-toe" mine />
          <Message text="I should be scared, honey, maybe so" />
          <Message text="But I ain't worried 'bout it right now (right now)" />
          <Message text="Keeping dreams alive, 1999, heroes" />
          <Message text="I ain't worried 'bout it right now (right now)" mine />
          <Message text="Swimmin' in the floods (hey!)" />
          <Message text="Dancing on the clouds below" />
          <Message text="I ain't worried 'bout it" />
        </div>
        <div className="relative -top-2">
          <Input kind="chat" />
        </div>
      </div>
    </Layout>
  );
};

export default StreamDetail;
