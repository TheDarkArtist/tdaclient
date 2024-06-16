/*
  Warnings:

  - You are about to drop the column `image` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `imageBlurhash` on the `Article` table. All the data in the column will be lost.
  - The `views` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "image",
DROP COLUMN "imageBlurhash";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "views",
ADD COLUMN     "views" TEXT[] DEFAULT ARRAY[]::TEXT[];
