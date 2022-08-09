import type { NextPage } from "next";
import Layout from "../../components/layout";
import SubmitBtn from "../../components/submitBtn";

const Create: NextPage = () => {
  return (
    <Layout canGoBack hasTabBar>
      <div className="px-4 py-2">
        <div className="space-y-3">
          <div>
            <label htmlFor="title" className="text-sm text-gray-500">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Product title"
              className="border-2 border-gray-300 rounded-md appearance-none w-full hover:border-orange-500 hover:border-2 focus:border-orange-500 focus:ring-orange-500  focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="price" className="text-sm text-gray-500">
              Price
            </label>
            <div className="relative flex items-center">
              <div className="absolute  left-2 pointer-events-none">
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

export default Create;
