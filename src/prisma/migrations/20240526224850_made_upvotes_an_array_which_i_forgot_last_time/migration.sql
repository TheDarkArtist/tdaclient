/*
  Warnings:

  - The `upVotes` column on the `Article` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `upVotes` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "upVotes",
ADD COLUMN     "upVotes" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "upVotes",
ADD COLUMN     "upVotes" TEXT[] DEFAULT ARRAY[]::TEXT[];
