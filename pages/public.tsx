import Layout from "@/components/App/Layout";
import { Journal, Post } from "@prisma/client";
import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Posts from "@/components/Post/Layout";
import { useUser } from "@/context/userStore";

interface Props {
  session: any;
}

const Public: NextPage<Props> = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [publicJournals, setPublicJournals] = useState<Journal[]>([]);
  const [journal, setJournal] = useState<Journal[]>([]);
  const { user } = useUser();

  // handle get user posts from db
  const getPublicPosts = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/post`
    );
    setPosts(data);
  };

  // control user posts query
  useEffect(() => {
    if (posts === null) {
      getPublicPosts();
    }
  }, [posts]);

  return (
    <Layout
      setPost={setPosts}
      journals={journal}
      setJournals={setJournal}
      publicJournals={publicJournals}
      setPublicJournals={setPublicJournals}
      type="private"
    >
      <Posts
        setPost={setPosts}
        journals={user ? [...journal, ...publicJournals] : [...publicJournals]}
        posts={posts}
      />
    </Layout>
  );
};

export default Public;
