import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";
import { AD, Product, Review } from "@prisma/client";
import useScrollpage from "@libs/client/scrollPage";
import timeForToday from "@libs/client/timeForToday";
import Input from "@components/input";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";

interface ProductWithProps extends Product {
  _count: {
    fav: number;
    chatRooms: number;
  };
  reviews: Review[];
  ADs: AD[];
}

interface ProductResponse {
  ok: boolean;
  products: ProductWithProps[];
}

const Search: NextPage = () => {
  const [search, { data }] =
    useMutation<ProductResponse>(`/api/products/search`);
  const page = useScrollpage();

  const { register, handleSubmit } = useForm();
  const onValid = (validForm: any) => {
    search(validForm);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onValid)}
        className=" relative w-64 py-1  z-50 mx-auto md:mt-4"
      >
        <Input
          kind="text"
          position={" bg-gray-100 self-center"}
          placeholder={"검색어를 입력 하세요."}
          register={register("title")}
        />
      </form>
      <Layout canGoBack hasTabBar>
        <div className="mx-4 z-0 -mt-12">
          {data && data.ok
            ? data.products?.map((product) => (
                <div key={product?.id}>
                  {product?.reviews[0]?.review ? (
                    ""
                  ) : product?.ADs[0]?.id ? (
                    <Item
                      ad={true}
                      id={product?.id}
                      title={product?.title}
                      subtitle={`${product?.subTitle} · ${timeForToday(
                        Number(new Date(product?.createdAt))
                      )}`}
                      price={product?.price}
                      hearts={product?._count.fav}
                      comments={product?._count.chatRooms}
                      prodcut={product?.image ? product.image : null}
                    />
                  ) : (
                    <Item
                      id={product?.id}
                      title={product?.title}
                      subtitle={`${product?.subTitle} · ${timeForToday(
                        Number(new Date(product?.createdAt))
                      )}`}
                      price={product?.price}
                      hearts={product?._count.fav}
                      comments={product?._count.chatRooms}
                      prodcut={product?.image ? product.image : null}
                    />
                  )}
                </div>
              ))
            : null}
          {page >= 2 ? (
            <div className="p-10 text-center text-xl text-gray-500">
              no more content
            </div>
          ) : null}
        </div>
      </Layout>
    </div>
  );
};

export default Search;
