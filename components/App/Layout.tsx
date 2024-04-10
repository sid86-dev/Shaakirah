import React, { FC, useEffect } from "react";
import Header from "../Header/Layout";
import Note from "../Note/Layout";
import { Journal, Post } from "@prisma/client";
import { useUser } from "@/context/userStore";
import axios from "axios";

interface Props {
  children: React.ReactNode;
  type: "public" | "private";
  setPost: React.Dispatch<React.SetStateAction<Post[] | null>>;
  journals: Journal[];
  publicJournals: Journal[];
  setJournals: React.Dispatch<React.SetStateAction<Journal[]>>;
  setPublicJournals: React.Dispatch<React.SetStateAction<Journal[]>>;
}

const Layout: FC<Props> = ({
  children,
  type,
  journals,
  publicJournals,
  setPost,
  setJournals,
  setPublicJournals,
}) => {
  const { user } = useUser();

  // handle get all journals from db
  const handleGetAllJournals = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/journal`
    );

    setPublicJournals(data);
  };

  // handle get user journals from db
  const handleUserAllJournals = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/journal/user?authorId=${user?.id}`
    );

    setJournals(data);
  };

  // control user journal query
  useEffect(() => {
    if (journals.length === 0 && user) {
      handleUserAllJournals();
    }
  }, [journals, user]);

  // control public journal query
  useEffect(() => {
    if (publicJournals.length === 0) {
      handleGetAllJournals();
    }
  }, [publicJournals]);

  return (
    <div className="flex flex-col w-full p-10 h-screen overflow-y-auto">
      <Header />
      <Note setPost={setPost} journals={[...journals, ...publicJournals]} />
      {children}
    </div>
  );
};

export default Layout;
