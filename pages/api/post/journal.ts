import { getJournalPosts } from "@/prisma/post";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { journalId } = req.query;

    // READ JOURNAL POSTS
    const posts = await getJournalPosts(journalId as string);

    res.status(200).json(posts);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
