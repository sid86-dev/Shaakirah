import {
  getUserJournals,
} from "@/prisma/journal";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { authorId } = req.query;

    const posts = await getUserJournals(authorId as string);

    if (posts.length === 0) return res.status(200).json([]);

    return res.status(200).json(posts);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
