import type { NextPage } from "next";

const Upload: NextPage = () => {
  return (
    <div className="px-4 py-12">
      <div className="flex justify-center px-10 py-16 border-gray-400 border-2 border-dashed rounded-sm text-gray-400 hover:border-orange-400 mb-5 hover:text-orange-500">
        <div className="p-4 border-dashed border-gray-500 ">
          <label>
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input className="hidden" type="file" />
          </label>
        </div>
      </div>
      <div>
        <label className="mb-1 text-gray-500">Price</label>
        <div className="relative flex items-center">
          <div className="absolute  left-1">
            <span className=" text-gray-500 text-sm">$</span>
          </div>
          <input
            type="text"
            placeholder="0.00"
            className="px-4 border-2 border-gray-300 rounded-md appearance-none w-full focus:ring-2 hover:border-orange-400 hover:border-2 focus:ring-orange-400  focus:outline-none focus:rounded-sm"
          />
          <div className="absolute right-2 ">
            <span className="text-gray-500">USD</span>
          </div>
        </div>
      </div>
      <div>
        <label className="text-gray-500">Description</label>
        <div className="mt-2">
          <textarea
            rows={4}
            className="w-full rounded-md border-2 border-gray-300 hover:border-2 hover:border-orange-500 focus:outline-none  focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>
      <button className="mt-3 w-full bg-orange-500 rounded-md py-1.5 text-white hover:bg-orange-600">
        Upload product
      </button>
    </div>
  );
};

export default Upload;
