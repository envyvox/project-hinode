import { Banner } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { Skeleton } from "./ui/skeleton";

type Props = {
  banner: Banner | undefined;
};

const BannerImage = ({ banner }: Props) => {
  return banner ? (
    <Image
      width={700}
      height={banner.rarity === "Rare" ? 200 : 150}
      className="rounded-lg shadow-md"
      src={`/banner/${banner.rarity}/${banner.id}${
        banner.rarity === "Animated" ? ".gif" : ".png"
      }`}
      alt="Active user banner"
    />
  ) : (
    <Skeleton className="h-[200px] w-full" />
  );
};

export default BannerImage;
