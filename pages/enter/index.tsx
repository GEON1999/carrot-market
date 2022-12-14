import { useEffect, useState } from "react";
import Input from "@components/input";
import Layout from "@components/layout";
import SubmitBtn from "@components/submitBtn";
import { cls } from "@libs/client/utils";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";
import emailjs from "@emailjs/browser";

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
        "service_i1nswgp",
        "template_6zriuy5",
        templateParams,
        "j2jfTWumVG_TEDCNH"
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

  return (
    <Layout hasTabBar title="?????????">
      <div className="px-4 md:max-w-lg md:mx-auto">
        <h3 className="text-center mt-12 font-bold text-2xl">????????????</h3>
        <div>
          {data?.ok ? (
            <>
              <form
                className="mt-4 mb-2"
                onSubmit={tokenHandleSubmit(onTokenValid)}
              >
                <Input
                  phone={false}
                  title={"?????? ??????"}
                  id={"token"}
                  type={"password"}
                  placeholder={""}
                  register={tokenRegister("token", { required: true })}
                  kind="text"
                />
                <span className="text-xs text-orange-400">
                  ?????? ????????? ??????????????? 10??? ?????????.
                </span>
                <SubmitBtn
                  title={tokenLoading ? "??????" : "??????"}
                  position={"mt-4"}
                />
              </form>
            </>
          ) : (
            <>
              <div className="felx flex-col">
                <h5 className="text-center mt-10 text-sm text-gray-500">
                  ????????? ??????
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
                    ?????????
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
                    ?????????
                  </button>
                </div>
              </div>
              <form className="mt-4 mb-2" onSubmit={handleSubmit(onVaild)}>
                <Input
                  kind={method === "email" ? "text" : "phone"}
                  title={method === "email" ? "?????????" : "?????????"}
                  id={method}
                  type={method === "email" ? "email" : "number"}
                  placeholder={
                    method === "email"
                      ? "?????????"
                      : "????????? ???????????? ?????? ????????????."
                  }
                  register={register(method, { required: true })}
                />
                <span className="text-xs text-orange-400 mt-1">
                  ?????? ???????????? ??????????????? ??????????????????.
                </span>
                <SubmitBtn
                  title={
                    method === "email"
                      ? loading
                        ? "??????...."
                        : "?????????"
                      : "???????????? ?????? ????????? ????????????."
                  }
                  mine={method === "email" ? false : true}
                  position={"mt-4"}
                />
              </form>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
