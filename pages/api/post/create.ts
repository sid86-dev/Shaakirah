import { createPost } from "@/prisma/post";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const id = uuidv4();
    const { journalId, content, authorId, type } = req.body;

    console.log(req.body)

    // CREATE
    const post = await createPost(id, journalId, content, authorId, type);

    res.status(200).json(post);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
