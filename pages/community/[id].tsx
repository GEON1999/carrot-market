import type { NextPage } from "next";
import Layout from "@components/layout";
import ProfileInfo from "@components/profile";
import SubmitBtn from "@components/submitBtn";
import Textarea from "@components/textarea";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Comment, Post, User } from "@prisma/client";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/utils";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface CommentForm {
  comment?: string;
}

interface LeaveCommentMutation {
  ok: boolean;
  comment: string;
}

interface CommentWithUser extends Comment {
  user: User;
}

interface PostWithInfo extends Post {
  user: User;
  _count: {
    interest: number;
    comments: number;
  };
  comments: CommentWithUser[];
}

interface PostFormResponse {
  ok: boolean;
  post: PostWithInfo;
  isInterested: boolean;
}

const CommunityPostDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { register, handleSubmit, reset } = useForm<CommentForm>();
  const { data, mutate } = useSWR<PostFormResponse>(
    id ? `/api/post/${id}` : null
  );
  const [toggleInterested] = useMutation(`/api/post/${id}/interest`);
  const [leaveComment, { data: commentData, loading: commentLoading }] =
    useMutation<LeaveCommentMutation>(`/api/post/${id}/comment`);
  const onClick = () => {
    if (!data) return;
    mutate(
      {
        ...data,
        isInterested: !data.isInterested,
        post: {
          ...data.post,
          _count: {
            ...data.post._count,
            interest: data.isInterested
              ? data.post._count.interest - 1
              : data.post._count.interest + 1,
          },
        },
      },
      false
    );
    toggleInterested({});
  };
  const onValid = (vaildForm: CommentForm) => {
    if (commentLoading) return;
    leaveComment(vaildForm);
  };
  useEffect(() => {
    if (commentData && commentData.ok) {
      reset();
      mutate();
    }
  }, [commentData, reset, mutate]);
  return (
    <Layout canGoBack hasTabBar>
      <div className="px-4 py-2">
        <span className="bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full text-sm">
          동네질문
        </span>
        <ProfileInfo
          big
          position={"py-3"}
          name={data?.post.user.name}
          subtitle="View profile"
        />
        <div className="border-t border-b-[2px] py-3 space-y-8">
          <div>
            <span className="text-orange-500 font-bold">Q. </span>
            {data?.post.question}
          </div>
          <div className="flex space-x-3 text-sm text-gray-700 border-t pt-2">
            <button onClick={onClick}>
              <span
                className={cls(
                  "flex items-center space-x-1",
                  data?.isInterested ? "text-orange-500" : ""
                )}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>궁금해요 {data?.post._count.interest}</span>
              </span>
            </button>
            <span className="flex items-center space-x-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>답변 {data?.post._count.comments}</span>
            </span>
          </div>
        </div>
        <div className="mt-5">
          {data?.post.comments.map((comment: any) => (
            <div
              key={comment.id}
              className="flex flex-col items-start justify-center"
            >
              <ProfileInfo
                mb="4"
                name={comment.user.name}
                subtitle={comment.createdAt}
                big={false}
              />
              <p className="text-gray-700 text-center -mt-3 ml-11 mb-8">
                {comment.comment}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          <form onSubmit={handleSubmit(onValid)}>
            <Textarea
              placeholder="Answer this question!"
              register={register("comment", { required: true })}
            />
            <SubmitBtn
              title={commentLoading ? "Loading...." : "Reply"}
              mt="4"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
