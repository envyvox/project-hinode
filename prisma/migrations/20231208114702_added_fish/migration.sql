-- CreateEnum
CREATE TYPE "FishRarity" AS ENUM ('Common', 'Rare', 'Epic', 'Mythical', 'Legendary');

-- CreateEnum
CREATE TYPE "Weather" AS ENUM ('Any', 'Clear', 'Rain');

-- CreateEnum
CREATE TYPE "TimesDay" AS ENUM ('Any', 'Day', 'Night');

-- CreateTable
CREATE TABLE "UserFish" (
    "userId" TEXT NOT NULL,
    "fishId" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFish_pkey" PRIMARY KEY ("userId","fishId")
);

-- CreateTable
CREATE TABLE "Fish" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rarity" "FishRarity" NOT NULL,
    "catchWeather" "Weather" NOT NULL,
    "catchTimesDay" "TimesDay" NOT NULL,
    "catchSeason" "Season"[],
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fish_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fish_name_key" ON "Fish"("name");

-- AddForeignKey
ALTER TABLE "UserFish" ADD CONSTRAINT "UserFish_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFish" ADD CONSTRAINT "UserFish_fishId_fkey" FOREIGN KEY ("fishId") REFERENCES "Fish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
