import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";
import useSWR from "swr";
import { Product, Sale } from "@prisma/client";
import { ProductWithCount } from "./loved";

interface SaleWithProduct extends Sale {
  product: ProductWithCount;
}

interface SaleResponse {
  ok: boolean;
  sales: SaleWithProduct[];
}

const Sold: NextPage = () => {
  const { data } = useSWR<SaleResponse>(`/api/users/me/sale`);
  console.log(data);
  return (
    <Layout canGoBack hasTabBar>
      <div className="mx-4">
        {data?.sales?.map((product) => (
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
      </div>
    </Layout>
  );
};

export default Sold;
