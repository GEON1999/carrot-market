import { useEffect, useState } from "react";
import Input from "@components/input";
import Layout from "@components/layout";
import SubmitBtn from "@components/submitBtn";
import { cls } from "@libs/client/utils";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";
import emailjs from "@emailjs/browser";
import { kakaoInit } from "@libs/utils";
import Image from "next/image";

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
  const payload = Math.floor(100000 + Math.random() * 9000000) + "";
  const onVaild = async ({ email, phone }: EnterForm) => {
    if (loading) return;
    await enter({ email, phone, payload });
    const templateParams = {
      token: payload,
      email,
    };
    await emailjs
      .send(
        String(process.env.NEXT_PUBLIC_EMAILJS_SID),
        String(process.env.NEXT_PUBLIC_EMAILJS_TEMPID),
        templateParams,
        String(process.env.NEXT_PUBLIC_EMAILJS_KEY)
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
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

  const kakaoLogin = async () => {
    // 카카오 초기화
    const kakao = kakaoInit();
    // 카카오 로그인 구현
    kakao.Auth.login({
      success: () => {
        kakao.API.request({
          url: "/v2/user/me",
          success: async (res: any) => {
            await enter({
              kakaoName: res.properties.nickname,
              kakaoId: String(res.id),
            });
            await tokenEnter({
              kakaoName: res.properties.nickname,
              kakaoId: String(res.id),
            });
          },
          fail: (error: any) => {
            console.log(error);
          },
        });
      },
      fail: (error: any) => {
        console.log(error);
      },
    });
  };

  return (
    <Layout hasTabBar title="로그인">
      <div className="px-4 md:max-w-lg md:mx-auto">
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
                <span className="text-xs text-orange-400">
                  인증 코드의 유효시간은 10분 입니다.
                </span>
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
                  placeholder={
                    method === "email"
                      ? "이메일"
                      : "이메일 로그인을 이용 해주세요."
                  }
                  register={register(method, { required: true })}
                />
                <span className="text-xs text-orange-400 mt-1">
                  최초 로그인시 회원가입이 이루어집니다.
                </span>
                <SubmitBtn
                  title={
                    method === "email"
                      ? loading
                        ? "로딩...."
                        : "로그인"
                      : "이메일을 통해 로그인 해주세요."
                  }
                  mine={method === "email" ? false : true}
                  position={"mt-4"}
                />
              </form>
            </>
          )}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute border-b border-gray-300 w-full" />
              <div className="relative -top-3 text-center ">
                <span className=" text-sm text-gray-500 bg-white px-3">
                  소셜 로그인
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <button onClick={kakaoLogin}>
                <img
                  alt="Kakao"
                  src="https://imagedelivery.net/xE6X7mlbIExkQau-XHoj-A/785cd3e0-32c0-444a-9b37-2e0c15533700/profile"
                />
              </button>
              <button className="text-sm text-gray-500 bg-gray-50 flex items-center justify-center border border-gray-200 py-3 rounded-md hover:bg-gray-100 shadow-sm  hover:text-gray-700">
                <p>추가 예정</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
