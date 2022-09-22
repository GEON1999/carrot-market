import type { NextPage } from "next";
import Layout from "@components/layout";
import SubmitBtn from "@components/submitBtn";
import Textarea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Post } from "@prisma/client";
import useCoords from "@libs/client/useCoords";

interface WriteForm {
  question?: string;
}

interface WriteResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const { longitude, latitude } = useCoords();
  const { register, handleSubmit } = useForm<WriteForm>();
  const [post, { data, loading }] = useMutation<WriteResponse>(`/api/post`);
  const router = useRouter();
  const onValid = (data: WriteForm) => {
    if (loading) return;
    post({ ...data, longitude, latitude });
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data, router]);
  return (
    <Layout canGoBack hasTabBar>
      <form onSubmit={handleSubmit(onValid)} className="px-4 py-2">
        <Textarea
          register={register("question", { required: true })}
          placeholder="궁금한 것을 물어보세요!"
        />
        <SubmitBtn title={loading ? "로딩...." : "등록"} position={"mt-2"} />
      </form>
    </Layout>
  );
};

export default Write;
