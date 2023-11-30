import Layout from "@/components/Layout/Index";
import { useUser } from "@/context/userStore";
import { User } from "@/types";
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { NextPage, NextPageContext } from "next";
import React, { useEffect } from "react";

type Props = {
  session: User | null;
};

const Home: NextPage<Props> = ({ session }) => {
  const { user, setUser } = useUser();

  useEffect(() => {
    if (session && user === undefined) {
      setUser(session);
    }
  }, [session, user]);

  return (
    <Layout type="private">
      <div className="flex w-full">
        <h1>Public Page</h1>
      </div>
    </Layout>
  );
};

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
    // redirect to public page
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
