import { Journal } from "@prisma/client";
import React, { FC } from "react";
import { TbUsers } from "react-icons/tb";

interface Props {
  journals: Journal[];
  setSelectedJournal: React.Dispatch<React.SetStateAction<Journal | null>>;
  handleCloseMenu: () => void;
}

const JournalSelector: FC<Props> = ({
  journals,
  setSelectedJournal,
  handleCloseMenu,
}) => {
  return (
    <div className="flex bg-[#eee7de] flex-col translate-x-44 -translate-y-6 border border-black w-52">
      <input
        className="text-sm px-2 text-[#766967] my-2 placeholder:text-[#766967] bg-transparent"
        placeholder="Find or create a journal..."
      />
      {journals &&
        journals.map((journal) => (
          <div
            onClick={() => {
              setSelectedJournal(journal);
              handleCloseMenu();
            }}
            key={journal.id}
            className="flex px-2 py-2 hover:text-yellow-50 cursor-pointer hover:bg-[#766967] flex-row justify-between"
          >
            {journal.type === "public" && (
              <span className="text-sm hover:text-yellow-50  text-black text-inherit font-extrabold">
                <TbUsers size={14} className="inline-block mr-2" />
                guest&#39;s
              </span>
            )}
            <span className="text-sm text-[#766967] hover:text-yellow-50 text-inherit">
              {journal.title}
            </span>
          </div>
        ))}
    </div>
  );
};

export default JournalSelector;
