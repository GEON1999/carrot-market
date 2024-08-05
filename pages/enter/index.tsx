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
  const [enter, { loading, data, error, isSuccess }] =
    useMutation<MutationResult>("/api/users/enter");
  const [tokenEnter, { loading: tokenLoading, data: tokenData, isSuccess:tokenSuccess}] =
    useMutation<MutationResult>("/api/users/confirm");
  const [isKakaoOk, setIsKakaoOk] = useState(false);
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
          alert("이메일 전송에 실패했습니다.");
          console.log("FAILED...", error);
        }
      );
  };
  const onTokenValid = async (validForm: TokenForm) => {
    if (tokenLoading) return;
    await tokenEnter(validForm);
  };

  useEffect(() => {
    if(isKakaoOk){
        setTimeout(() => {
            router.push("/enter/profile");
        }, 1000);
    }
    if (tokenData && tokenData.ok) {
      setTimeout(() => {
        router.push("/enter/profile");
      }, 1000);
    }
  }, [tokenData, router,isKakaoOk]);

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
           setIsKakaoOk(true);
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
              <button onClick={kakaoLogin}
                      className="space-x-3 text-sm text-gray-500 bg-[#FEE500] flex items-center justify-center border border-[#FEE500] py-3 rounded-md hover:bg-[#f5de02] shadow-sm  hover:text-gray-700">
                <svg viewBox="0 0 21 20" width="21" height="20" fill="none" >
                  <path d="M10.5 2.62891C6.16282 2.62891 2.64282 5.36319 2.64282 8.72605C2.64282 10.8239 4.00211 12.6546 6.07639 13.7703L5.20425 16.9682C5.1878 17.0318 5.19118 17.0989 5.21396 17.1605C5.23673 17.2222 5.27781 17.2754 5.33167 17.313C5.38554 17.3506 5.44962 17.3709 5.51532 17.371C5.58102 17.3712 5.6452 17.3513 5.69925 17.3139L9.51782 14.776C9.83997 14.776 10.17 14.8311 10.5 14.8311C14.8371 14.8311 18.3571 12.0968 18.3571 8.72605C18.3571 5.35534 14.8371 2.62891 10.5 2.62891Z"
                        fill="#181600"></path>
                </svg>
                <p>카카오 로그인</p>
              </button>
              <button
                  className="text-sm text-gray-500 bg-gray-50 flex items-center justify-center border border-gray-200 py-3 rounded-md hover:bg-gray-100 shadow-sm  hover:text-gray-700">
                <p>추가 예정</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
