"use server";

import { Article, Project } from "@prisma/client";
import prisma from "../prisma";
import { getSession, withArticleAuth } from "../auth";
import { customAlphabet } from "nanoid";
import { put } from "@vercel/blob";
import { getBlurDataURL } from "../utils";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
);

export const _create = async (): Promise<Article | { error: string }> => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const response = await prisma.article.create({
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
    const articles = await prisma.article.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw new Error("Failed to fetch articles");
  }
}

export async function _getOne(articleId: string) {
  try {
    const article = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
    });
    return article;
  } catch (error) {
    console.error("Error fetching article, ", error);
    throw error;
  }
}

export async function _update(data: Article) {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const post = await prisma.article.findUnique({
    where: {
      id: data.id,
    },
  });
  if (!post || post.userId !== session.user.id) {
    return {
      error: "Post not found",
    };
  }

  const response = await prisma.article
    .update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        body: data.body,
        tags: data.tags,
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
  const deleteArticle = await prisma.article
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

export async function _incView(articleId: string, userId: string) {
  try {
    // Fetch the current article record
    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });

    if (!article) {
      throw new Error(`Article with id ${articleId} not found`);
    }

    const updatedArticle = await prisma.article.update({
      where: { id: articleId },
      data: {
        views: [...article.views, userId], // Adding userId to the views array
      },
    });

    return updatedArticle.views; // Return the updated views array
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error to handle it higher up
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client after operation
  }
}

export const updateArticleMetadata = withArticleAuth(
  async (formData: FormData, post: Article, key: string) => {
    const value = formData.get(key) as string;

    try {
      let response;
      if (key === "image") {
        const file = formData.get("image") as File;
        const filename = `${nanoid()}.${file.type.split("/")[1]}`;

        const { url } = await put(filename, file, {
          access: "public",
        });

        const blurhash = await getBlurDataURL(url);

        response = await prisma.article.update({
          where: {
            id: post.id,
          },
          data: {
            image: url,
            imageBlurhash: blurhash,
          },
        });
      } else {
        response = await prisma.article.update({
          where: {
            id: post.id,
          },
          data: {
            [key]: key === "published" ? value === "true" : value,
          },
        });
      }

      return response;
    } catch (error: any) {
      if (error.code === "P2002") {
        return {
          error: `This slug is already in use`,
        };
      } else {
        return {
          error: error.message,
        };
      }
    }
  },
);

export const _getPublished = async () => {
  try {
    return prisma.article.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error: any) {
    return { error: error.message };
  }
};

export const _getDrafts = async () => {
  try {
    return prisma.article.findMany({
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

export const _latestArticles = async (limit?: number): Promise<Article[]> => {
  try {
    const articles = prisma.article.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        published: true,
      },
      take: limit || 3,
    });
    return articles || [];
  } catch (error: any) {
    return error;
  }
};

export const _filteredArticles = async (
  term: string,
  limit?: number,
): Promise<Article[]> => {
  try {
    const articles = await prisma.article.findMany({
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
      take: limit || 6,
    });
    return articles || [];
  } catch (error: any) {
    console.error("Error fetching filtered articles:", error);
    throw error;
  }
};

export const addComment = async (
  text: string,
  userId: string,
  articleId: string,
) => {
  try {
    const comment = await prisma.comment.create({
      data: {
        text: text,
        userId: userId,
        parentId: articleId,
        parentType: "article",
      },
    });
    return comment;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export const getComments = async (articleId: string) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        parentId: articleId,
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
