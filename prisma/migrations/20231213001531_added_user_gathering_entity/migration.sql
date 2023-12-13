-- CreateTable
CREATE TABLE "UserGathering" (
    "userId" TEXT NOT NULL,
    "gatheringId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserGathering_pkey" PRIMARY KEY ("userId","gatheringId")
);

-- AddForeignKey
ALTER TABLE "UserGathering" ADD CONSTRAINT "UserGathering_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGathering" ADD CONSTRAINT "UserGathering_gatheringId_fkey" FOREIGN KEY ("gatheringId") REFERENCES "Gathering"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
