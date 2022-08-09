import type { NextPage } from "next";

const Chats: NextPage = () => {
  return (
    <div className="divide-y-[1px] py-12">
      {[1, 1, 1, 1, 1, 1, 1].map((_, i) => (
        <div key={i} className="flex px-4 py-3 items-center space-x-3">
          <div className="rounded-full bg-gray-300 p-6" />
          <div>
            <p className="font-semibold">Steve Jebs</p>
            <p className="text-sm text-gray-500">can you discount this?</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
