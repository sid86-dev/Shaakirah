import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import { NextPage } from "next";
import axios from "axios";
import { setCookie } from "cookies-next";

interface Props {
  session: any;
}

const Public: NextPage<Props> = () => {

  return (
    <div>
      public
    </div>
  );
};

export default Public;
