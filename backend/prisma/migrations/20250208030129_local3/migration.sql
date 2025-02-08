/*
  Warnings:

  - Added the required column `exp_after` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exp_real` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "exp_after" TEXT NOT NULL,
ADD COLUMN     "exp_real" TEXT NOT NULL,
ADD COLUMN     "post_note" TEXT,
ADD COLUMN     "post_stat" TEXT;
