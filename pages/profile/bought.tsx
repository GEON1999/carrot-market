import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";

import { Purchase } from "@prisma/client";
import { ProductWithCount } from "./loved";
import useSWRInfinite from "swr/infinite";
import { useEffect } from "react";
import useScrollpage from "@libs/client/scrollPage";

interface PurchaseWithProduct extends Purchase {
  product: ProductWithCount;
}

export interface PurchaseResponse {
  ok: boolean;
  purchases: PurchaseWithProduct[];
}

const getKey = (pageIndex: number) => {
  return `/api/users/me/purchase?page=${pageIndex + 1}`;
};

const Bought: NextPage = () => {
  const { data, setSize } = useSWRInfinite<PurchaseResponse>(getKey, {
    initialSize: 1,
    revalidateAll: false,
  });
  const purchases = data?.map((i) => i.purchases).flat();
  const page = useScrollpage();
  useEffect(() => {
    setSize(page);
  }, [setSize, page]);
  return (
    <Layout canGoBack hasTabBar>
      <div className="mx-4 md:grid md:grid-cols-2">
        {purchases?.map((product) => (
          <div key={product.id} className="md:mx-3 md:my-2">
            <Item
              id={product.productId}
              title={product.product.title}
              subtitle={product.product.subTitle}
              price={product.product.price}
              hearts={product.product._count.fav}
              prodcut={product.product.image}
              comments={product.product._count.chatRooms}
            />
          </div>
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

export default Bought;
