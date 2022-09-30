import { useEffect, useState } from "react";
import Input from "@components/input";
import Layout from "@components/layout";
import SubmitBtn from "@components/submitBtn";
import { cls } from "@libs/client/utils";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";

interface EnterForm {
  email?: string;
  phone?: string;
}

interface TokenForm {
  token: number;
}

interface MutationResult {
  ok: boolean;
}

export default function Enter() {
  const router = useRouter();
  const [enter, { loading, data, error }] =
    useMutation<MutationResult>("/api/users/enter");
  const [tokenEnter, { loading: tokenLoading, data: tokenData }] =
    useMutation<MutationResult>("/api/users/confirm");
  const { register, handleSubmit, reset } = useForm<EnterForm>();
  const { register: tokenRegister, handleSubmit: tokenHandleSubmit } =
    useForm<TokenForm>();
  const [method, setMethod] = useState<"email" | "phone">("email");
  const onEmailClick = () => {
    reset();
    setMethod("email");
  };
  const onPhoneClick = () => {
    reset();
    setMethod("phone");
  };
  const onVaild = (validForm: EnterForm) => {
    if (loading) return;
    enter(validForm);
  };
  const onTokenValid = async (validForm: TokenForm) => {
    if (tokenLoading) return;
    await tokenEnter(validForm);
  };

  useEffect(() => {
    if (tokenData && tokenData.ok) {
      setTimeout(() => {
        router.push("/enter/profile");
      }, 1000);
    }
  }, [tokenData, router]);

  return (
    <Layout hasTabBar title="로그인">
      <div className="mx-4">
        <h3 className="text-center mt-12 font-bold text-2xl">회원가입</h3>
        <div>
          {data?.ok ? (
            <>
              <form
                className="mt-4 mb-2"
                onSubmit={tokenHandleSubmit(onTokenValid)}
              >
                <Input
                  phone={false}
                  title={"코드 인증"}
                  id={"token"}
                  type={"password"}
                  placeholder={""}
                  register={tokenRegister("token", { required: true })}
                  kind="text"
                />
                <SubmitBtn
                  title={tokenLoading ? "로딩" : "인증"}
                  position={"mt-4"}
                />
              </form>
            </>
          ) : (
            <>
              <div className="felx flex-col">
                <h5 className="text-center mt-10 text-sm text-gray-500">
                  로그인 방식
                </h5>
                <div className="grid grid-cols-2 mt-3  border-b">
                  <button
                    onClick={onEmailClick}
                    className={cls(
                      "pb-4 border-b-2",
                      method === "email"
                        ? " border-orange-400 text-orange-400"
                        : "border-transparent"
                    )}
                  >
                    이메일
                  </button>
                  <button
                    onClick={onPhoneClick}
                    className={cls(
                      "pb-4 border-b-2",
                      method === "phone"
                        ? " border-orange-400 text-orange-400"
                        : "border-transparent"
                    )}
                  >
                    휴대폰
                  </button>
                </div>
              </div>
              <form className="mt-4 mb-2" onSubmit={handleSubmit(onVaild)}>
                <Input
                  kind={method === "email" ? "text" : "phone"}
                  title={method === "email" ? "이메일" : "휴대폰"}
                  id={method}
                  type={method === "email" ? "email" : "number"}
                  placeholder={method === "email" ? "이메일" : "휴대폰 번호"}
                  register={register(method, { required: true })}
                />
                <SubmitBtn
                  title={
                    method === "email"
                      ? loading
                        ? "로딩...."
                        : "로그인"
                      : loading
                      ? "로딩...."
                      : "로그인"
                  }
                  position={"mt-4"}
                />
              </form>
            </>
          )}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute border-b border-gray-300 w-full" />
              <div className="relative -top-3 text-center ">
                <span className=" text-gray-400 bg-white px-3">
                  소셜 로그인
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <button className="bg-gray-50 flex items-center justify-center border border-gray-200 py-3 rounded-md hover:bg-gray-100 shadow-sm text-gray-500 hover:text-gray-700">
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </button>
              <button className="bg-gray-50 flex items-center justify-center border border-gray-200 py-3 rounded-md hover:bg-gray-100 shadow-sm text-gray-500 hover:text-gray-700">
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
