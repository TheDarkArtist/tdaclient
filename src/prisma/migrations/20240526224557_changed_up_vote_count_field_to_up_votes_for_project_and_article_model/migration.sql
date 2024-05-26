/*
  Warnings:

  - You are about to drop the column `upVoteCount` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `upVoteCount` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "upVoteCount",
ADD COLUMN     "upVotes" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "upVoteCount",
ADD COLUMN     "upVotes" INTEGER NOT NULL DEFAULT 0;
