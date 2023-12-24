"use client";

import { useState } from "react";
import Link from "next/link";
import { useDictionaryStore } from "@/store/dictionary-store";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";

import { sidebarCategories } from "@/config/sidebar";

import TypographyH4 from "./typography/h4";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";

const MobileSidebar = () => {
  const { data: session } = useSession();
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const [open, setOpen] = useState(false);

  if (!session) {
    return null;
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="container">
        {sidebarCategories.map((category) => (
          <div key={category.label} className="flex flex-col gap-3 pb-4">
            <TypographyH4>
              {/* @ts-ignore: Implicit any */}
              {dictionary.sidebar[category.label]}
            </TypographyH4>
            <div className="flex flex-col gap-2">
              {category.child.map((child) => (
                <Link
                  key={child.label}
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground"
                >
                  {/* @ts-ignore: Implicit any */}
                  {dictionary.sidebar[child.label]}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </DrawerContent>
    </Drawer>
  );
};

export default MobileSidebar;
