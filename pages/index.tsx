import type { NextPage } from "next";
import FixedBtn from "@components/fixedBtn";
import Item from "@components/item";
import Layout from "@components/layout";
import Link from "next/link";
import useSWRInfinite from "swr/infinite";
import { AD, Product, Review } from "@prisma/client";
import { useEffect, useState } from "react";
import useScrollpage from "@libs/client/scrollPage";
import timeForToday from "@libs/client/timeForToday";

interface ProductWithProps extends Product {
  _count: {
    fav: number;
    chatRooms: number;
  };
  reviews: Review[];
  ADs: AD[];
}

interface ProductResponse {
  ok: boolean;
  products: ProductWithProps[];
}

const getKey = (pageIndex: number) => {
  return `/api/products?page=${pageIndex + 1}`;
};

const Home: NextPage = () => {
  const { data, setSize } = useSWRInfinite<ProductResponse>(getKey, {
    initialSize: 1,
    revalidateAll: false,
  });
  const products = data?.map((i) => i.products).flat();
  const page = useScrollpage();
  useEffect(() => {
    setSize(page);
  }, [setSize, page]);
  const [visible, setVisible] = useState(false);
  return (
    <div className="w-full h-full">
      <Layout title="홈" hasTabBar hasSearch>
        <div
          onClick={() => setVisible(false)}
          className={`${
            visible
              ? ` w-full h-full bg-black fixed opacity-10 z-80 left-0 top-0`
              : `-z-50`
          } `}
        ></div>
        <div className="mx-4 z-0 pt-2">
          {products?.map((product) => (
            <div key={product?.id}>
              {product?.reviews[0]?.review ? (
                ""
              ) : product?.ADs[0]?.id ? (
                <Item
                  ad={true}
                  id={product?.id}
                  title={product?.title}
                  subtitle={`${product?.subTitle} · ${timeForToday(
                    Number(new Date(product?.createdAt))
                  )}`}
                  price={product?.price}
                  hearts={product?._count.fav}
                  comments={product?._count.chatRooms}
                  prodcut={product?.image ? product.image : null}
                />
              ) : (
                <Item
                  id={product?.id}
                  title={product?.title}
                  subtitle={`${product?.subTitle} · ${timeForToday(
                    Number(new Date(product?.createdAt))
                  )}`}
                  price={product?.price}
                  hearts={product?._count.fav}
                  comments={product?._count.chatRooms}
                  prodcut={product?.image ? product.image : null}
                />
              )}
            </div>
          ))}
          {page >= 2 ? (
            <div className="p-10 text-center text-xl text-gray-500">
              no more content
            </div>
          ) : null}
        </div>
      </Layout>
      <form
        onSubmit={(e) => e.preventDefault()}
        onClick={() => setVisible((prev) => !prev)}
      >
        <FixedBtn>
          {visible ? (
            <div className="w-44 absolute bottom-20 -right-6 flex flex-col items-start justify-center  bg-white py-4 px-5 space-y-6 rounded-lg text-black">
              <Link href="/products/adUpload">
                <a>
                  <div className="flex w-28 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="orange"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mr-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                      />
                    </svg>
                    <button className="  rounded-md ">광고</button>
                  </div>
                </a>
              </Link>
              <Link href="/products/upload">
                <a>
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="orange"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mr-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                      />
                    </svg>

                    <button className="  rounded-md">내 물건 팔기</button>
                  </div>
                </a>
              </Link>
            </div>
          ) : null}
          <svg
            className="h-6 w-6"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FixedBtn>
      </form>
    </div>
  );
};

export default Home;
