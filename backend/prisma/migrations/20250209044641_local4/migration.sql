/*
  Warnings:

  - Added the required column `image` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "post_img" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT NOT NULL;
