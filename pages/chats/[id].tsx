import type { NextPage } from "next";
import ChatInput from "../../components/chatInput";
import Layout from "../../components/layout";

const ChatDetail: NextPage = () => {
  return (
    <Layout canGoBack hasTabBar>
      <div className="px-4 py-2 space-y-5">
        <div className="flex items-start justify-start space-x-3">
          <div className="rounded-full bg-gray-300 p-5" />
          <div className="border p-2 w-1/2 shadow-sm rounded-md">
            <p>Hi, i wanna buy that iphone</p>
          </div>
        </div>
        <div className="flex flex-row-reverse items-start justify-start space-x-3 space-x-reverse">
          <div className="rounded-full bg-gray-300 p-5" />
          <div className="border p-2 w-1/2 shadow-sm rounded-md">
            <p>Hi, I am free tommrow night</p>
          </div>
        </div>
        <div className="flex items-start justify-start space-x-3">
          <div className="rounded-full bg-gray-300 p-5" />
          <div className="border p-2 w-1/2 shadow-sm rounded-md">
            <p>Ok, can you come to my place?</p>
          </div>
        </div>
        <div className="mt-6-5">
          <div className="relative top-4">
            <ChatInput />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatDetail;
