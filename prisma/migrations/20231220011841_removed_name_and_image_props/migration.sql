/*
  Warnings:

  - You are about to drop the column `image` on the `Banner` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Banner` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Banner" DROP COLUMN "image",
DROP COLUMN "name";
