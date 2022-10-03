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

const Finish: NextPage = () => {
  const router = useRouter();
  const { handleSubmit } = useForm();
  const productId = router.query.id;
  const { data } = useSWR(productId ? `/api/products/${productId}` : ``);
  const { data: userData } = useSWR(`/api/users/me`);
  const [key, setKey] = useState();
  const onClicked = async (e: any) => {
    await setKey(e);
  };
  const onSubmit = () => {
    if (key && productId) {
      router.push(`/products/${productId}/${key}/review`);
    }
  };
  useEffect(() => {
    if (data?.product?.userId !== userData?.profile?.id) {
      router.replace(`/products/${productId}`);
    }
  }, [router, data, userData, productId]);
  return (
    <Layout title="판매한 상대를 고르세요" hasTabBar>
      <div className="mx-4">
        {data?.product?.chatRooms?.map((chatRoom: any) => (
          <div onClick={() => onClicked(chatRoom.buyer.id)} key={chatRoom.id}>
            {chatRoom.messages[0] ? (
              <div
                className={`flex justify-between items-center ${
                  chatRoom.buyer.id === key ? "bg-gray-200 rounded-md" : ""
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <SubmitBtn title="확정하기" position={"mt-8"} />
        </form>
      </div>
    </Layout>
  );
};

export default Finish;
