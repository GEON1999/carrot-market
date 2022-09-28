import type { NextPage } from "next";
import FixedBtn from "@components/fixedBtn";
import Item from "@components/item";
import Layout from "@components/layout";
import Link from "next/link";
import useSWRInfinite from "swr/infinite";
import { Product, Review } from "@prisma/client";
import { useEffect } from "react";
import useScrollpage from "@libs/client/scrollPage";
import timeForToday from "@libs/client/timeForToday";

interface ProductWithProps extends Product {
  _count: {
    fav: number;
    chatRooms: number;
  };
  reviews: Review[];
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
  return (
    <Layout title="홈" hasTabBar>
      <div className="mx-4">
        {products?.map((product) => (
          <div key={product?.id}>
            {product?.reviews[0]?.review ? (
              ""
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
        <Link href="/products/upload">
          <a>
            <FixedBtn>
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
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
