"use client";

import { useSession } from "next-auth/react";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";
import { sidebarCategories } from "@/config/sidebar";

export default function Sidebar() {
  const { data: session } = useSession();

  return session ? (
    <div className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
      <ScrollArea className="h-full py-6 lg:py-8">
        {sidebarCategories.map((category) => (
          <div key={category.label} className="pb-4">
            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
              {category.label}
            </h4>
            {category.child.map((child) => (
              <div key={child.label} className="flex flex-col gap-1 text-sm">
                <Link
                  href={child.href}
                  className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                >
                  {child.label}
                </Link>
              </div>
            ))}
          </div>
        ))}
      </ScrollArea>
    </div>
  ) : null;
}
