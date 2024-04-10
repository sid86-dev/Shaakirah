import { getAllPosts } from "@/prisma/post";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // READALL
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
