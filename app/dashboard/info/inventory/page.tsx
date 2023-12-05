import InventoryCrops from "./components/inventory-crops";
import InventoryCurrency from "./components/inventory-currency";
import InventoryProducts from "./components/inventory-products";
import InventorySeeds from "./components/inventory-seeds";

export default function InfoInventoryPage() {
  return (
    <div className="flex flex-col gap-5 py-7">
      <InventoryCurrency />
      <InventorySeeds />
      <InventoryCrops />
      <InventoryProducts />
    </div>
  );
}
