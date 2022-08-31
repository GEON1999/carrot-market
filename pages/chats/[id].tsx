import type { NextPage } from "next";
import Layout from "@components/layout";
import Message from "@components/message";
import Input from "@components/input";

const ChatDetail: NextPage = () => {
  return (
    <Layout canGoBack hasTabBar>
      <div className="px-4 py-2 space-y-5">
        <Message text="Hi, i wanna buy that iphone" />
        <Message text="Hi, I am free tommrow night" mine />
        <Message text="Ok, can you come to my place?" />
        <div className="mt-6-5">
          <div className="relative top-4">
            <Input kind="chat" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatDetail;
