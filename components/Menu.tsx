import React, { FC, useEffect, useState } from "react";
import { PiCaretRightBold, PiCaretLeftBold } from "react-icons/pi";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const Menu: FC<Props> = ({ setIsOpen, isOpen }) => {
  return (
    <div
      className={`flex relative border w-1/4 border-black h-screen border-r border-y-0 border-l-0 `}
    >
      {/* Toolge Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-5 cursor-pointer bg-[#eee7de] border-black border p-1 rounded-full top-14"
      >
        {isOpen ? (
          <PiCaretLeftBold className="text-2xl" />
        ) : (
          <PiCaretRightBold className="text-2xl" />
        )}
      </div>

      <div className={`flex flex-col p-5 items-center w-full absolute `}>
        <div className="flex flex-col items-center p-5">
          <span className="text-xl">Welcome</span>
        </div>
      </div>
    </div>
  );
};

export default Menu;
