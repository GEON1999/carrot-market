import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";
import useSWR from "swr";
import { Product, Sale } from "@prisma/client";
import { ProductWithCount } from "./loved";
import useSWRInfinite from "swr/infinite";
import { useEffect } from "react";
import useScrollpage from "@libs/client/scrollPage";

interface SaleWithProduct extends Sale {
  product: ProductWithCount;
}

interface SaleResponse {
  ok: boolean;
  sales: SaleWithProduct[];
}

const getKey = (pageIndex: number) => {
  return `/api/users/me/sale?page=${pageIndex + 1}`;
};
const Sold: NextPage = () => {
  const { data, setSize } = useSWRInfinite<SaleResponse>(getKey, {
    initialSize: 1,
    revalidateAll: false,
  });
  const sales = data?.map((i) => i.sales).flat();
  const page = useScrollpage();
  useEffect(() => {
    setSize(page);
  }, [setSize, page]);
  return (
    <Layout canGoBack hasTabBar>
      <div className="mx-4">
        {sales?.map((product) => (
          <div key={product.id}>
            <Item
              id={product.productId}
              title={product.product.title}
              subtitle={product.product.subTitle}
              price={product.product.price}
              hearts={product.product._count.fav}
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

export default Sold;
