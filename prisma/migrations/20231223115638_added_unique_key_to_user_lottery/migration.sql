/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserLottery` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserLottery_userId_key" ON "UserLottery"("userId");
