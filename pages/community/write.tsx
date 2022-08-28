import type { NextPage } from "next";
import Layout from "@components/layout";
import SubmitBtn from "@components/submitBtn";
import Textarea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Post } from "@prisma/client";

interface WriteForm {
  question?: string;
}

interface WriteResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const { register, handleSubmit } = useForm<WriteForm>();
  const [post, { data, loading }] = useMutation<WriteResponse>(`/api/post`);
  const router = useRouter();
  const onValid = (data: WriteForm) => {
    if (loading) return;
    post(data);
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
          placeholder="Ask a question!"
        />
        <SubmitBtn title={loading ? "loading" : "Submit"} mt="3" />
      </form>
    </Layout>
  );
};

export default Write;
