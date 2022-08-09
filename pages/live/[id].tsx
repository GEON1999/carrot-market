import type { NextPage } from "next";
import ChatInput from "../../components/chatInput";
import Layout from "../../components/layout";
import ProfileInfo from "../../components/profile";

const Stream: NextPage = () => {
  return (
    <Layout canGoBack hasTabBar>
      <div className=" px-4 py-2 space-y-7">
        <div className="space-y-2 pt-7">
          <div className="w-full aspect-video bg-gray-400 shadow-sm rounded-2xl" />
          <div className="space-y-3 ml-2">
            <h3 className="font-bold first:text-2xl text-gray-700">
              Come to check this!!
            </h3>
            <ProfileInfo big name="Geon" subtitle="I got eveything you want" />
            <div className="space-y-1">
              <h1 className="font-bold text-xl ">Galaxy S50</h1>
              <p className="font-semibold text-lg">$140</p>
              <p>
                My money&apos;s in that office, right? If she start giving me
                some bullshit about it ain&apos;t there, and we got to go
                someplace else and get it, I&apos;m gonna shoot you in the head
                then and there. Then I&apos;m gonna shoot that bitch in the
                kneecaps, find out where my goddamn money is. She gonna tell me
                too. Hey, look at me when I&apos;m talking to you, motherfucker.
                You listen: we go in there, and that ni**a Winston or anybody
                else is in there, you the first motherfucker to get shot. You
                understand?
              </p>
            </div>
          </div>
        </div>
        <div className="px-4 space-y-7 h-[40vh] overflow-scroll">
          <div className="flex items-start justify-start space-x-3">
            <div className="rounded-full bg-gray-300 p-5" />
            <div className="border p-2 w-1/2 shadow-sm rounded-md">
              <p>Hi~~</p>
            </div>
          </div>
          <div className="flex flex-row-reverse items-start justify-start space-x-3 space-x-reverse">
            <div className="rounded-full bg-gray-300 p-5" />
            <div className="border p-2 w-1/2 shadow-sm rounded-md">
              <p>Hi! i want to buy them all!!!</p>
            </div>
          </div>
          <div className="flex items-start justify-start space-x-3">
            <div className="rounded-full bg-gray-300 p-5" />
            <div className="border p-2 w-1/2 shadow-sm rounded-md">
              <p>omg!</p>
            </div>
          </div>
          <div className="flex items-start justify-start space-x-3">
            <div className="rounded-full bg-gray-300 p-5" />
            <div className="border p-2 w-1/2 shadow-sm rounded-md">
              <p>i wanna buy that iphone. plz give me that right now</p>
            </div>
          </div>
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
              <p>i wanna buy that iphone. plz give me that right now</p>
            </div>
          </div>
          <div className="flex items-start justify-start space-x-3">
            <div className="rounded-full bg-gray-300 p-5" />
            <div className="border p-2 w-1/2 shadow-sm rounded-md">
              <p>i wanna buy that iphone. plz give me that right now</p>
            </div>
          </div>
          <div className="flex items-start justify-start space-x-3">
            <div className="rounded-full bg-gray-300 p-5" />
            <div className="border p-2 w-1/2 shadow-sm rounded-md">
              <p>i wanna buy that iphone. plz give me that right now</p>
            </div>
          </div>
          <div className="flex items-start justify-start space-x-3">
            <div className="rounded-full bg-gray-300 p-5" />
            <div className="border p-2 w-1/2 shadow-sm rounded-md">
              <p>i wanna buy that iphone. plz give me that right now</p>
            </div>
          </div>
        </div>
        <div className="relative -top-2">
          <ChatInput />
        </div>
      </div>
    </Layout>
  );
};

export default Stream;
