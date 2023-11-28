import Link from "next/link";
import React, { useState } from "react";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
import { deleteCookie, getCookie } from "cookies-next";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";

const Signup = () => {
  const [name, setName] = useState<string>("");
  const router = useRouter();

  // handle create user
  const createUser = async () => {
    let email = getCookie("unregisteredEmail");
    let id = getCookie("id");

    const { data } = await axios.post(`api/user/create`, {
      id,
      email,
      username: name,
    });

    await axios.post("/api/user/auth", {
      id,
      auth: true,
    });

    if (data.user) {
      deleteCookie("unregisteredEmail");
      router.push("/");
    }
  };

  // handle exit signup
  const handleExitSignup = () => {
    deleteCookie("unregisteredEmail");
    router.push("/");
  };

  return (
    <div className="m-8">
      <div className="p-5 flex flex-col">
        <span className="text-lg font-bold mb-10">
          <FaRegFaceSmileBeam className="inline-block mr-2" />
        </span>
        <span className="text-lg font-bold">
          Finish setting up your account:
        </span>
        <span className="font-normal text-gray-600">
          It is so wonderful to see a new face around here!
        </span>

        {/* Form */}
        <div className="mt-8 mb-4 flex flex-col">
          <label className="block text-gray-700  font-medium mb-2">
            How do you want to be called?
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="border border-black px-2 py-1 w-[60%] rounded"
          />
          <span className="font-normal text-gray-600 text-xs mt-2">
            (This will be your display name. You can always change it later.)
          </span>
        </div>

        {/* Name demo */}
        {name && (
          <span className="mt-6 ">
            You will appear as:{" "}
            <span className="text-[#86B64E] font-bold">{name}</span>
          </span>
        )}

        {/* Action Button */}
        <div
          className={`${
            name ? "mt-12" : "mt-24"
          } mb-4 flex flex-col justify-stretch`}
        >
          <button
            onClick={createUser}
            className="border border-black rounded-3xl bg-[#E8E6D6] hover:bg-[#86B64E] w-[45%]"
          >
            + Create account!
          </button>
          <span className="font-normal text-gray-600 text-md mt-4">
            or{" "}
            <span
              onClick={handleExitSignup}
              className="underline cursor-pointer"
            >
              cancel your sign up!
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
