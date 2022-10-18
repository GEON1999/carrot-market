import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import { PurchaseResponse } from "../bought";

const Bought: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<PurchaseResponse>(
    `/api/users/${router.query.id}/purchase`
  );
  return (
    <Layout canGoBack hasTabBar>
      <div className="mx-4 md:grid md:grid-cols-2">
        {data?.purchases?.map((purchase) => (
          <div key={purchase.product.id} className="md:mx-3 md:my-2">
            <Item
              id={purchase.product.id}
              title={purchase.product.title}
              subtitle={purchase.product.subTitle}
              price={purchase.product.price}
              hearts={purchase.product._count.fav}
              prodcut={purchase.product.image}
              comments={purchase.product._count.chatRooms}
            />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Bought;
