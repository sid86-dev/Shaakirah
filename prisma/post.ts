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
  type: string,
  authorName: string,
  journalName: string
) => {
  const post = await prisma.post.create({
    data: {
      id,
      journalId,
      content,
      authorId,
      type,
      authorName,
      journalName,
    },
  });
  return post;
};

// READALL
export const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    where: {
      type: "public",
    },
  });
  return posts;
};

// READ USER'S POSTS
export const getUserPosts = async (authorId: string) => {
  const posts = await prisma.post.findMany({
    where: {
      authorId,
    },
  });
  return posts;
};

// READ JOURNAL'S POSTS
export const getJournalPosts = async (journalId: string) => {
  const posts = await prisma.post.findMany({
    where: {
      journalId,
    },
  });
  return posts;
};

// UPDATE POST FIELD
export const updatePost = async (id: string, data: any) => {
  const post = await prisma.post.update({
    where: {
      id,
    },
    data,
  });
  return post;
};
