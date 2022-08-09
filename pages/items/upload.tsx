import type { NextPage } from "next";
import Layout from "../../components/layout";
import SubmitBtn from "../../components/submitBtn";

const Upload: NextPage = () => {
  return (
    <Layout canGoBack hasTabBar>
      <div className="px-4 py-2">
        <div className="flex justify-center w-full py-32 border-gray-400 border-2 border-dashed rounded-sm text-gray-400 hover:border-orange-500 mb-5 hover:text-orange-500">
          <div className="p-4 border-dashed border-gray-500 ">
            <label>
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

              <input className="hidden" type="file" />
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="price" className="text-sm text-gray-500">
            Price
          </label>
          <div className="relative flex items-center">
            <div className="absolute  left-1 pointer-events-none">
              <span className=" text-gray-500 text-sm">$</span>
            </div>
            <input
              id="price"
              type="text"
              placeholder="0.00"
              className="pl-5 border-2 border-gray-300 rounded-md appearance-none w-full hover:border-orange-500 hover:border-2 focus:border-orange-500 focus:ring-orange-500  focus:outline-none"
            />
            <div className="absolute right-2 text-sm pointer-events-none">
              <span className="text-gray-500">USD</span>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <label className="text-gray-500 text-sm" htmlFor="description">
            Description
          </label>
          <div>
            <textarea
              id="description"
              rows={4}
              className="w-full rounded-md border-2 border-gray-300 hover:border-orange-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
          </div>
        </div>
        <SubmitBtn title="Upload product" mt="4" />
      </div>
    </Layout>
  );
};

export default Upload;
