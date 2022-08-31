import type { NextPage } from "next";
import Input from "@components/input";
import Layout from "@components/layout";
import SubmitBtn from "@components/submitBtn";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { User } from "@prisma/client";
import { UserProfile } from ".";
import { useEffect } from "react";
import useMutation from "@libs/client/useMutation";

interface EditProfileForm {
  email?: string;
  phone?: string;
  name?: string;
  formErrors?: string;
  emailErrors?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const { data } = useSWR<UserProfile>(`/api/users/me`);
  const [updateForm, { data: responseData, loading }] =
    useMutation<EditProfileResponse>(`/api/users/me`);

  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm<EditProfileForm>();
  useEffect(() => {
    if (data?.profile.name) setValue("name", data?.profile.name);
    if (data?.profile.email) setValue("email", data?.profile.email);
    if (data?.profile.phone) setValue("phone", data?.profile.phone);
  }, [data, setValue]);
  useEffect(() => {
    if (responseData && !responseData.ok) {
      setError("formErrors", { message: responseData.error });
    }
  }, [responseData, setError]);
  const onVaild = ({ email, phone, name }: EditProfileForm) => {
    if (email === `` && phone === ``) {
      return setError("formErrors", {
        message: "Email OR Phone number are required.",
      });
    }
    if (email && !email.includes("@")) {
      return setError("emailErrors", { message: "Please check if there is @" });
    }
    updateForm({ email, phone, name });
  };
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
            <div className="rounded-full bg-gray-300 p-7" />
            <div className="flex flex-col">
              <label
                htmlFor="picture"
                className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 shadow-sm cursor-pointer hover:bg-gray-100"
              >
                Change
                <input
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
          />
          <Input
            id="email"
            title="email"
            type="emali"
            placeholder="Please enter your email"
            register={register("email")}
          />
          {errors ? (
            <div className="mb-4 mt-1 font-serif font-semibold mx-2">
              {errors.emailErrors?.message}
            </div>
          ) : null}
          <Input phone id="phone" title="phone" register={register("phone")} />

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
