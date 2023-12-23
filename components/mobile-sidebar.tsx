"use client";

import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { sidebarCategories } from "@/config/sidebar";
import { useDictionaryStore } from "@/store/dictionary-store";
import Link from "next/link";

const MobileSidebar = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="container">
        {sidebarCategories.map((category) => (
          <div key={category.label} className="pb-4">
            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
              {/* @ts-ignore: Implicit any */}
              {dictionary.sidebar[category.label]}
            </h4>
            {category.child.map((child) => (
              <div key={child.label} className="flex flex-col gap-1 text-sm">
                <Link
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                >
                  {/* @ts-ignore: Implicit any */}
                  {dictionary.sidebar[child.label]}
                </Link>
              </div>
            ))}
          </div>
        ))}
      </DrawerContent>
    </Drawer>
  );
};

export default MobileSidebar;
