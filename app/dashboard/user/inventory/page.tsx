import InventoryBoxes from "@/components/inventory/inventory-boxes";
import InventoryCrops from "@/components/inventory/inventory-crops";
import InventoryCurrency from "@/components/inventory/inventory-currency";
import InventoryFish from "@/components/inventory/inventory-fish";
import InventoryGathering from "@/components/inventory/inventory-gathering";
import InventoryProducts from "@/components/inventory/inventory-products";
import InventorySeeds from "@/components/inventory/inventory-seeds";

const InfoInventoryPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <InventoryCurrency />
      <InventoryBoxes />
      <InventoryFish />
      <InventoryGathering />
      <InventorySeeds />
      <InventoryCrops />
      <InventoryProducts />
    </div>
  );
};

export default InfoInventoryPage;
