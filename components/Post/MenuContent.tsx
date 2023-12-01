import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const MenuContent = () => {
  let menuList = [
    {
      title: "Edit",
      icon: <FaRegEdit className="inline-block mr-2" />,
    },
    {
      title: "Delete",
      icon: <RiDeleteBin6Line className="inline-block mr-2" />,
    },
  ];

  return (
    <div className="border border-black flex-col w-32">
      <p className="bg-[#E4D8CF] px-2 py-0.5 text-sm">Enter Options:</p>
      {menuList.map((menu, index) => {
        return (
          <div
            onClick={() => {}}
            key={index}
            className="flex px-2 py-2 hover:text-yellow-50 cursor-pointer hover:bg-[#766967] flex-row justify-between"
          >
            <span className="text-sm text-[#766967] hover:text-yellow-50 text-inherit">
              {menu.icon} {menu.title}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default MenuContent;
