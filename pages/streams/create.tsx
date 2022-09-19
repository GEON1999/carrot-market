import type { NextPage } from "next";
import Input from "@components/input";
import Layout from "@components/layout";
import SubmitBtn from "@components/submitBtn";
import Textarea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Stream } from "@prisma/client";

interface StreamForm {
  stream: string;
  product: string;
  price: number;
  description: string;
}

interface StreamResponse {
  ok: boolean;
  streams: Stream;
}

const Create: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<StreamForm>();
  const [createstream, { data, loading }] =
    useMutation<StreamResponse>(`/api/streams`);
  const onValid = (validForm: StreamForm) => {
    if (loading) return;
    createstream(validForm);
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/streams/${data?.streams.id}`);
    }
  }, [data, router]);
  return (
    <Layout canGoBack hasTabBar>
      <form onSubmit={handleSubmit(onValid)}>
        <div className="px-4 py-2">
          <div className="space-y-3">
            <div>
              <Input
                title="Stream"
                id="stream"
                type="text"
                placeholder="Stream title"
                position="mb-3"
                register={register("stream", { required: true })}
                kind="text"
              />
              <Input
                title="Product"
                id="title"
                type="text"
                placeholder="Product title"
                register={register("product", { required: true })}
                kind="text"
              />
            </div>
            <div>
              <Input
                id="price"
                title="Price"
                type="text"
                placeholder="0.00"
                kind="price"
                register={register("price", {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>
          <div className="mt-2">
            <Textarea
              id="description"
              title="Description"
              label
              register={register("description")}
            />
          </div>
          <SubmitBtn title="Upload product" position={"mt-2"} />
        </div>
      </form>
    </Layout>
  );
};

export default Create;
