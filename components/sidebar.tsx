"use client";

import Link from "next/link";
import { useDictionaryStore } from "@/store/dictionary-store";

import { sidebarCategories } from "@/config/sidebar";

import { ScrollArea } from "./ui/scroll-area";

const Sidebar = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);

  return (
    <div className="fixed top-14 z-30 -ml-2 hidden w-full shrink-0 md:sticky md:block">
      <ScrollArea className="h-full">
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
                  className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                >
                  {/* @ts-ignore: Implicit any */}
                  {dictionary.sidebar[child.label]}
                </Link>
              </div>
            ))}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
