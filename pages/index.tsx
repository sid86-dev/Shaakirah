import Layout from "@/components/App/Layout";
import Posts from "@/components/Post/Layout";
import { useUser } from "@/context/userStore";
import { User } from "@/types";
import { Journal, Post } from "@prisma/client";
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { NextPage, NextPageContext } from "next";
import React, { useEffect, useState } from "react";

type Props = {
  session: User | null;
};

const Home: NextPage<Props> = ({ session }) => {
  const { user, setUser } = useUser();
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [publicJournals, setPublicJournals] = useState<Journal[]>([]);
  const [journals, setJournals] = useState<Journal[]>([]);

  // handle get user posts from db
  const getUserPosts = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/user?authorId=${user?.id}`
    );
    setPosts(data);
  };

  // control user session
  useEffect(() => {
    if (session && user === undefined) {
      setUser(session);
    }
  }, [session, user]);

  // control user posts query
  useEffect(() => {
    if (user && posts === null) {
      getUserPosts();
    }
  }, [user, posts]);

  console.log(posts);

  return (
    <Layout
      setPost={setPosts}
      journals={journals}
      publicJournals={publicJournals}
      setJournals={setJournals}
      setPublicJournals={setPublicJournals}
      type="private"
    >
      <Posts
        setPost={setPosts}
        journals={user ? [...journals, ...publicJournals] : publicJournals}
        posts={posts}
      />
    </Layout>
  );
};

// get user session
Home.getInitialProps = async (ctx: NextPageContext) => {
  const { req, res } = ctx;
  const id = getCookie("id", { req, res });

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/find?id=${id}`
  );

  if (data && data.isloggedin === true) {
    return {
      session: data,
    };
  } else {
    // redirect to public page if user is not logged in
    deleteCookie("id", { req, res });
    if (res) {
      res.writeHead(302, { Location: "/public" });
      res.end();
    }
  }
  return {
    session: null,
  };
};

export default Home;
