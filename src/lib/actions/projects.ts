"use server";

import { Project } from "@prisma/client";
import prisma from "../prisma";
import { getSession, withProjectAuth } from "../auth";
import { customAlphabet } from "nanoid";
import { put } from "@vercel/blob";
import { getBlurDataURL } from "../utils";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
);

export const _create = async () => {
  const response = await prisma.project.create({
    data: {
      title: "",
      body: "",
    },
  });

  return response;
};

export async function _getAll() {
  try {
    const articles = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return articles;
  } catch (error) {
    console.error("Error fetcing projects, ", error);
    throw error;
  }
}

export async function _getOne(projectId: string) {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });
    return project;
  } catch (error) {
    console.error("Error fetching project, ", error);
    throw error;
  }
}

export async function _update(data: Project) {
  const post = await prisma.project.findUnique({
    where: {
      id: data.id,
    },
  });
  const response = await prisma.project
    .update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        body: data.body,
        description: data.description,
      },
    })
    .catch((error: any) => {
      return {
        error: error.message,
      };
    });
  console.log(response);
  return response;
}

export async function _delete(articleId: string) {
  const deleteArticle = await prisma.project
    .delete({
      where: {
        id: articleId,
      },
    })
    .catch((error) => {
      console.error("Error deleting article, ", error);
    });
  return deleteArticle;
}

export async function _incView(articleId: string) {
  const views = await prisma.project
    .update({
      where: { id: articleId },
      data: {
        views: {
          increment: 1,
        },
      },
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
  return views;
}

export const _getPublished = async (): Promise<Project[]> => {
  try {
    return prisma.project.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error: any) {
    return error;
  }
};

export const _getDrafts = async () => {
  try {
    return prisma.project.findMany({
      where: {
        published: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error: any) {
    return { error: error.message };
  }
};

export const updateProjectMetadata = async (
  formData: FormData,
  id: string,
  published: string
) => {
  await prisma.project.update({
    where: {
      id: id,
    },
    data: {
      published: published === "published" ? true : false,
    },
  });
};

export const _latestProjects = async (limit?: number): Promise<Project[]> => {
  try {
    const projects = prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: limit || 3,
    });
    return projects || [];
  } catch (error: any) {
    return error;
  }
};
