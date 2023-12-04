-- CreateEnum
CREATE TYPE "Season" AS ENUM ('Any', 'Spring', 'Summer', 'Autumn', 'Winter');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('Ien', 'Perl');

-- CreateEnum
CREATE TYPE "Box" AS ENUM ('Capital', 'Garden', 'Seaport', 'Castle', 'Village');

-- CreateTable
CREATE TABLE "UserCurrency" (
    "userId" TEXT NOT NULL,
    "currency" "Currency" NOT NULL,
    "amount" BIGINT NOT NULL,

    CONSTRAINT "UserCurrency_pkey" PRIMARY KEY ("userId","currency")
);

-- CreateTable
CREATE TABLE "UserBoxes" (
    "userId" TEXT NOT NULL,
    "box" "Box" NOT NULL,
    "amount" BIGINT NOT NULL,

    CONSTRAINT "UserBoxes_pkey" PRIMARY KEY ("userId","box")
);

-- CreateTable
CREATE TABLE "UserSeeds" (
    "userId" TEXT NOT NULL,
    "seedId" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,

    CONSTRAINT "UserSeeds_pkey" PRIMARY KEY ("userId","seedId")
);

-- CreateTable
CREATE TABLE "UserCrops" (
    "userId" TEXT NOT NULL,
    "cropId" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,

    CONSTRAINT "UserCrops_pkey" PRIMARY KEY ("userId","cropId")
);

-- CreateTable
CREATE TABLE "UserProducts" (
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,

    CONSTRAINT "UserProducts_pkey" PRIMARY KEY ("userId","productId")
);

-- CreateTable
CREATE TABLE "Seed" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "season" "Season" NOT NULL,
    "growthDays" INTEGER NOT NULL,
    "reGrowthDays" INTEGER NOT NULL,
    "isMultiply" BOOLEAN NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Seed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crop" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "seedId" TEXT NOT NULL,

    CONSTRAINT "Crop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Crop_seedId_key" ON "Crop"("seedId");

-- AddForeignKey
ALTER TABLE "UserCurrency" ADD CONSTRAINT "UserCurrency_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBoxes" ADD CONSTRAINT "UserBoxes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSeeds" ADD CONSTRAINT "UserSeeds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSeeds" ADD CONSTRAINT "UserSeeds_seedId_fkey" FOREIGN KEY ("seedId") REFERENCES "Seed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCrops" ADD CONSTRAINT "UserCrops_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCrops" ADD CONSTRAINT "UserCrops_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "Crop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProducts" ADD CONSTRAINT "UserProducts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProducts" ADD CONSTRAINT "UserProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crop" ADD CONSTRAINT "Crop_seedId_fkey" FOREIGN KEY ("seedId") REFERENCES "Seed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
