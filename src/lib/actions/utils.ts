import { User } from "@prisma/client";
import { getSession } from "../auth";
import prisma from "../prisma";

export const getUserByUsername = async (
  username: string
): Promise<User | null> => {
  try {
    const user = prisma?.user.findUnique({
      where: {
        username: username,
      },
    });
    return user;
  } catch (error: any) {
    return error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    return prisma?.user.findUnique({
      where: {
        email: email,
      },
    });
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const user = prisma?.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  } catch (error: any) {
    return error;
  }
};

export const updateUsername = async (email: string, username: string) => {
  const session = await getSession();
  if (!session?.user) {
    return { error: "Not Authenticated" };
  }
  try {
    return prisma.user.update({
      where: {
        email: email,
      },
      data: {
        username: username,
      },
    });
  } catch (error: any) {
    return { error: error.message };
  }
};
