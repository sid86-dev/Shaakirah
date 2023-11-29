import { useUser } from "@/context/userStore";
import { useGoogleLogin } from "@react-oauth/google";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { PiCaretRightBold, PiCaretLeftBold } from "react-icons/pi";
import axios from "axios";
import Public from "./Public";
import User from "./User";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const Menu: FC<Props> = ({ setIsOpen, isOpen }) => {
  const { user, setUser } = useUser();

  const router = useRouter();

  // handle login
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // get user credentials
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo?scope=email%20profile",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );

      const userInfo = response.data;

      let id = userInfo.id;
      setCookie("id", id);

      try {
        await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/auth`, {
          id,
          auth: true,
        });
        router.push("/");
      } catch (err) {
        setCookie("unregisteredEmail", userInfo.email);
        router.push("/signup");
      }
    },
  });

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

      <div className="my-8 p-3 w-full">
        {user ? <User /> : <Public />}
      </div>
    </div>
  );
};

export default Menu;
