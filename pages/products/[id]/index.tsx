import type { NextPage } from "next";
import Layout from "@components/layout";
import ProfileInfo from "@components/profile";
import SubmitBtn from "@components/submitBtn";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { AD, ChatRoom, Product, Review, User } from "@prisma/client";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/utils";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import timeForToday from "@libs/client/timeForToday";
import useDelete from "@libs/client/useDelete";

interface ProductWitheProps extends Product {
  user: User;
  reviews: Review[];
  ADs: AD[];
}

interface ItemDetailResponse {
  ok: boolean;
  product: ProductWitheProps;
  relatedProducts: Product[];
  isLiked: boolean;
}

interface MessageResponse {
  ok: boolean;
  chatRoom: ChatRoom;
  isChatRoom?: ChatRoom;
}

// 글 작성자가 본인인 경우 삭제 버튼이 노출되며 삭제할 수 있도록 해야함.

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const [state, setState] = useState<"판매중" | "판매완료">("판매중");
  const [effect, setEffect] = useState(false);
  const [ownerMenu, setOwnerMenu] = useState(false);
  const { id } = router.query;
  const { data, mutate } = useSWR<ItemDetailResponse>(
    id ? `/api/products/${id}` : null
  );
  const { data: userData } = useSWR(`/api/users/me`);
  const [toggoleFav] = useMutation(`/api/products/${id}/fav`);
  const [deleteProduct] = useDelete(`/api/products/${id}`);
  const onFavClick = () => {
    if (!data) return;
    mutate({ ...data, isLiked: !data.isLiked }, false);
    toggoleFav({});
  };
  const { handleSubmit } = useForm();
  const [send, { data: chatRoomData, loading }] =
    useMutation<MessageResponse>("/api/chatRoom");
  const onVaild = () => {
    send(id);
  };

  const onClicked = () => {
    deleteProduct();
    router.push("/profile");
  };
  const handleChange = (e: any) => {
    setState(e.target.value);
  };
  useEffect(() => {
    if (state === "판매완료") {
      router.push(`/products/${id}/finish`);
    }
  }, [state, router, id]);
  useEffect(() => {
    if (chatRoomData && chatRoomData?.chatRoom) {
      router.push(`/chats/${chatRoomData.chatRoom?.id}`);
    } else if (chatRoomData?.isChatRoom) {
      router.push(`/chats/${chatRoomData.isChatRoom?.id}`);
    }
  }, [chatRoomData, router]);
  return (
    <Layout canGoBack hasTabBar>
      <div className="mx-4">
        <div className="mt-4">
          {data?.product?.image ? (
            <Image
              alt="product"
              width={480}
              height={384}
              src={`https://imagedelivery.net/xE6X7mlbIExkQau-XHoj-A/${data?.product?.image}/public`}
              className="object-contain"
              quality={100}
            />
          ) : (
            <div className="h-96 bg-gray-400" />
          )}
          <div className="pb-2 border-b">
            <div className="flex justify-between items-center content-center">
              <ProfileInfo
                big
                subtitle={timeForToday(data?.product?.createdAt)}
                name={data?.product?.user?.name}
                id={data?.product?.user?.id}
                avatar={data?.product?.user?.avatar}
                position={"mt-8"}
              />
              <button
                className={`${ownerMenu ? "hidden" : ""}`}
                onClick={() => {
                  userData?.profile?.id !== data?.product?.userId ||
                  data?.product?.reviews[0]?.review
                    ? setEffect(true)
                    : setOwnerMenu(true);
                }}
                onAnimationEnd={() => setEffect(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-7 h-7 items-center mt-2 ${
                    effect && "animate-wiggle"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                  />
                </svg>
              </button>
              {ownerMenu ? (
                <div className="flex w-36 space-x-2 mt-5">
                  <button
                    onClick={onClicked}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-1/2"
                  >
                    삭제
                  </button>
                  <select
                    onChange={handleChange}
                    value={state}
                    className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  >
                    <option value={"판매중"}>판매중</option>
                    <option value={"판매완료"}>판매완료</option>
                  </select>
                </div>
              ) : null}
            </div>
            <div className="mt-5 ml-1 space-y-2">
              {data?.product?.ADs[0]?.id ? (
                <div className="flex space-x-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                    />
                  </svg>

                  <p className="font-semibold">{data?.product?.price} 원</p>
                </div>
              ) : null}
              {data?.product?.ADs[0]?.phone ? (
                <div className="flex space-x-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>

                  <p>{data?.product?.ADs[0]?.phone}</p>
                </div>
              ) : null}
              {data?.product?.ADs[0]?.address ? (
                <div className="flex space-x-2 items-center pb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>

                  <p>{data?.product?.ADs[0]?.address}</p>
                </div>
              ) : null}
            </div>
          </div>
          <div className="mt-3 ">
            <h1 className="font-bold text-xl ">{data?.product?.title}</h1>

            {!data?.product?.ADs[0]?.id ? (
              <p className=" mt-1">{data?.product?.price}원</p>
            ) : null}

            <p className="my-8">{data?.product?.description}</p>
            <div className="mt-3 flex space-x-1">
              <form className="w-full" onSubmit={handleSubmit(onVaild)}>
                <SubmitBtn
                  position={`py-2`}
                  title={loading ? "Loading...." : "채팅하기"}
                  mine={
                    userData?.profile?.id === data?.product?.userId
                      ? true
                      : false
                  }
                />
              </form>
              <button
                onClick={onFavClick}
                className={cls(
                  "py-2 px-2 bg-gray-200 flex justify-center items-center rounded-md outline-none",
                  data?.isLiked
                    ? "text-red-500 hover:text-red-600"
                    : "text-gray-500 hover:text-red-500"
                )}
              >
                {data?.isLiked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="mb-3 font-semibold text-base">비슷한 상품</h2>
          <div className="grid grid-cols-2 gap-10">
            {data?.relatedProducts?.map((product) => (
              <div key={product?.id} className="flex flex-col mb-8">
                <Link href={`/products/${product?.id}`}>
                  <a>
                    {product?.image ? (
                      <Image
                        alt="product"
                        width={480}
                        height={384}
                        src={`https://imagedelivery.net/xE6X7mlbIExkQau-XHoj-A/${product?.image}/public`}
                        className="object-contain"
                        quality={100}
                      />
                    ) : (
                      <div className="h-96 bg-gray-400" />
                    )}
                    <h3 className="text-gray-700 mt-2 -mb-1">
                      {product?.title}
                    </h3>
                    <p className="text-gray-900 text-sm">{product?.price}원</p>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
