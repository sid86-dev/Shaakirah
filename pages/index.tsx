import { supabase } from "@/utils/connect";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { useUser } from "@/context/userStore";

interface Props {
  session: any;
}

const Home: NextPage<Props> = () => {
  const { user, setUser } = useUser();
  const router = useRouter();

  // get session data
  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();

    // @ts-ignore
    setUser(data.user);

    console.log(data, error);

    if (data.user === null) {
      return;
    } else {
      // check for user data in database
      const { data: userData } = await supabase
        .from("users")
        .select("*")
        .eq("email", data?.user?.email)
        .single();

      if (!userData) {
        router.push("/signup");
      } else {
        console.log(userData);
        setUser(userData);
      }
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    console.log(data, error);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    setUser(null);
    console.log(error);
  };

  return (
    <div>
      <button className="btn btn-blue" onClick={user ? signOut : signIn}>
        {user === undefined ? "..." : user === null ? "Sign In" : "Sign Out"}
      </button>
    </div>
  );
};

export default Home;
