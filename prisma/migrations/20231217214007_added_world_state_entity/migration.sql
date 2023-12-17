-- CreateTable
CREATE TABLE "WorldState" (
    "id" TEXT NOT NULL,
    "season" "Season" NOT NULL,
    "weatherToday" "Weather" NOT NULL,
    "weatherTomorrow" "Weather" NOT NULL,

    CONSTRAINT "WorldState_pkey" PRIMARY KEY ("id")
);
