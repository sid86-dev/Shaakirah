import React, { FC } from "react";

interface Props {
  login: () => void;
}

const Public: FC<Props> = ({ login }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-lg text-center">
        Welcome <span className="font-extrabold">Visitor!</span>
      </p>

      <p className="text-sm text-center mt-8">
        feel free to browse the public collection of this site and also post as
        a guest
      </p>
      <p className="text-sm text-center mt-8">
        click the button below to create your own account
      </p>
      <button
        onClick={() => login()}
        className="bg-[#eee7de] hover:bg-[#86B64E] border-black font-bold border py-1 px-3 rounded-lg mt-8"
      >
        sign in with google
      </button>
    </div>
  );
};

export default Public;
