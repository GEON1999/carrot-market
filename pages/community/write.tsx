import type { NextPage } from "next";
import Layout from "../../components/layout";
import SubmitBtn from "../../components/submitBtn";
import Textarea from "../../components/textarea";

const Write: NextPage = () => {
  return (
    <Layout canGoBack hasTabBar>
      <form className="px-4 py-2">
        <Textarea placeholder="Ask a question!" />
        <SubmitBtn title="Submit" mt="3" />
      </form>
    </Layout>
  );
};

export default Write;
