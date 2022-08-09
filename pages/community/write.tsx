import type { NextPage } from "next";
import Layout from "../../components/layout";
import SubmitBtn from "../../components/submitBtn";

const Write: NextPage = () => {
  return (
    <Layout canGoBack hasTabBar>
      <form className="px-4 py-2">
        <textarea
          className="w-full rounded-md border-2 shadow-sm border-gray-300 hover:border-orange-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          //className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500 "
          rows={4}
          placeholder="Ask a question!"
        />
        <SubmitBtn title="Submit" mt="3" />
      </form>
    </Layout>
  );
};

export default Write;
