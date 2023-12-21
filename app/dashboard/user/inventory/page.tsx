"use client";

import InventoryBoxes from "@/components/inventory/inventory-boxes";
import InventoryCrops from "@/components/inventory/inventory-crops";
import InventoryCurrency from "@/components/inventory/inventory-currency";
import InventoryFish from "@/components/inventory/inventory-fish";
import InventoryGathering from "@/components/inventory/inventory-gathering";
import InventoryProducts from "@/components/inventory/inventory-products";
import InventorySeeds from "@/components/inventory/inventory-seeds";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useUserBox from "@/hooks/use-user-box";
import useUserCrop from "@/hooks/use-user-crop";
import useUserCurrency from "@/hooks/use-user-currency";
import useUserFish from "@/hooks/use-user-fish";
import useUserGathering from "@/hooks/use-user-gathering";
import useUserProduct from "@/hooks/use-user-product";
import useUserSeed from "@/hooks/use-user-seed";
import { useDictionaryStore } from "@/store/dictionary-store";

enum InventoryTab {
  currency = "currency",
  box = "box",
  fish = "fish",
  gathering = "gathering",
  seed = "seed",
  crop = "crop",
  product = "product",
}

const UserInventory = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const inventoryTabs = Object.keys(InventoryTab);

  useUserCurrency();
  useUserBox();
  useUserFish();
  useUserGathering();
  useUserSeed();
  useUserCrop();
  useUserProduct();

  return (
    <Tabs defaultValue={InventoryTab.currency}>
      <TabsList className="flex w-full flex-wrap justify-start gap-x-5">
        {inventoryTabs.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="min-h-[32px] min-w-[100px]"
          >
            {/* @ts-ignore Implicit any */}
            {dictionary.dashboard[`user.inventory.${tab}`]}
          </TabsTrigger>
        ))}
      </TabsList>
      {inventoryTabs.map((tab) => (
        <TabsContent key={tab} value={tab}>
          {getInventoryComponent(tab as InventoryTab)}
        </TabsContent>
      ))}
    </Tabs>
  );
};

const getInventoryComponent = (tab: InventoryTab) => {
  switch (tab) {
    case InventoryTab.currency:
      return <InventoryCurrency />;
    case InventoryTab.box:
      return <InventoryBoxes />;
    case InventoryTab.fish:
      return <InventoryFish />;
    case InventoryTab.gathering:
      return <InventoryGathering />;
    case InventoryTab.seed:
      return <InventorySeeds />;
    case InventoryTab.crop:
      return <InventoryCrops />;
    case InventoryTab.product:
      return <InventoryProducts />;
    default:
      return null;
  }
};

export default UserInventory;
