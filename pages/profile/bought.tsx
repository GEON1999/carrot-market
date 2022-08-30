import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";
import useSWR from "swr";
import { Product, Purchase } from "@prisma/client";
import { ProductWithCount } from "./loved";

interface PurchaseWithProduct extends Purchase {
  product: ProductWithCount;
}

interface PurchaseResponse {
  ok: boolean;
  purchases: PurchaseWithProduct[];
}

const Bought: NextPage = () => {
  const { data } = useSWR<PurchaseResponse>(`/api/users/me/purchase`);
  console.log(data);
  return (
    <Layout canGoBack hasTabBar>
      <div className="mx-4">
        {data?.purchases?.map((product) => (
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
        <button className="text-white fixed bottom-12 right-8 bg-orange-400 hover:bg-orange-500 p-4 rounded-full shadow-lg transition-colors">
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
        </button>
      </div>
    </Layout>
  );
};

export default Bought;
