import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";
import { Fav, Product } from "@prisma/client";
import useSWRInfinite from "swr/infinite";
import { useEffect } from "react";
import useScrollpage from "@libs/client/scrollPage";

export interface ProductWithCount extends Product {
  _count: {
    fav: number;
  };
}

interface FavWithProduct extends Fav {
  product: ProductWithCount;
}

interface FavResponse {
  ok: boolean;
  favs: FavWithProduct[];
}

const getKey = (pageIndex: number) => {
  return `/api/users/me/fav?page=${pageIndex + 1}`;
};
const Loved: NextPage = () => {
  const { data, setSize } = useSWRInfinite<FavResponse>(getKey, {
    initialSize: 1,
    revalidateAll: false,
  });
  const favs = data?.map((i) => i.favs).flat();
  const page = useScrollpage();
  useEffect(() => {
    setSize(page);
  }, [setSize, page]);
  return (
    <Layout canGoBack hasTabBar>
      <div className="mx-4 md:grid md:grid-cols-2">
        {favs?.map((product) => (
          <div key={product.id} className="md:mx-3 md:my-2">
            <Item
              id={product.productId}
              title={product.product.title}
              subtitle={product.product.subTitle}
              price={product.product.price}
              hearts={product.product._count.fav}
              prodcut={product.product.image}
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

export default Loved;
