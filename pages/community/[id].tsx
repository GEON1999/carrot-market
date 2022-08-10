import type { NextPage } from "next";
import Layout from "../../components/layout";
import ProfileInfo from "../../components/profile";
import SubmitBtn from "../../components/submitBtn";
import Textarea from "../../components/textarea";

const CommunityPostDetail: NextPage = () => {
  return (
    <Layout canGoBack hasTabBar>
      <div className="px-4 py-2">
        <span className="bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full text-sm">
          동네질문
        </span>
        <ProfileInfo big py="3" name="Steve Jobs" subtitle="View profile" />
        <div className="border-t border-b-[2px] py-3 space-y-8">
          <div>
            <span className="text-orange-500 font-bold">Q.</span> What is the
            best mandu restaurant?
          </div>
          <div className="flex space-x-3 text-sm text-gray-700 border-t pt-2">
            <span className="flex items-center space-x-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>궁금해요 1</span>
            </span>
            <span className="flex items-center space-x-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>답변 1</span>
            </span>
          </div>
        </div>
        <div className="mt-5">
          <ProfileInfo
            mb="4"
            name="Steve Jobs"
            subtitle="2시간 전"
            big={false}
          />
        </div>
        <div className="flex flex-col">
          <Textarea placeholder="Answer this question!" />
          <SubmitBtn title="Reply" mt="4" />
        </div>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
