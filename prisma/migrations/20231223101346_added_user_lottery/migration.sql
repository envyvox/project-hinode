-- CreateTable
CREATE TABLE "UserLottery" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserLottery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserLottery" ADD CONSTRAINT "UserLottery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
