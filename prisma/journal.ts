import prisma from "./prisma";

// READALL
export const getPublicJournals = async () => {
  const journals = await prisma.journal.findMany({
    where: {
      type: "public",
    },
  });
  return journals;
};

// READ USER'S JOURNALS
export const getUserJournals = async (authorId: string) => {
  const journals = await prisma.journal.findMany({
    where: {
      authorId,
    },
  });
  return journals;
};

// CREATE
export const createJournal = async (
  id: string,
  title: string,
  authorId: string,
  type: string
) => {
  const journal = await prisma.journal.create({
    data: {
      id,
      title,
      authorId,
      type,
    },
  });
  return journal;
};
