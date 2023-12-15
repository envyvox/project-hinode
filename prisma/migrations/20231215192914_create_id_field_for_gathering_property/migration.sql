-- DropIndex
DROP INDEX "GatheringProperty_gatheringId_property_key";

-- AlterTable
ALTER TABLE "GatheringProperty" ADD CONSTRAINT "GatheringProperty_pkey" PRIMARY KEY ("gatheringId", "property");
