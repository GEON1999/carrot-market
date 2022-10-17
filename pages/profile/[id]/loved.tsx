import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";

import { Purchase } from "@prisma/client";
import { ProductWithCount } from "../loved";
import { useRouter } from "next/router";
import useSWR from "swr";

const Loved: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR(`/api/users/${router.query.id}/fav`);
  console.log(data);

  return (
    <Layout canGoBack hasTabBar>
      <div className="mx-4 md:grid md:grid-cols-2">
        {data?.favs?.map((fav: any) => (
          <div key={fav.product.id} className="md:mx-3 md:my-2">
            <Item
              id={fav.product.id}
              title={fav.product.title}
              subtitle={fav.product.subTitle}
              price={fav.product.price}
              hearts={fav.product._count.fav}
              prodcut={fav.product.image}
            />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Loved;
