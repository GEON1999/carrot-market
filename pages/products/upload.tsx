import type { NextPage } from "next";
import Input from "@components/input";
import Layout from "@components/layout";
import SubmitBtn from "@components/submitBtn";
import Textarea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface UploadProductForm {
  price: string;
  description: string;
  title: string;
  subTitle: string;
  photo: FileList;
}

interface UploadProductMutation {
  ok: boolean;
  id: number;
}

const Upload: NextPage = () => {
  const { register, handleSubmit, watch } = useForm<UploadProductForm>();
  const [upload, { loading, data }] =
    useMutation<UploadProductMutation>("/api/products");
  const router = useRouter();

  const [image, setImage] = useState();

  const handleImage = async (e : any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    await formData.append("file", file);
    const result = await fetch(`/api/files`, {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    setImage(result.id);
  }

  const onVaild = async ({
    price,
    description,
    title,
    subTitle,
  }: UploadProductForm) => {
    if (loading) return;
    upload({ price, description, title, subTitle, photoId: image ?? "" });
  };
  useEffect(() => {
    if (data?.ok) {
      router.push(`/products/${data.id}`);
    }
  }, [data, router]);


  return (
    <Layout canGoBack hasTabBar>
      <div className="px-4 py-2 md:mx-auto md:max-w-2xl md:flex md:flex-col">
        {image ? (
            <div className={"flex justify-center"}>
              <img
                  alt="product"
                  className="object-cover rounded-full w-40 h-40"
                  src={image}
              />
            </div>
              ) : (
              <label
                  className="mb-6 w-full cursor-pointer text-gray-600 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md dark:text-gray-300">
                <svg
                    className="h-12 w-12"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                >
                  <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
                </svg>
                <input
                    onInput={handleImage}
                    {...register("photo")}
                    accept="image/*"
                    className="hidden"
                    type="file"
                />
              </label>
              )}
              <form onSubmit={handleSubmit(onVaild)}>
                <div>
                  <Input
                      id="title"
                      title="제목"
                      type="text"
                      position="mb-2"
                      kind="text"
                      register={register("title", {required: true})}
                  />
                  <Input
                      id="subTitle"
                      title="부제목"
                      type="text"
                      position="mb-2"
                      kind="text"
                      register={register("subTitle", {required: true})}
                  />
                  <Input
                      id="price"
                      title="가격"
                      type="text"
                      placeholder="0.00"
                      kind="price"
                      register={register("price", {required: true})}
                  />
                </div>
                <div className="mt-2">
                  <Textarea
                      id="description"
                      title="상품 설명"
                      label
                      register={register("description", {required: true})}
                  />
                </div>
                <SubmitBtn
                    title={loading ? "로딩..." : "상품 등록"}
                    position={"mt-2"}
                />
              </form>
            </div>
          </Layout>
          );
        };

        export default Upload;
