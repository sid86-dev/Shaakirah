import { getUser } from "@/prisma/user";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === "GET") {
    switch (true) {
      case !id:
        return res.status(400).json({ message: `Missing field id` });
    }

    try {
      // get user by id
      const user = await getUser(id as string);

      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({
        message: "User not found",
      });
    }
  } else {
    return res.status(400).json({ message: "Invalid method" });
  }
};

export default handler;
