import { getUserPosts, updatePost } from "@/prisma/post";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { authorId } = req.query;

    // READ USER POSTS
    const posts = await getUserPosts(authorId as string);

    res.status(200).json(posts);
  } else if (req.method === "PUT") {
    const { id } = req.query;
    const post = await updatePost(id as string, req.body);
    return res.status(200).json(post);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
