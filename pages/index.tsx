import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import React from "react";

type session = {
  email: string;
  username: string;
};

type Props = {
  session: session | null;
};

const Home: NextPage<Props> = ({ session }) => {
  const router = useRouter();

  // handle logout
  const logout = async () => {
    const id = getCookie("id");
    await axios.post("/api/user/auth", {
      id,
      auth: false,
    });
    deleteCookie("id");
    router.push("/");
  };

  console.log(session);
  return <div>{<button onClick={() => logout()}>Logout</button>}</div>;
};

Home.getInitialProps = async (ctx: NextPageContext) => {
  const { req, res } = ctx;
  const id = getCookie("id", { req, res });

  const { data } = await axios.post(`http://localhost:3000/api/user/find`, {
    id,
  });

  const { email, username } = data.user;

  if (email && username) {
    return {
      session: {
        email,
        username,
      },
    };
  } else {
    return {
      session: null,
    };
  }
};

export default Home;
