import type { NextPage } from "next";
import Layout from "../../components/layout";
import ProfileInfo from "../../components/profile";

const Chats: NextPage = () => {
  return (
    <Layout title="채팅" hasTabBar>
      <div className="divide-y-[1px] py-2">
        {[1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <ProfileInfo
            py="3"
            px="4"
            key={i}
            big
            name="Steve Jobs"
            subtitle="can you discount this?"
          ></ProfileInfo>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
