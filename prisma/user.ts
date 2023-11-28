import prisma from "./prisma";
import { v4 as uuidv4 } from "uuid";

// READ
export const getUser = async (id: string) => {
  // find user by email
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

// CREATE
export const createUser = async (
  id: string,
  email: string,
  username: string
) => {
  const user = await prisma.user.create({
    data: {
      id,
      email,
      username,
      isloggedin: false,
    },
  });
  return user;
};

// UPDATE
export const updateLogIn = async (id: string, updateData: any) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...updateData,
    },
  });
  return user;
};

// // DELETE
// export const deleteRecord = async id => {
//     const record = await prisma.urls.delete({
//         where: {
//             id
//         }
//     })
//     return record
// }
