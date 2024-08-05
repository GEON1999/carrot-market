import type { NextPage } from "next";
import Input from "@components/input";
import Layout from "@components/layout";
import SubmitBtn from "@components/submitBtn";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { UserProfile } from ".";
import { useEffect, useState } from "react";
import useMutation from "@libs/client/useMutation";
import Image from "next/image";
import { useRouter } from "next/router";

interface EditProfileForm {
  email?: string;
  phone?: string;
  name?: string;
  formErrors?: string;
  emailErrors?: string;
  avatar?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<UserProfile>(`/api/users/me`);
  const user = data?.profile;
  const [updateForm, { data: responseData, loading }] =
    useMutation<EditProfileResponse>(`/api/users/me`);
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm<EditProfileForm>();


  const [image, setImage] = useState(user?.avatar ?? "");
  console.log(image);

  const handleImage = async (e : any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    await formData.append("file", file);
    const result = await fetch(`/api/files`, {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    setImage(result.id);
  }

  const onVaild = async ({ email, phone, name, avatar }: EditProfileForm) => {
    if (email === `` && phone === ``) {
      return setError("formErrors", {
        message: "Email OR Phone number are required.",
      });
    }
    if (email && !email.includes("@")) {
      return setError("emailErrors", { message: "Please check if there is @" });
    }

      updateForm({
        email,
        phone,
        name,
        avatarId: image ?? "",
      });

  };


  useEffect(() => {
    if (responseData && !responseData.ok) {
      setError("formErrors", { message: responseData.error });
    }
  }, [responseData, setError]);
  useEffect(() => {
    if (responseData && responseData.ok) {
      router.push("/profile");
    }
  }, [responseData, router]);
  useEffect(() => {
    if (user) {
      setValue("email", user.email);
      setValue("phone", user.phone);
      setValue("name", user.name)
      setValue("avatar", user.avatar)
      setImage(user?.avatar)
    }}, [user, setValue]);


  return (
    <Layout canGoBack hasTabBar>
      <form
        onChange={() => {
          if (errors) {
            clearErrors();
          }
        }}
        onSubmit={handleSubmit(onVaild)}
      >
        {!data ? ("") :  ( <div className="px-4 py-2 md:max-w-2xl md:mx-auto">
          <div className="flex justify-center mt-4 mb-4">
            {image !== "" ? (
                <img
                    className="object-cover rounded-full w-40 h-40"
                    alt="profile"
                    src={image}
                />
            ) : (
                <label
                    className="mb-6 w-40 h-40 cursor-pointer text-gray-600 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center border-2 border-gray-300 rounded-full">
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
                      onInput={handleImage}
                      {...register("avatar")}
                      accept="image/*"
                      className="hidden"
                      type="file"
                  />
                </label>
            )}
          </div>
          <Input
              id="name"
              title="이름"
              type="text"
              placeholder="이름"
              register={register("name")}
              position={"mb-2"}
              kind="text"
          />
          <Input
              id="email"
              title="이메일"
              type="emali"
              placeholder="이메일"
              register={register("email")}
              kind="text"
          />
          {errors ? (
              <div className="mb-2 mt-1 font-serif font-semibold mx-2">
                {errors.emailErrors?.message}
              </div>
          ) : null}
          <Input
              kind="phone"
              id="phone"
              title="휴대폰"
              placeholder="휴대폰 번호"
              type="number"
              register={register("phone")}
          />

          <SubmitBtn
              position={"mt-3"}
              title={loading ? "로딩...." : "수정 완료"}
          />
          {errors ? (
              <div className="mb-4 mt-1 font-serif font-semibold mx-2">
                {errors.formErrors?.message}
              </div>
          ) : null}
        </div>)}
      </form>
    </Layout>
  );
};


export default EditProfile;
