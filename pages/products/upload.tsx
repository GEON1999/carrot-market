import type { NextPage } from "next";
import Input from "@components/input";
import Layout from "@components/layout";
import SubmitBtn from "@components/submitBtn";
import Textarea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

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
  const onVaild = async ({
    price,
    description,
    title,
    subTitle,
    photo,
  }: UploadProductForm) => {
    if (loading) return;
    if (photo && photo.length > 0) {
      const { uploadURL } = await (await fetch("/api/files")).json();
      const formData = new FormData();
      formData.append("file", photo[0], title);
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: formData,
        })
      ).json();
      upload({ price, description, title, subTitle, photoId: id });
    } else {
      upload({ price, description, title, subTitle });
    }
  };
  useEffect(() => {
    if (data?.ok) {
      router.push(`/products/${data.id}`);
    }
  }, [data, router]);
  const [productPreview, setProductPreview] = useState("");
  const photo = watch("photo");
  useEffect(() => {
    if (photo && photo.length > 0) {
      const file = photo[0];
      setProductPreview(URL.createObjectURL(file));
    }
  }, [photo]);
  return (
    <Layout canGoBack hasTabBar>
      <div className="px-4 py-2">
        {productPreview ? (
          <Image
            alt="product"
            width={480}
            height={384}
            src={productPreview}
            className="object-contain"
            quality={100}
          />
        ) : (
          <label className="mb-6 w-full cursor-pointer text-gray-600 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
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
              title="Title"
              type="text"
              position="mb-2"
              kind="text"
              register={register("title", { required: true })}
            />
            <Input
              id="subTitle"
              title="Subtitle"
              type="text"
              position="mb-2"
              kind="text"
              register={register("subTitle", { required: true })}
            />
            <Input
              id="price"
              title="Price"
              type="text"
              placeholder="0.00"
              kind="price"
              register={register("price", { required: true })}
            />
          </div>
          <div className="mt-2">
            <Textarea
              id="description"
              title="Description"
              label
              register={register("description", { required: true })}
            />
          </div>
          <SubmitBtn
            title={loading ? "Loading..." : "Upload product"}
            position={"mt-2"}
          />
        </form>
      </div>
    </Layout>
  );
};

export default Upload;
