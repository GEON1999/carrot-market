import type { NextPage } from "next";
import Layout from "../../components/layout";
import ProfileInfo from "../../components/profile";

const Live: NextPage = () => {
  return (
    <Layout title="라이브" hasTabBar>
      <div className=" px-4 py-2 space-y-9 divide-y-2">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <div key={i} className="space-y-2 pt-7">
            <div className="w-full aspect-video bg-gray-400 shadow-sm rounded-2xl" />
            <div className="space-y-3 ml-2">
              <h3 className="font-bold first:text-xl text-gray-700">
                Come to check this!!
              </h3>
              <ProfileInfo
                big={false}
                name="Geon"
                subtitle="I got eveything you want"
              ></ProfileInfo>
            </div>
          </div>
        ))}
        <button className="border-none text-white fixed bottom-24 right-8 bg-orange-400 hover:bg-orange-500 p-4 rounded-full shadow-lg transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>
    </Layout>
  );
};

export default Live;
