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
  journalId: string,
  content: string,
  authorId: string,
  type: string
) => {
  const post = await prisma.post.create({
    data: {
      id,
      journalId,
      content,
      authorId,
      type,
    },
  });
  return post;
};

// READALL
export const getAllPosts = async () => {
  const posts = await prisma.post.findMany();
  return posts;
};

// USER'S POSTS
export const getUserPosts = async (authorId: string) => {
  const posts = await prisma.post.findMany({
    where: {
      authorId,
    },
  });
  return posts;
};

// JOURNAL'S POSTS
export const getJournalPosts = async (journalId: string) => {
  const posts = await prisma.post.findMany({
    where: {
      journalId,
    },
  });
  return posts;
};
