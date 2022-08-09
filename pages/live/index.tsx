import type { NextPage } from "next";

const Live: NextPage = () => {
  return (
    <div className=" px-4 py-12 space-y-9 divide-y-2">
      {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
        <div key={i} className="space-y-2 pt-7">
          <div className="w-full aspect-video bg-gray-400 shadow-sm rounded-2xl" />
          <div className="space-y-3 ml-2">
            <h3 className="font-bold first:text-xl text-gray-700">
              Come to check this!!
            </h3>
            <div className="flex  items-center space-x-3">
              <div className="rounded-full bg-gray-300 p-6" />
              <div>
                <p className="font-semibold text-gray-700">Steve Jebs</p>
                <p className="text-sm text-gray-500">
                  This is what you are looking for
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Live;
