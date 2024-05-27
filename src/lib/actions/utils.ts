import { User } from "@prisma/client";
import { getSession } from "../auth";
import prisma from "../prisma";

export const getUserByUsername = async (
  username: string
): Promise<User | { error: string } | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    return user;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getUserByEmail = async (
  email: string
): Promise<User | { error: string } | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getUserById = async (
  id: string
): Promise<User | { error: string } | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const updateUsername = async (
  email: string,
  username: string
): Promise<User | { error: string }> => {
  const session = await getSession();
  if (!session?.user) {
    return { error: "Not Authenticated" };
  }
  try {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { username },
    });
    return updatedUser;
  } catch (error: any) {
    return { error: error.message };
  }
};
