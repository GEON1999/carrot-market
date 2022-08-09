import type { NextPage } from "next";
import Layout from "../../components/layout";

const CommunityPostDetail: NextPage = () => {
  return (
    <Layout canGoBack hasTabBar>
      <div className="px-4 py-2">
        <span className="bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full text-sm">
          동네질문
        </span>
        <div className="flex mt-3 mb-2">
          <div className="rounded-full bg-gray-300 p-6 mr-3" />
          <div>
            <p className="font-semibold">Steve Jebs</p>
            <p className="text-sm text-gray-500">View profile &rarr;</p>
          </div>
        </div>
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
          <div className="flex items-start mb-4">
            <div className="rounded-full bg-gray-300 p-5 mr-3" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Steve Jebs</span>
              <span className="text-xs text-gray-500 mb-2">2시간 전</span>
              <p>The best mandu restaurant is the one next to my house.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <textarea
            rows={4}
            placeholder="Answer this question!"
            className="rounded-md border-2 shadow-sm border-gray-300 hover:border-orange-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          />
          <button className="mt-4 bg-orange-500 rounded-md w-full py-2 px-3 text-white shadow-sm hover:bg-orange-600 focus:ring-orange-500 outline-none">
            Reply
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
