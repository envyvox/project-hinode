-- CreateEnum
CREATE TYPE "Title" AS ENUM ('Newbie', 'Lucky', 'ResourcefulCatcher', 'DescendantAristocracy', 'DescendantOcean', 'KeeperGrove', 'ReliableWorkaholic', 'SereneExcavator', 'AgileEarner', 'Handyman', 'WineSamurai', 'StockyFarmer', 'SeaPoet', 'CulinaryIdol', 'Toxic', 'KingExcitement', 'BelievingInLuck', 'FirstSamurai', 'Yatagarasu', 'HarbingerOfSummer', 'Wanderer');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "title" "Title" NOT NULL DEFAULT 'Newbie';
