import type { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "@/prisma/user";

type Data = {
  message: string;
  user?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, username, id } = req.body;

  if (req.method !== "POST")
    return res.status(400).json({ message: "Invalid method" });

  switch (true) {
    case !email:
      return res.status(400).json({ message: `Missing field email` });
    case !username:
      return res.status(400).json({ message: `Missing field username` });
  }

  const user = await createUser(id, email, username);

  return res.status(200).json({
    message: "Account created successfully",
    user,
  });
}
