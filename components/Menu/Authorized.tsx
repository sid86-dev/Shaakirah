import { User } from "@/types";
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { FC } from "react";

interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
}

const Authorized: FC<Props> = ({ user, setUser }) => {
  const router = useRouter();

  // handle logout
  const logout = async () => {
    const id = getCookie("id");
    await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/auth`, {
      id,
      auth: false,
    });
    setUser(null);
    deleteCookie("id");
    router.push("/public");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-lg text-center">
        Welcome{" "}
        <span className="font-extrabold text-[#86B64E]">{user.username}</span>
      </p>
      <p className="text-sm text-[#766a68]">{new Date().toDateString()}</p>

      {/* Logout button */}
      <button
        onClick={() => logout()}
        className="bg-[#eee7de] hover:bg-[#86B64E] border-black font-bold border py-1 px-3 rounded-lg mt-8"
      >
        Logout
      </button>
    </div>
  );
};

export default Authorized;
