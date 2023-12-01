import { Journal, Post, User } from "@prisma/client";
import { Menu, MenuButton } from "@szhsin/react-menu";
import React, { FC } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { IoLockOpenOutline, IoLockClosedOutline } from "react-icons/io5";
import MenuContent from "./MenuContent";

interface Props {
  posts: Post[] | null;
  journals: Journal[];
  user: User | null;
}

const Layout: FC<Props> = ({ posts, journals, user }) => {
  if (posts) {
    return (
      <div className="flex flex-col ">
        {posts.toReversed()?.map((post) => {
          // format date
          let date = new Date(post.createdAt);
          let formatedDate = date.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });
          // journal privacy
          let journalPrivacy = journals.find(
            (journal) => journal.id === post.journalId
          )?.type;
          return (
            <div
              key={post.id}
              className="flex justify-between my-5 md:w-[80%] p-2"
            >
              {/* Post content */}
              <div className="flex flex-col">
                {/* Date */}
                <p className="text-md font-light text-[#766967]">
                  {formatedDate}
                </p>
                {/* Post author and journal */}
                <p className="text-md text-[#766967] font-semibold ">
                  <span className="text-[#86B64E] hover:text-black cursor-pointer">
                    {user?.username}
                  </span>
                  {" in "}
                  <span className="text-[#E5BE76] font-semibold hover:text-black cursor-pointer">
                    {
                      journals.find((journal) => journal.id === post.journalId)
                        ?.title
                    }
                  </span>
                </p>
                {/* Post content */}
                <p>{post.content}</p>
              </div>
              {/* Post actions */}
              <div className="flex flex-row justify-between items-start">
                {/* Privacy */}
                <button className="flex items-center justify-center px-2 py-1">
                  {journalPrivacy === "private" ? (
                    post.type === "public" ? (
                      <IoLockOpenOutline size={15} />
                    ) : (
                      <IoLockClosedOutline size={15} />
                    )
                  ) : null}
                </button>
                {/* Menu */}
                <Menu
                  menuButton={
                    <MenuButton className="flex items-center justify-center px-2 py-1">
                      <CiMenuKebab size={16} className="rotate-90" />
                    </MenuButton>
                  }
                >
                  <MenuContent />
                </Menu>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <h1>No posts</h1>
    </div>
  );
};

export default Layout;
