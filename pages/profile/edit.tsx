import type { NextPage } from "next";
import Input from "@components/input";
import Layout from "@components/layout";
import SubmitBtn from "@components/submitBtn";

const EditProfile: NextPage = () => {
  return (
    <Layout canGoBack hasTabBar>
      <div className="px-4 py-2">
        <div className="flex items-center space-x-3">
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
        <div className="space-y-1 mt-5 mb-3">
          <Input
            id="email"
            title="email"
            type="emali"
            placeholder="Please enter your email"
          />
        </div>
        <div className="space-y-1 mt-5 mb-3">
          <Input phone id="phone" title="phone" />
        </div>
        <SubmitBtn mt="4" title="Edit" />
      </div>
    </Layout>
  );
};

export default EditProfile;
