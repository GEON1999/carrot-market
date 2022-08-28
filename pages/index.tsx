import type { NextPage } from "next";
import FixedBtn from "@components/fixedBtn";
import Item from "@components/item";
import Layout from "@components/layout";
import Link from "next/link";
import useUser from "@libs/client/useUser";
import useSWR from "swr";
import { Product } from "@prisma/client";

interface ProductWithFavCount extends Product {
  _count: {
    fav: number;
  };
}

interface ProductResponse {
  ok: boolean;
  products: ProductWithFavCount[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<ProductResponse>("/api/products");
  return (
    <Layout title="홈" hasTabBar>
      <div className="mx-4">
        {data?.products?.map((product) => (
          <Item
            id={product.id}
            key={product.id}
            title={product.title}
            subtitle={product.subTitle}
            price={product.price}
            hearts={product._count.fav}
          />
        ))}
        <Link href="/products/upload">
          <a>
            <FixedBtn>
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
            </FixedBtn>
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
