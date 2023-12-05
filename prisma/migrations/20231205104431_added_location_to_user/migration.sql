-- CreateEnum
CREATE TYPE "Location" AS ENUM ('InTransit', 'Capital', 'Garden', 'Seaport', 'Castle', 'Village', 'ExploreGarden', 'ExploreCastle', 'Fishing', 'FieldWatering', 'WorkOnContract');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "location" "Location" NOT NULL DEFAULT 'Capital';
