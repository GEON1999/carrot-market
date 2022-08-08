import type { NextPage } from "next";

const ChatDetail: NextPage = () => {
  return (
    <div className="px-4 py-12 space-y-5">
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
          <input
            type="text"
            className="border-gray-400 shadow-sm w-full border placeholder:text-gray-500 placeholder:text-sm rounded-3xl  px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-orange-500"
          />
          <div className="absolute top-0.5 right-1.5 text-orange-500 hover:text-orange-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-9 w-9"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
