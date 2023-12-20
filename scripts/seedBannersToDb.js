const fs = require("fs").promises;
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const folders = [
  "../public/banner/Common",
  "../public/banner/Rare",
  "../public/banner/Animated",
  "../public/banner/Event",
];

async function seedBannersToDb() {
  try {
    const bannerData = [];

    for (const folder of folders) {
      const rarity = path.basename(folder); // Extract the last folder name
      const files = await fs.readdir(folder);

      for (const file of files) {
        const filenameWithoutExt = path.parse(file).name;

        bannerData.push({
          id: filenameWithoutExt,
          rarity: rarity,
          price: 9999999,
        });
      }
    }

    const res = await prisma.banner.createMany({
      skipDuplicates: true,
      data: bannerData,
    });

    console.log("Success:", res);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedBannersToDb();
