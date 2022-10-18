import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";
import { FavResponse } from "../loved";
import { useRouter } from "next/router";
import useSWR from "swr";

const Loved: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<FavResponse>(`/api/users/${router.query.id}/fav`);
  return (
    <Layout canGoBack hasTabBar>
      <div className="mx-4 md:grid md:grid-cols-2">
        {data?.favs?.map((fav) => (
          <div key={fav.product.id} className="md:mx-3 md:my-2">
            <Item
              id={fav.product.id}
              title={fav.product.title}
              subtitle={fav.product.subTitle}
              price={fav.product.price}
              hearts={fav.product._count.fav}
              prodcut={fav.product.image}
              comments={fav.product._count.chatRooms}
            />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Loved;
