import type { NextPage } from "next";
import Input from "@components/input";
import Layout from "@components/layout";
import SubmitBtn from "@components/submitBtn";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { User } from "@prisma/client";
import { UserProfile } from ".";
import { useEffect, useState } from "react";
import useMutation from "@libs/client/useMutation";
import Image from "next/image";

interface EditProfileForm {
  email?: string;
  phone?: string;
  name?: string;
  formErrors?: string;
  emailErrors?: string;
  avatar?: FileList;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
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
  const onVaild = async ({ email, phone, name, avatar }: EditProfileForm) => {
    if (email === `` && phone === ``) {
      return setError("formErrors", {
        message: "Email OR Phone number are required.",
      });
    }
    if (email && !email.includes("@")) {
      return setError("emailErrors", { message: "Please check if there is @" });
    }
    if (avatar && avatar.length > 0 && user) {
      const { uploadURL } = await (await fetch(`/api/files`)).json();
      const formData = new FormData();
      formData.append("file", avatar[0], user?.id + "");
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: formData,
        })
      ).json();
      updateForm({
        email,
        phone,
        name,
        avatarId: id,
      });
    } else {
      updateForm({ email, phone, name });
    }
  };
  const [avatarPreview, setAvatarPreview] = useState("");
  const avatar = watch("avatar");
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
      // 주어진 객체를 가리키는 URL을 DOMString으로 반환합니다.
    }
  }, [avatar]);
  useEffect(() => {
    if (user?.name) setValue("name", user?.name);
    if (user?.email) setValue("email", user?.email);
    if (user?.phone) setValue("phone", user?.phone);
    if (user?.avatar)
      setAvatarPreview(
        `https://imagedelivery.net/xE6X7mlbIExkQau-XHoj-A/${user?.avatar}/profile`
      );
  }, [user, setValue]);
  useEffect(() => {
    if (responseData && !responseData.ok) {
      setError("formErrors", { message: responseData.error });
    }
  }, [responseData, setError]);

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
        <div className="px-4 py-2">
          <div className="flex items-center space-x-3 mb-6">
            {avatarPreview ? (
              <Image
                alt="profile"
                width={64}
                height={64}
                src={avatarPreview}
                className="object-cover rounded-full"
                quality={100}
              />
            ) : (
              <div className="w-16 h-16 bg-slate-500 rounded-full" />
            )}
            <div className="flex flex-col">
              <label
                htmlFor="picture"
                className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 shadow-sm cursor-pointer hover:bg-gray-100"
              >
                Change
                <input
                  {...register("avatar")}
                  id="picture"
                  className="hidden"
                  type="file"
                  accept="image/*"
                ></input>
              </label>
            </div>
          </div>
          <Input
            id="name"
            title="name"
            type="text"
            placeholder="Please enter your name"
            register={register("name")}
            position={"mb-4"}
            kind="text"
          />
          <Input
            id="email"
            title="email"
            type="emali"
            placeholder="Please enter your email"
            register={register("email")}
            kind="text"
          />
          {errors ? (
            <div className="mb-4 mt-1 font-serif font-semibold mx-2">
              {errors.emailErrors?.message}
            </div>
          ) : null}
          <Input
            kind="phone"
            id="phone"
            title="phone"
            register={register("phone")}
          />

          <SubmitBtn mt="8" title={loading ? "Loading...." : "Edit"} />
          {errors ? (
            <div className="mb-4 mt-1 font-serif font-semibold mx-2">
              {errors.formErrors?.message}
            </div>
          ) : null}
        </div>
      </form>
    </Layout>
  );
};

export default EditProfile;
