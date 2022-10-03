import type { NextPage } from "next";
import Layout from "@components/layout";
import SubmitBtn from "@components/submitBtn";
import Textarea from "@components/textarea";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import useSWR from "swr";
import useMutation from "@libs/client/useMutation";

const Review: NextPage = () => {
  const router = useRouter();
  const productId = router.query.id;
  const { data } = useSWR(`/api/products/${productId}`);
  const { data: userData } = useSWR(`/api/users/me`);
  useEffect(() => {
    if (data?.product?.userId !== userData?.profile?.id) {
      router.replace(`/products/${productId}`);
    }
  }, [router, data, userData, productId]);
  const { register, handleSubmit } = useForm();
  const [writeRivew, { data: reviewData }] = useMutation(
    `/api/products/${productId}/${router.query.userId}/review`
  );
  const onValid = (validForm: any) => {
    writeRivew(validForm);
  };
  useEffect(() => {
    if (reviewData && reviewData?.ok) {
      router.push("/");
    }
  }, [reviewData, router]);
  return (
    <Layout title="리뷰 작성" hasTabBar>
      <div className="mx-4 flex flex-col">
        <h1 className="text-center mt-[10vh] mb-8">
          구매자에 대한 리뷰를 작성해주세요.
        </h1>
        <form onSubmit={handleSubmit(onValid)}>
          <Textarea register={register("review", { required: true })} />
          <SubmitBtn title="작성 완료" position={"mt-2"} />
        </form>
      </div>
    </Layout>
  );
};

export default Review;
