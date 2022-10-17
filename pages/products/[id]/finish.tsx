import type { NextPage } from "next";
import Layout from "@components/layout";
import SubmitBtn from "@components/submitBtn";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import ProfileInfo from "@components/profile";
import timeForToday from "@libs/client/timeForToday";
import { ChatRoom, Messages, Product, User } from "@prisma/client";

interface ChatRoomsWithProps extends ChatRoom {
  buyer: User;
  messages: Messages[];
}

interface ProductWithChatRooms extends Product {
  chatRooms: ChatRoomsWithProps[];
}

interface ProductResponse {
  ok: boolean;
  product: ProductWithChatRooms;
  isLiked: boolean;
}

const Finish: NextPage = () => {
  const router = useRouter();
  const { handleSubmit } = useForm();
  const productId = router.query.id;
  const { data } = useSWR<ProductResponse>(
    productId ? `/api/products/${productId}` : ``
  );
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
      <div className="mx-4 md:mx-auto md:max-w-2xl">
        {data?.product?.chatRooms?.map((chatRoom) => (
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
