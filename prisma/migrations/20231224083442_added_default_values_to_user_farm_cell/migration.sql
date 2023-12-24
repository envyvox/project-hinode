-- DropForeignKey
ALTER TABLE "UserFarmCell" DROP CONSTRAINT "UserFarmCell_seedId_fkey";

-- AlterTable
ALTER TABLE "UserFarmCell" ALTER COLUMN "seedId" DROP NOT NULL,
ALTER COLUMN "state" SET DEFAULT 'Empty',
ALTER COLUMN "progress" SET DEFAULT 0,
ALTER COLUMN "inReGrowth" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "UserFarmCell" ADD CONSTRAINT "UserFarmCell_seedId_fkey" FOREIGN KEY ("seedId") REFERENCES "Seed"("id") ON DELETE SET NULL ON UPDATE CASCADE;
