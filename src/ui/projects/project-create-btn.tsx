"use client";
import React, { useTransition } from "react";
import { HoverBorderGradient } from "@/ui/utils/hover-border-gradient";
import { LuPlus } from "react-icons/lu";
import { useSession } from "next-auth/react";
import { _create } from "@/lib/actions/projects";
import { useRouter } from "next/navigation";
import LoadingDots from "../utils/loading.dots";
import { Article, Project } from "@prisma/client";

export function ProjectCreateBtn() {
  const { data, status } = useSession();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  if (status !== "authenticated") return;

  if (data && data.user && data.user.access != "root") {
    return;
  }

  return (
    <HoverBorderGradient
      containerClassName="rounded-md dark:bg-black bg-white/[.2]"
      onClick={() => {
        startTransition(async () => {
          const post: Project | { error: string } = await _create();
          if ("error" in post) {
            console.error(post.error);
            return;
          }
          router.push(`/projects/post/${post.id}?source=projects`);
        });
      }}
      isPending={isPending}
      as="button"
      className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
    >
      <div>
        {isPending ? (
          <LoadingDots color="red" />
        ) : (
          <div className="flex gap-2">
            <LuPlus className="h-6 w-6 dark:text-white/[.6] text-black/[.6]" />
            <span>Add</span>
          </div>
        )}
      </div>
    </HoverBorderGradient>
  );
}
