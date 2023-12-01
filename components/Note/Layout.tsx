import React, { FC } from "react";
import { LuBookMinus } from "react-icons/lu";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import EmojiPicker from "emoji-picker-react";
import { Menu, MenuButton, MenuInstance } from "@szhsin/react-menu";
import { IoMdHappy } from "react-icons/io";
import { Journal, Post } from "@prisma/client";
import JournalSelector from "./JournalSelector";
import axios from "axios";
import { useUser } from "@/context/userStore";

interface Props {
  journals: Journal[];
  setPost: React.Dispatch<React.SetStateAction<Post[] | null>>;
}

const Note: FC<Props> = ({ journals, setPost }) => {
  const [text, setText] = React.useState<string>("");
  const [selectedJournal, setSelectedJournal] = React.useState<Journal | null>(
    null
  );

  const { user } = useUser();

  // menu ref
  const journalMenuRef = React.useRef<MenuInstance>(null);

  // handle close menu
  const handleCloseMenu = () => {
    journalMenuRef.current?.closeMenu();
  };

  // handle emoji input
  const handleEmojiInput = (emojiObject: any) => {
    let emoji = emojiObject.emoji;
    setText((text) => text + emoji);
  };

  // handle submit note
  const handleCreate = async () => {
    if (text === "" || selectedJournal === null) return;

    let payload = {
      journalId: selectedJournal.id,
      content: text,
      authorId: user?.id,
      type: selectedJournal.type,
      authorName: user?.username || "guest",
      journalName: selectedJournal.title,
    };

    const post = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/create`,
      payload
    );

    // concat post to posts
    setPost((posts) => {
      if (posts === null) return [post.data];
      return [post.data, ...posts];
    });

    setText("");
    setSelectedJournal(null);
  };

  return (
    <div className="flex flex-col border my-8">
      <div className="flex flex-row my-2">
        {/* SELECT JOURNAL */}
        <Menu
          instanceRef={journalMenuRef}
          menuButton={
            <MenuButton className="flex px-2 py-0.5 items-center justify-center bg-[#EEE3A6] border-black rounded-lg border">
              <LuBookMinus size={14} />
              <span className="text-sm mx-1">
                {selectedJournal ? selectedJournal.title : "Select Journal"}
              </span>
              <MdKeyboardArrowRight size={16} />
            </MenuButton>
          }
        >
          <JournalSelector
            handleCloseMenu={handleCloseMenu}
            setSelectedJournal={setSelectedJournal}
            journals={journals}
          />
        </Menu>
      </div>
      {/* TEXT AREA */}
      <div className="flex flex-col my-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          className="w-full border text-[#766967] placeholder:text-[#766967] bg-transparent"
          placeholder="Type here..."
        />
      </div>
      {/* SAVE BUTTON */}
      <div className="flex flex-row my-2">
        <button
          onClick={handleCreate}
          className={`flex px-2 py-0.5 items-center justify-center ${
            text === "" || selectedJournal === null
              ? "bg-transparent cursor-not-allowed opacity-30"
              : "bg-[#E8E6D6] hover:bg-[#86B64E] cursor-pointer"
          }  border-black rounded-lg border`}
        >
          <GoPlus size={14} />
          <span className="text-sm mx-1">Entry</span>
        </button>
        <Menu
          menuButton={
            <MenuButton className="p-1 bg-[#DBE4D8] mx-2 border border-black rounded-lg">
              <IoMdHappy size={20} />
            </MenuButton>
          }
        >
          <EmojiPicker onEmojiClick={handleEmojiInput} />
        </Menu>
      </div>
    </div>
  );
};

export default Note;
