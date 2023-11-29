import { useUser } from "@/context/userStore";
import { User } from "@/types";
import axios from "axios";
import { getCookie } from "cookies-next";
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

  console.log(user)

  return (
    <div className="flex items-center justify-center w-full">
      <h1 className="text-3xl">This is authorized content</h1>
    </div>
  );
};

Home.getInitialProps = async (ctx: NextPageContext) => {
  const { req, res } = ctx;
  const id = getCookie("id", { req, res });

  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/find`,
    {
      id,
    }
  );

  if (data.user) {
    return {
      session: data.user,
    };
  } else {
    return {
      session: null,
    };
  }
};

export default Home;
