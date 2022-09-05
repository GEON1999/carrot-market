import { useEffect, useState } from "react";
import Input from "@components/input";
import Layout from "@components/layout";
import SubmitBtn from "@components/submitBtn";
import { cls } from "@libs/client/utils";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";

export default function Enter() {
  return (
    <Layout hasTabBar title="프로필">
      <div className="mx-4">
        <form>
          <div className="flex justify-center mt-32 mb-6">
            <label className="mb-6 w-40 h-40 cursor-pointer text-gray-600 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center border-2 border-gray-300 rounded-full">
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
              <input accept="image/*" className="hidden" type="file" />
            </label>
          </div>
          <Input title="Name" kind="text" position={"mb-4"} />
          <SubmitBtn title="Enter" />
          <div className="w-full flex justify-center mt-8">
            <button className="text-gray-400 px-3 hover:text-gray-500 border-b border-gray-200 pb-1">
              skip
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
