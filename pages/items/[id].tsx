import type { NextPage } from "next";
import Layout from "../../components/layout";
import ProfileInfo from "../../components/profile";
import SubmitBtn from "../../components/submitBtn";

const ItemDetail: NextPage = () => {
  return (
    <Layout canGoBack hasTabBar>
      <div className="mx-4">
        <div className="mt-4">
          <div className="h-96 bg-gray-400" />
          <ProfileInfo mt="3" big name="Steve Jebs" subtitle="View profile →" />
          <div className="mt-3 ">
            <h1 className="font-bold text-3xl ">Galaxy S50</h1>
            <p className="mt-3 mb-4 font-semibold text-2xl">$140</p>
            <p>
              My money&apos;s in that office, right? If she start giving me some
              bullshit about it ain&apos;t there, and we got to go someplace
              else and get it, I&apos;m gonna shoot you in the head then and
              there. Then I&apos;m gonna shoot that bitch in the kneecaps, find
              out where my goddamn money is. She gonna tell me too. Hey, look at
              me when I&apos;m talking to you, motherfucker. You listen: we go
              in there, and that ni**a Winston or anybody else is in there, you
              the first motherfucker to get shot. You understand?
            </p>
            <div className="mt-3 flex items-center">
              <SubmitBtn title="Talk to seller" py="3" mr="2" />
              <button className="py-3 px-3 bg-gray-200 flex justify-center items-center rounded-md text-gray-700 hover:text-red-400 hover:bg-gray-300 focus:ring-gray-400 focus:ring-2  outline-none">
                <svg
                  className="h-6 w-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="mb-3 font-bold text-xl">Similar items</h2>
          <div className="grid grid-cols-2 gap-10">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div key={i} className="flex flex-col">
                <div className="bg-gray-400 w-full aspect-square" />
                <h3 className="text-gray-700 mt-2 -mb-1">Galaxy S60</h3>
                <p className="text-gray-900 text-sm">$6</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
