import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Header = () => {
  // router.pathname will return the current path
  const router = useRouter();

  return (
    <div className="flex w-full">
      <Link href="/">
        <span
          className={`text-md ${
            router.pathname === "/" ? "font-bold" : "text-gray-500"
          }`}
        >
          Personal
        </span>
      </Link>
      <Link href="/public" className="mx-3">
        <span
          className={`text-md  ${
            router.pathname === "/public" ? "font-bold" : "text-gray-500"
          }`}
        >
          Public
        </span>
      </Link>
      <Link href="/settings">
        <span
          className={`text-md ${
            router.pathname === "/settings" ? "font-bold" : "text-gray-500"
          }`}
        >
          Settings
        </span>
      </Link>
    </div>
  );
};

export default Header;
