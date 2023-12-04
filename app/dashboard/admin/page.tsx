"use client";

import { TypographyH4 } from "@/components/typography/h4";
import { Button } from "@/components/ui/button";
import { generateCrops } from "@/lib/admin/generate-crops";
import { generateProducts } from "@/lib/admin/generate-products";
import { generateSeeds } from "@/lib/admin/generate-seeds";
import { deleteCrops, deleteProtucts, deleteSeeds } from "@/lib/admin/remover";
import { addCurrencyToUser } from "@/lib/game/currency";
import { useUserStore } from "@/store/user-store";
import { AccessRole, Currency } from "@prisma/client";

export default function AdminPage() {
  const user = useUserStore((state) => state.user);

  // if (user.accessRole != null && user.accessRole !== AccessRole.Admin) {
  //   redirect("/");
  // }

  return (
    <div className="flex flex-col gap-5 py-6">
      <div className="flex flex-col gap-2">
        <TypographyH4>Seeder</TypographyH4>
        <div className="flex flex-wrap gap-5">
          <Button className="flex-1" onClick={() => generateSeeds()}>
            Generate Seeds
          </Button>
          <Button className="flex-1" onClick={() => generateCrops()}>
            Generate Crops
          </Button>
          <Button className="flex-1" onClick={() => generateProducts()}>
            Generate Products
          </Button>
          <Button
            className="flex-1"
            onClick={() => addCurrencyToUser(user.id, Currency.Ien, 999)}
          >
            Add 999 Ien
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <TypographyH4>Remover</TypographyH4>
        <div className="flex flex-wrap gap-5">
          <Button
            variant="destructive"
            className="flex-1"
            onClick={() => deleteSeeds()}
          >
            Delete Seeds
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={() => deleteCrops()}
          >
            Delete Crops
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={() => deleteProtucts()}
          >
            Delete Products
          </Button>
        </div>
      </div>
    </div>
  );
}
