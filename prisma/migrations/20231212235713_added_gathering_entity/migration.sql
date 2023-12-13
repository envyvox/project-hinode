-- CreateEnum
CREATE TYPE "GatheringPropertyType" AS ENUM ('GatheringChance', 'GatheringDoubleChance', 'GatheringAmount');

-- CreateTable
CREATE TABLE "Gathering" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" "Location" NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Gathering_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GatheringProperty" (
    "gatheringId" TEXT NOT NULL,
    "property" "GatheringPropertyType" NOT NULL,
    "value" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Gathering_name_key" ON "Gathering"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GatheringProperty_gatheringId_property_key" ON "GatheringProperty"("gatheringId", "property");

-- AddForeignKey
ALTER TABLE "GatheringProperty" ADD CONSTRAINT "GatheringProperty_gatheringId_fkey" FOREIGN KEY ("gatheringId") REFERENCES "Gathering"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
