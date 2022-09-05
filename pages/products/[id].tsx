import type { NextPage } from "next";
import Layout from "@components/layout";
import ProfileInfo from "@components/profile";
import SubmitBtn from "@components/submitBtn";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";
import { Product, User } from "@prisma/client";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/utils";
import Link from "next/link";
import Image from "next/image";

interface ProductWitheUser extends Product {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  product: ProductWitheUser;
  relatedProducts: Product[];
  isLiked: boolean;
}

// 글 작성자가 본인인 경우 삭제 버튼이 노출되며 삭제할 수 있도록 해야함.

const ItemDetail: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const { data, mutate } = useSWR<ItemDetailResponse>(
    id ? `/api/products/${id}` : null
  );
  console.log(data);
  const [toggoleFav] = useMutation(`/api/products/${id}/fav`);
  const onFavClick = () => {
    if (!data) return;
    mutate({ ...data, isLiked: !data.isLiked }, false);
    toggoleFav({});
  };
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
          <ProfileInfo
            big
            name={data?.product?.user?.name}
            subtitle="View profile →"
            id={data?.product?.user?.id}
            avatar={data?.product?.user?.avatar}
            position={"mt-8"}
          />
          <div className="mt-3 ">
            <h1 className="font-bold text-3xl ">{data?.product?.title}</h1>
            <p className="mt-3 mb-4  text-xl">$ {data?.product?.price}</p>
            <p>{data?.product?.description}</p>
            <div className="mt-3 flex space-x-1">
              <SubmitBtn title="Talk to seller" />
              <button
                onClick={onFavClick}
                className={cls(
                  "py-3 px-3 bg-gray-200 flex justify-center items-center rounded-md outline-none",
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
          <h2 className="mb-3 font-bold text-xl">Similar items</h2>
          <div className="grid grid-cols-2 gap-10">
            {data?.relatedProducts?.map((product) => (
              <div key={product?.id} className="flex flex-col">
                <Link href={`/products/${product?.id}`}>
                  <a>
                    <div className="bg-gray-400 w-full aspect-square" />
                    <h3 className="text-gray-700 mt-2 -mb-1">
                      {product?.title}
                    </h3>
                    <p className="text-gray-900 text-sm">$ {product?.price}</p>
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
