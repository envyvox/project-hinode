-- CreateEnum
CREATE TYPE "AccessRole" AS ENUM ('User', 'Admin');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accessRole" "AccessRole" NOT NULL DEFAULT 'User';
