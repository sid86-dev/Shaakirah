import { useUser } from "@/context/userStore";
import { User } from "@/types";
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

type Props = {
  session: User | null;
};

const Home: NextPage<Props> = ({ session }) => {
  const router = useRouter();
  const { user, setUser } = useUser();

  useEffect(() => {
    if (session && !user) {
      setUser(session);
    }
  }, [session, user]);

  // handle logout
  const logout = async () => {
    const id = getCookie("id");
    await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/auth`, {
      id,
      auth: false,
    });
    setUser(null);
    deleteCookie("id");
    router.push("/");
  };

  console.log(session);
  return <div>{<button onClick={() => logout()}>Logout</button>}</div>;
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
