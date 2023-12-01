import React, { FC } from "react";
import Header from "../Header/Layout";
import Note from "../Note/Layout";
import { Journal, Post } from "@prisma/client";

interface Props {
  children: React.ReactNode;
  type: "public" | "private";
  journals: Journal[];
  setPost: React.Dispatch<React.SetStateAction<Post[] | null>>;
}

const Layout: FC<Props> = ({ children, type, journals, setPost }) => {
  return (
    <div className="flex flex-col w-full p-10 h-screen overflow-y-auto">
      <Header />
      <Note type={type} setPost={setPost} journals={journals} />
      {children}
    </div>
  );
};

export default Layout;
