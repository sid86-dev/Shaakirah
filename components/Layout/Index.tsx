import React, { FC, useEffect } from "react";
import Header from "../Header/Index";
import Note from "../Note/Index";
import { Journal } from "@prisma/client";
import axios from "axios";
import { useUser } from "@/context/userStore";

interface Props {
  children: React.ReactNode;
  type: "public" | "private";
}

const Layout: FC<Props> = ({ children, type }) => {
  const [publicJournals, setPublicJournals] = React.useState<Journal[]>([]);
  const [journals, setJournals] = React.useState<Journal[]>([]);

  const { user } = useUser();

  // handle get all journals from db
  const handlegetAllJournals = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/journal`
    );

    setPublicJournals(data);
  };

  // handle get user journals from db
  const handleUserAllJournals = async () => {
    // public journal
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/journal/user?authorId=${user?.id}`
    );

    setJournals(data);
  };

  // control user journal query
  useEffect(() => {
    if (journals.length === 0) {
      handleUserAllJournals();
    }
  }, [journals]);

  // control public journal query
  useEffect(() => {
    if (publicJournals.length === 0) {
      handlegetAllJournals();
    }
  }, [publicJournals]);

  return (
    <div className="flex flex-col w-full p-10">
      <Header />
      <Note
        type={type}
        journals={user ? [...journals, ...publicJournals] : publicJournals}
      />
      {children}
    </div>
  );
};

export default Layout;
