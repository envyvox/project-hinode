-- CreateTable
CREATE TABLE "WorkContract" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" "Location" NOT NULL,
    "duration" INTEGER NOT NULL,
    "reward" INTEGER NOT NULL,

    CONSTRAINT "WorkContract_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkContract_name_location_key" ON "WorkContract"("name", "location");
