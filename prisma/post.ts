import prisma from "./prisma";

// READ
export const getPost = async (id: string) => {
  // find user by email
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return post;
};

// CREATE
export const createPost = async (
  id: string,
  journal: string,
  content: string,
  authorId: string
) => {
  const post = await prisma.post.create({
    data: {
      id,
      journal,
      content,
      authorId,
    },
  });
  return post;
};

// READALL
export const getAllPosts = async () => {
  const posts = await prisma.post.findMany();
  return posts;
};
