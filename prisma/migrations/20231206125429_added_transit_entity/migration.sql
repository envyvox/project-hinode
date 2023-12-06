-- CreateTable
CREATE TABLE "Transit" (
    "id" TEXT NOT NULL,
    "departure" "Location" NOT NULL,
    "destination" "Location" NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Transit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transit_departure_destination_key" ON "Transit"("departure", "destination");
