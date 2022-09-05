import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/layout";
import ProfileInfo from "@components/profile";

const Chats: NextPage = () => {
  return (
    <Layout title="채팅" hasTabBar>
      <div className="divide-y-[1px] py-2">
        {[1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Link href="chats/id" key={i}>
            <a>
              <ProfileInfo
                position={"py-3 px-4"}
                big
                name="Steve Jobs"
                subtitle="can you discount this?"
              />
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
