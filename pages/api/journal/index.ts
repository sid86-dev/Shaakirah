import { getPublicJournals } from "@/prisma/journal";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const posts = await getPublicJournals();

    if (posts.length === 0) return res.status(200).json([]);

    return res.status(200).json(posts);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
