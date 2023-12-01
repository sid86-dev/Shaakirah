import { Journal, Post, User } from "@prisma/client";
import { Menu, MenuButton } from "@szhsin/react-menu";
import React, { FC, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { IoLockOpenOutline, IoLockClosedOutline } from "react-icons/io5";
import MenuContent from "./MenuContent";
import axios from "axios";
import { useUser } from "@/context/userStore";
import { CiGlobe } from "react-icons/ci";

interface Props {
  posts: Post[] | null;
  journals: Journal[];
  setPost: React.Dispatch<React.SetStateAction<Post[] | null>>;
}

const Layout: FC<Props> = ({ posts, journals, setPost }) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // handle update post type
  const handleUpdatePostType = async (postId: string, type: string) => {
    setIsLoading(true);

    let newType = type === "public" ? "private" : "public";

    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/user?id=${postId}`,
      { type: newType }
    );

    // update existing post
    setPost((prev) => {
      if (prev) {
        return prev.map((post) => {
          if (post.id === postId) {
            return { ...post, type: newType };
          }
          return post;
        });
      }
      return null;
    });

    setIsLoading(false);
  };

  if (posts) {
    return (
      <div className="flex flex-col ">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold text-[#766967]">
              No posts found
            </h1>
          </div>
        ) : (
          posts.toReversed()?.map((post) => {
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
                      {post.authorName}
                    </span>
                    {" in "}
                    <span className="text-[#E5BE76] font-semibold hover:text-black cursor-pointer">
                      {post.journalName}
                    </span>
                  </p>
                  {/* Post content */}
                  <p>{post.content}</p>
                </div>
                {/* Post actions */}
                <div className="flex flex-row justify-between items-start">
                  {/* Privacy */}
                  <button
                    onClick={() =>
                      user && handleUpdatePostType(post.id, post.type)
                    }
                    disabled={isLoading}
                    className="flex items-center justify-center px-2 py-1"
                  >
                    {user ? (
                      journalPrivacy === "private" ? (
                        post.type === "public" ? (
                          <IoLockOpenOutline size={16} />
                        ) : (
                          <IoLockClosedOutline size={16} />
                        )
                      ) : null
                    ) : (
                      <CiGlobe size={18} />
                    )}
                  </button>
                  {/* Menu */}
                  <Menu
                    menuButton={
                      <MenuButton className="flex items-center justify-center px-2 py-1">
                        <CiMenuKebab size={18} className="rotate-90" />
                      </MenuButton>
                    }
                  >
                    <MenuContent />
                  </Menu>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <h1>Loading...</h1>
    </div>
  );
};

export default Layout;
