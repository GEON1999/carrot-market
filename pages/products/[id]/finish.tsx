import type { NextPage } from "next";
import Input from "@components/input";
import Layout from "@components/layout";
import SubmitBtn from "@components/submitBtn";
import Textarea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import useSWR from "swr";
import Link from "next/link";
import ProfileInfo from "@components/profile";
import timeForToday from "@libs/client/timeForToday";

const Upload: NextPage = () => {
  const router = useRouter();
  const productId = router.query.id;
  const { data } = useSWR(`/api/products/${productId}`);
  console.log(data);
  const [buyer, setBuyer] = useState(false);
  const onClicked = (e: any) => {
    console.log(e);
  };
  return (
    <Layout title="판매한 상대를 고르세요" hasTabBar>
      <div className="mx-4">
        {data?.product?.messages?.map((chatRoom: any, i: any) => (
          <div onClick={onClicked} key={i}>
            {chatRoom.messages[0] ? (
              <div
                className={`flex justify-between items-center ${
                  buyer ? "bg-gray-200 rounded-md" : ""
                }`}
              >
                <ProfileInfo
                  big
                  name={chatRoom.buyer.name}
                  avatar={chatRoom.buyer.avatar}
                  subtitle={""}
                  position={"m-4"}
                />
                <span className="text-xs text-gray-400 mr-5 ">
                  {timeForToday(
                    Number(new Date(`${chatRoom.messages[0].updatedAt}`))
                  )}
                </span>
              </div>
            ) : null}
          </div>
        ))}
        <SubmitBtn title="확정하기" position={"mt-8"} />
      </div>
    </Layout>
  );
};

export default Upload;
