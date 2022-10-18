import { useEffect, useState } from "react";
import Input from "@components/input";
import Layout from "@components/layout";
import SubmitBtn from "@components/submitBtn";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";
import { UserProfile } from "pages/profile";
import useSWR from "swr";
import Image from "next/image";

interface ProfileForm {
  avatar?: FileList;
  name?: string;
}

interface SetProfileResponse {
  ok: boolean;
  error?: string;
}

export default function EnterProfile() {
  const router = useRouter();
  const { data: userData } = useSWR<UserProfile>(`/api/users/me`);
  const [updateForm, { data, loading }] =
    useMutation<SetProfileResponse>(`/api/users/me`);
  const { register, handleSubmit, watch } = useForm<ProfileForm>();

  const onVaild = async ({ avatar, name }: ProfileForm) => {
    if (loading) return;
    if (avatar && avatar.length > 0) {
      const { uploadURL } = await (await fetch("/api/files")).json();
      const formData = new FormData();
      formData.append("file", avatar[0], userData?.profile?.id + "");
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: formData,
        })
      ).json();
      updateForm({ avatarId: id, name });
    } else {
      updateForm({ name });
    }
  };
  const avatar = watch("avatar");
  const [avatarPreview, setAvatarPreview] = useState("");
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [setAvatarPreview, avatar]);
  useEffect(() => {
    if (data?.ok) {
      router.push("/");
    }
  }, [data, router]);

  return (
    <Layout hasTabBar title="프로필">
      <div className="mx-4 md:mx-auto md:max-w-lg">
        <form onSubmit={handleSubmit(onVaild)}>
          <div className="flex justify-center mt-32 mb-6">
            {avatarPreview ? (
              <Image
                alt="profile"
                width={160}
                height={160}
                src={avatarPreview}
                className="object-cover rounded-full"
                quality={100}
              />
            ) : (
              <label className="mb-6 w-40 h-40 cursor-pointer text-gray-600 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center border-2 border-gray-300 rounded-full dark:text-gray-300">
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
                  {...register("avatar")}
                  accept="image/*"
                  className="hidden"
                  type="file"
                />
              </label>
            )}
          </div>
          <Input
            title="이름"
            kind="text"
            register={register("name", { required: true })}
            position={"mb-4"}
          />
          <SubmitBtn title={loading ? "로딩..." : "확인"} />
        </form>
        <div className="w-full flex justify-center mt-8">
          <button
            onClick={() => router.push("/")}
            className="text-gray-400 px-3 hover:text-gray-500 border-b border-gray-200 pb-1"
          >
            skip
          </button>
        </div>
      </div>
    </Layout>
  );
}
