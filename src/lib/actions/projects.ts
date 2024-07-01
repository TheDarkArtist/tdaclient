"use server";

import { Project } from "@prisma/client";
import prisma from "../prisma";
import { getSession } from "../auth";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
);

export const _create = async (): Promise<Project | { error: string }> => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const response = await prisma.project.create({
    data: {
      title: "",
      body: "",
      userId: session.user.id,
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
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const post = await prisma.project.findUnique({
    where: {
      id: data.id,
    },
  });
  if (!post || post.userId !== session.user.id) {
    return {
      error: "Post not found",
    };
  }

  const response = await prisma.project
    .update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        body: data.body,
        tags: data.tags,
        repo: data.repo,
        link: data.link,
        published: data.published,
      },
    })
    .catch((error: any) => {
      return {
        error: error.message,
      };
    });
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

export async function _incView(projectId: string, userId: string) {
  try {
    // Fetch the current project record
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new Error(`Project with id ${projectId} not found`);
    }

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        views: [...project.views, userId], // Adding userId to the views array
      },
    });

    return updatedProject.views; // Return the updated views array
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error to handle it higher up
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client after operation
  }
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
  published: string,
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

export const _filteredProjects = async (
  term: string,
  limit?: number,
): Promise<Project[]> => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        published: true,
        OR: [
          {
            title: {
              contains: term,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: term,
              mode: "insensitive",
            },
          },
        ],
      },
      take: limit || 100,
    });
    return projects || [];
  } catch (error: any) {
    console.error("Error fetching filtered projects:", error);
    throw error;
  }
};

export const addComment = async (
  text: string,
  userId: string,
  projectId: string,
) => {
  try {
    const comment = await prisma.comment.create({
      data: {
        text: text,
        userId: userId,
        parentId: projectId,
        parentType: "project",
      },
    });
    return comment;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export const getComments = async (projectId: string) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        parentId: projectId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error("Failed to fetch comments");
  }
};
