import type { NextPage } from "next";
import Input from "../../components/input";
import Layout from "../../components/layout";
import SubmitBtn from "../../components/submitBtn";

const Create: NextPage = () => {
  return (
    <Layout canGoBack hasTabBar>
      <div className="px-4 py-2">
        <div className="space-y-3">
          <div>
            <Input
              title="Title"
              id="title"
              type="text"
              placeholder="Product title"
            />
          </div>
          <div>
            <Input
              id="price"
              title="Price"
              type="text"
              placeholder="0.00"
              position="5"
            />
            <div className="relative flex items-center -top-[21px]">
              <div className="absolute  left-2 pointer-events-none">
                <span className=" text-gray-500 text-sm">$</span>
              </div>
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
