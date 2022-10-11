import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/layout";
import ProfileInfo from "@components/profile";
import useSWR from "swr";
import { Post, Product, Review, User } from "@prisma/client";
import useSWRInfinite from "swr/infinite";
import useScrollpage from "@libs/client/scrollPage";
import { useEffect, useState } from "react";
import timeForToday from "@libs/client/timeForToday";
import Item from "@components/item";
import { useRouter } from "next/router";

interface ReviewWithUser extends Review {
  leavedBy: User;
}

interface ReviewsResponse {
  ok: boolean;
  reviews: ReviewWithUser[];
}

export interface UserProfile {
  ok: boolean;
  profile: User;
}

interface ProductWithProps extends Product {
  _count: {
    fav: number;
    chatRooms: number;
  };
  reviews: Review[];
}

interface PostwithUser extends Post {
  user: User;
  _count: {
    interest: number;
    comments: number;
  };
}

interface MineResponse {
  ok: boolean;
  products: ProductWithProps[];
  post: PostwithUser[];
  user: User;
}

const getKey = (pageIndex: number) => {
  return `/api/reviews?page=${pageIndex + 1}`;
};

const OtherProfile: NextPage = () => {
  const router = useRouter();
  const { data: userData } = useSWR<MineResponse>(
    router.query.id ? `/api/users/${router.query.id}` : ""
  );
  const { data, setSize } = useSWRInfinite<ReviewsResponse>(getKey, {
    initialSize: 1,
    revalidateAll: false,
  });
  const [post, setPost] = useState(false);
  const [product, setProduct] = useState(false);
  const [review, setReview] = useState(true);
  const reviews = data?.map((i) => i.reviews).flat();
  const page = useScrollpage();
  useEffect(() => {
    setSize(page);
  }, [setSize, page]);
  return (
    <Layout title={`${userData?.user?.name}님의 당근`} hasTabBar>
      <div className="px-4 py-4">
        <ProfileInfo
          avatar={userData?.user?.avatar}
          big
          name={userData?.user?.name}
        />

        <div className="my-14">
          <div
            className="flex pb-1 border-b w-52 cursor-pointer"
            onClick={() => {
              setPost((prev) => !prev);
            }}
          >
            <button className=" text-sm font-bold pr-1">
              {userData?.user?.name}님의 동네생활
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill={`${post ? `orange` : `none`}`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          {post
            ? userData?.post?.map((post: any) => (
                <div key={post?.id} className="border-b">
                  <Link href={`/community/${post?.id}`}>
                    <a>
                      <div className="flex flex-col items-start my-4">
                        <span className="bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full text-sm  mb-2">
                          동네질문
                        </span>

                        <div className="my-2 flex justify-between w-full text-gray-500 text-sm">
                          <span>
                            <span className="text-orange-500 font-bold">
                              Q.{" "}
                            </span>
                            {post?.question}
                          </span>
                          <span>{timeForToday(post?.createdAt)}</span>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              ))
            : null}
        </div>
        <div>
          <div
            onClick={() => setProduct((prev) => !prev)}
            className="flex pb-1 border-b w-52 cursor-pointer"
          >
            <button className=" text-sm font-bold  pr-1">
              {userData?.user?.name}님의 상품
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={`${product ? `orange` : `none`}`}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
              />
            </svg>
          </div>
          {product
            ? userData?.products?.map((product: any) => (
                <div key={product?.id}>
                  {product?.reviews[0]?.id ? null : (
                    <Item
                      id={product?.id}
                      title={product?.title}
                      subtitle={`${product?.subTitle} · ${timeForToday(
                        Number(new Date(product?.createdAt))
                      )}`}
                      price={product?.price}
                      prodcut={product?.image ? product.image : null}
                      hearts={product?._count.fav}
                      comments={product?._count.chatRooms}
                    />
                  )}
                </div>
              ))
            : null}
        </div>
        <div
          onClick={() => setReview((prev) => !prev)}
          className="flex pb-1 border-b w-32 cursor-pointer mt-14 mb-6 items-center"
        >
          <h2 className=" text-sm font-bold pr-1">받은 거래 후기</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={`${review ? `orange` : `none`}`}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
            />
          </svg>
        </div>

        {review
          ? reviews?.map((review) => (
              <>
                {review?.leaveForId === userData?.user?.id ? (
                  <div key={review?.id} className="space-y-6 mt-4">
                    <ProfileInfo
                      big={false}
                      name={review?.leavedBy.name}
                      subtitle={timeForToday(review?.createdAt)}
                      avatar={review?.leavedBy.avatar}
                    />
                    <div className="border-b border-gray-100">
                      <p className="text-gray-700 text-sm  -mt-5 ml-12 mb-4">
                        {review?.review}
                      </p>
                    </div>
                  </div>
                ) : null}
              </>
            ))
          : null}
      </div>
    </Layout>
  );
};

export default OtherProfile;
