import { updateLogIn } from "@/prisma/user";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, auth } = req.body;

  console.log(id, auth);

  if (req.method !== "POST")
    return res.status(400).json({ message: "Invalid method" });

  switch (true) {
    case !id:
      return res.status(400).json({ message: `Missing field id` });
    case auth === undefined:
      return res.status(400).json({ message: `Missing field auth` });
  }

  try {
    // update user by id
    const user = await updateLogIn(id, { isloggedin: auth });

    return res.status(200).json({
      message: "User found successfully",
      user,
    });
  } catch (err) {
    return res.status(400).json({
      message: "User not found",
    });
  }
};

export default handler;
