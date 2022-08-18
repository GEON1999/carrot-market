import type { NextPage } from "next";
import ChatInput from "@components/chatInput";
import Layout from "@components/layout";
import Message from "@components/message";
import ProfileInfo from "@components/profile";

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
        <div className="px-4 space-y-7 py-4 h-[40vh] overflow-scroll">
          <Message text="I don't know what you've been told" />
          <Message text="But time is running out, no need to take it slow" />
          <Message text="I'm stepping to you toe-to-toe" mine />
          <Message text="I should be scared, honey, maybe so" />
          <Message text="But I ain't worried 'bout it right now (right now)" />
          <Message text="Keeping dreams alive, 1999, heroes" />
          <Message text="I ain't worried 'bout it right now (right now)" mine />
          <Message text="Swimmin' in the floods (hey!)" />
          <Message text="Dancing on the clouds below" />
          <Message text="I ain't worried 'bout it" />
        </div>
        <div className="relative -top-2">
          <ChatInput />
        </div>
      </div>
    </Layout>
  );
};

export default Stream;
