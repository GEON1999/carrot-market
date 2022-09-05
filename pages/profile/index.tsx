import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/layout";
import ProfileInfo from "@components/profile";
import useSWR from "swr";
import { Review, User } from "@prisma/client";
import useSWRInfinite from "swr/infinite";
import useScrollpage from "@libs/client/scrollPage";
import { useEffect } from "react";

interface ReviewWithUser extends Review {
  leavedBy: User;
}

interface ReviewsResponse {
  ok: boolean;
  reviews: ReviewWithUser[];
}

export interface UserProfile {
  ok: boolean;
  profile: User;
}
const getKey = (pageIndex: number) => {
  return `/api/reviews?page=${pageIndex + 1}`;
};

const Profile: NextPage = () => {
  const { data: userData } = useSWR<UserProfile>("/api/users/me");
  const user = userData?.profile;
  const { data, setSize } = useSWRInfinite<ReviewsResponse>(getKey, {
    initialSize: 1,
    revalidateAll: false,
  });
  const reviews = data?.map((i) => i.reviews).flat();
  const page = useScrollpage();
  useEffect(() => {
    setSize(page);
  }, [setSize, page]);
  return (
    <Layout title="나의 정보" hasTabBar>
      <div className="px-4 py-4">
        <Link href="profile/edit">
          <a>
            <ProfileInfo
              avatar={user?.avatar}
              big
              name={user?.name}
              subtitle="Edit profile →"
            />
          </a>
        </Link>
        <div className="flex justify-between px-5 my-12">
          <Link href="profile/sold">
            <a>
              <div className="text-sm">
                <div className="w-14 h-14 rounded-full bg-orange-500 flex justify-center items-center text-white mb-2 hover:bg-orange-600">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
                <span>판매내역</span>
              </div>
            </a>
          </Link>
          <Link href="profile/bought">
            <a>
              <div className="flex flex-col justify-center text-sm">
                <div className="w-14 h-14 rounded-full bg-orange-500 flex justify-center items-center text-white mb-2 hover:bg-orange-600">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    ></path>
                  </svg>
                </div>
                <span>구매내역</span>
              </div>
            </a>
          </Link>
          <Link href="profile/loved">
            <a>
              <div className="flex flex-col justify-center text-sm">
                <div className="w-14 h-14 rounded-full bg-orange-500 flex justify-center items-center text-white mb-2 hover:bg-orange-600">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                </div>
                <span>관심목록</span>
              </div>
            </a>
          </Link>
        </div>
        <>
          {reviews?.map((review) => (
            <div key={review?.id} className="space-y-6">
              <ProfileInfo
                big={false}
                name={review?.leavedBy.name}
                subtitle={String(review?.createdAt)}
                avatar={review?.leavedBy.avatar}
              />
              <div>
                <p className="text-gray-700  -mt-5 ml-12 mb-8">
                  {review?.review}
                </p>
              </div>
            </div>
          ))}
          {page >= 2 ? (
            <div className="p-10 text-center text-xl text-gray-500">
              no more content
            </div>
          ) : null}
        </>
      </div>
    </Layout>
  );
};

export default Profile;
