import type { NextPage } from "next";
import Layout from "../../components/layout";

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
          <label className="text-sm text-gray-500" htmlFor="email">
            email
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="Please enter your email"
            className="border-gray-300 shadow-md w-full border placeholder:text-gray-500 placeholder:text-sm rounded-md  px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <div className="space-y-1 mt-5 mb-3">
          <label className="text-sm text-gray-500" htmlFor="phone">
            phone
          </label>
          <div className="flex rounded-sm shadow-md">
            <span className="flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none text-sm">
              +82
            </span>
            <input
              id="phone"
              type="number"
              required
              placeholder="Plese enter your number"
              className="appearance-none border-gray-300 w-full border px-3 py-2 placeholder:text-gray-500 placeholder:text-sm rounded-md rounded-l-none   focus:outline-none focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        </div>
        <button className="mt-4 bg-orange-500 rounded-md w-full py-2 px-3 text-white shadow-sm hover:bg-orange-600 focus:ring-orange-500 outline-none">
          Edit
        </button>
      </div>
    </Layout>
  );
};

export default EditProfile;
