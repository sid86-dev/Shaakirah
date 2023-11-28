import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import { NextPage } from "next";
import axios from "axios";
import { setCookie } from "cookies-next";

interface Props {
  session: any;
}

const Public: NextPage<Props> = () => {
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
        await axios.post("/api/user/auth", {
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
    <div>
      <button className="btn btn-blue" onClick={() => login()}>
        {"Sign In"}
      </button>
    </div>
  );
};

export default Public;
