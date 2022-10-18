import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import { SaleResponse } from "../sold";

const Sold: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<SaleResponse>(`/api/users/${router.query.id}/sale`);
  return (
    <Layout canGoBack hasTabBar>
      <div className="mx-4 md:grid md:grid-cols-2">
        {data?.sales?.map((sold) => (
          <div key={sold.product.id} className="md:mx-3 md:my-2">
            <Item
              id={sold.product.id}
              title={sold.product.title}
              subtitle={sold.product.subTitle}
              price={sold.product.price}
              hearts={sold.product._count.fav}
              prodcut={sold.product.image}
              comments={sold.product._count.chatRooms}
            />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Sold;
