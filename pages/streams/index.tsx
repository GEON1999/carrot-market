import type { NextPage } from "next";
import Link from "next/link";
import FixedBtn from "@components/fixedBtn";
import Layout from "@components/layout";
import ProfileInfo from "@components/profile";
import { Stream, User } from "@prisma/client";
import useSWRInfinite from "swr/infinite";
import useScrollpage from "@libs/client/scrollPage";
import { useEffect } from "react";

interface StreamsWithUser extends Stream {
  user: User;
}

interface StreamsResponse {
  ok: boolean;
  streams: StreamsWithUser[];
}

const getKey = (pageIndex: number) => {
  return `/api/streams?page=${pageIndex + 1}`;
};

const Streams: NextPage = () => {
  const { data, setSize, size } = useSWRInfinite<StreamsResponse>(getKey, {
    initialSize: 1,
    revalidateAll: false,
  });
  const streams = data?.map((i) => i.streams).flat();
  const page = useScrollpage();
  useEffect(() => {
    setSize(page);
  }, [setSize, page]);
  console.log(size);
  return (
    <Layout title="라이브" hasTabBar>
      <div className=" px-4 py-2 space-y-9 divide-y-2">
        {streams?.map((stream) => (
          <div key={stream.id} className=" pt-7">
            <Link href={`/streams/${stream.id}`}>
              <a>
                <div className="w-full aspect-video bg-gray-400 shadow-sm rounded-2xl my-2" />
                <div className="space-y-3 ml-2">
                  <h3 className="font-bold first:text-xl text-gray-700">
                    {stream.streamTitle}
                  </h3>
                  <ProfileInfo
                    big={false}
                    name={stream.user.name}
                    subtitle="I got eveything you want"
                  />
                </div>
              </a>
            </Link>
          </div>
        ))}
        {page >= 2 ? (
          <div className="p-10 text-center text-xl text-gray-500">
            no more content
          </div>
        ) : null}
        <Link href="/streams/create">
          <a>
            <FixedBtn>
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
            </FixedBtn>
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export default Streams;
