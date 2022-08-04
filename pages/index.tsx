import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="bg-slate-500 py-28 px-10 grid gap-10">
      <div className="bg-white p-6 rounded-3xl shadow-2xl">
        <div>
          <span className="font-semibold text-lg">Select item</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-gray-400">Grey Chair</span>
          <span>$10</span>
        </div>
        <div className="flex justify-between my-1">
          <span className="text-gray-400">Tooly Table</span>
          <span>$80</span>
        </div>
        <div className="flex justify-between border-t-2 border-dashed mt-2 pt-2">
          <span className="font-semibold ">Total</span>
          <span>$90</span>
        </div>
        <div className="bg-blue-400 rounded-3xl text-center p-2 w-40 m-auto text-white">
          Checkout
        </div>
      </div>
      <div className="bg-blue-500 overflow-hidden rounded-3xl shadow-xl">
        <div className=" p-6 ">
          <span className="text-white text-lg font-semibold">Profile</span>
        </div>
        <div className="bg-white rounded-t-3xl p-6 ">
          <div className="flex justify-between items-end relative -top-16">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-400 mb-1">Orders</span>
              <span className="font-semibold">340</span>
            </div>
            <div className="w-24 h-24 bg-slate-400 rounded-full" />
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-400 mb-1">Spent</span>
              <span className="font-semibold">$2,310</span>
            </div>
          </div>
          <div className="text-center flex flex-col">
            <span className="font-semibold text-2xl">Geon</span>
            <span className="text-sm text-gray-400">Deagu, Korea</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-3xl shadow-2xl">
        <div className="flex justify-between mb-3">
          <div>⬅</div>
          <div className="space-x-3">
            <span>⭐ 4.9</span>
            <span>❤</span>
          </div>
        </div>
        <div className=" h-72 bg-stone-600 m-auto mb-3" />
        <div className="flex flex-col">
          <span className="font-semibold text-lg">Grey Chair</span>
          <span className="text-sm text-gray-400">Chair</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <input type="radio" />
            <input type="radio" />
            <input type="radio" />
          </div>
          <div className="items-center flex space-x-3 mb-7">
            <button className="bg-blue-200 w-8  rounded-xl text-3xl items-center aspect-square flex justify-center">
              -
            </button>
            <span className="font-bold text-2xl">1</span>
            <button className="bg-blue-200 w-8  rounded-xl text-3xl items-center aspect-square flex justify-center">
              +
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-3xl">$10</span>
          <div className="bg-blue-500 py-3 px-8 text-white rounded-xl">
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
