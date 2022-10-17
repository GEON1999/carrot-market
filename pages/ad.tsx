import type { NextPage } from "next";
import FixedBtn from "@components/fixedBtn";
import Item from "@components/item";
import Layout from "@components/layout";
import Link from "next/link";
import useSWRInfinite from "swr/infinite";
import { AD, Product, Review } from "@prisma/client";
import { useEffect } from "react";
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

const AD: NextPage = () => {
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
    <Layout title="광고" hasTabBar>
      <div className="mx-4 md:grid md:grid-cols-2">
        {products?.map((product) => (
          <>
            {product?.reviews[0]?.review ? null : product?.ADs[0]?.id ? (
              <div key={product?.id} className="md:mx-3 md:my-2">
                <Item
                  id={product?.id}
                  title={product?.title}
                  subtitle={`${product?.subTitle} · ${timeForToday(
                    Number(new Date(product?.createdAt))
                  )}`}
                  price={product?.price
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  hearts={product?._count.fav}
                  comments={product?._count.chatRooms}
                  prodcut={product?.image ? product.image : null}
                />
              </div>
            ) : null}
          </>
        ))}
        {page >= 2 ? (
          <div className="p-10 text-center text-xl text-gray-500">
            no more content
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default AD;
