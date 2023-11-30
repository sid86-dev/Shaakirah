import { createPost, getUserPosts } from "@/prisma/post";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { authorId } = req.query;

    // READALL
    const posts = await getUserPosts(authorId as string);

    res.status(200).json(posts);
  } else if (req.method === "POST") {
    const id = uuidv4();
    const { journalId, content, authorId } = req.body;

    // CREATE
    const post = await createPost(id, journalId, content, authorId);

    res.status(200).json(post);
  }
}
