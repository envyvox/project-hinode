type SidebarCategory = {
  label: string;
  child: SidebarChildCategory[];
};

type SidebarChildCategory = {
  label: string;
  href: string;
};

/**
 * Categories and links that displayed in sidebar
 */
export const sidebarCategories: SidebarCategory[] = [
  {
    label: "Info",
    child: [
      {
        label: "Profile",
        href: "/dashboard/info/profile",
      },
      {
        label: "Inventory",
        href: "/dashboard/info/inventory",
      },
      {
        label: "Reputation",
        href: "/dashboard/info/reputation",
      },
      {
        label: "Collection",
        href: "/dashboard/info/collection",
      },
      {
        label: "Banners",
        href: "/dashboard/info/banners",
      },
      {
        label: "Achievements",
        href: "/dashboard/info/achievements",
      },
    ],
  },
  {
    label: "World",
    child: [
      {
        label: "Rating",
        href: "/dashboard/world/rating",
      },
      {
        label: "Info",
        href: "/dashboard/world/info",
      },
    ],
  },
];
