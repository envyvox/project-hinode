"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDictionaryStore } from "@/store/dictionary-store";

import { sidebarCategories } from "@/config/sidebar";
import { cn } from "@/lib/utils";

import { buttonVariants } from "./ui/button";

type Props = {
  className?: string;
};

const DesktopSidebar = ({ className }: Props) => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const pathName = usePathname();

  return (
    <div className={cn("pb-12 pt-6", className)}>
      <div className="space-y-4">
        {sidebarCategories.map((category) => (
          <div key={category.label} className="py-2 pr-4">
            <h2 className="mb-2 text-lg font-semibold tracking-tight">
              {/* @ts-ignore: Implicit any */}
              {dictionary.sidebar[category.label]}
            </h2>
            <div className="space-y-1">
              {category.child.map((child) => (
                <Link
                  key={child.label}
                  href={child.href}
                  className={cn(
                    buttonVariants({
                      variant: pathName === child.href ? "secondary" : "ghost",
                    }),
                    "-ml-4 w-full justify-start"
                  )}
                >
                  {/* @ts-ignore: Implicit any */}
                  {dictionary.sidebar[child.label]}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopSidebar;
