-- CreateEnum
CREATE TYPE "FarmCellState" AS ENUM ('Empty', 'Planted', 'Watered', 'Completed');

-- CreateTable
CREATE TABLE "UserFarmCell" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "seedId" TEXT NOT NULL,
    "state" "FarmCellState" NOT NULL,
    "progress" INTEGER NOT NULL,
    "inReGrowth" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFarmCell_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserFarmCell" ADD CONSTRAINT "UserFarmCell_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFarmCell" ADD CONSTRAINT "UserFarmCell_seedId_fkey" FOREIGN KEY ("seedId") REFERENCES "Seed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
