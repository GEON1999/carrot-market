import type { NextPage } from "next";

const Write: NextPage = () => {
  return (
    <form className="px-4 py-10">
      <textarea
        className="w-full rounded-md border-2 shadow-sm border-gray-300 hover:border-orange-500 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
        //className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500 "
        rows={4}
        placeholder="Ask a question!"
      />
      <button className="mt-4 bg-orange-500 rounded-md w-full py-2 px-3 text-white shadow-sm hover:bg-orange-600 focus:ring-orange-500 outline-none">
        Submit
      </button>
    </form>
  );
};

export default Write;
