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
    label: "category.info",
    child: [
      {
        label: "category.info.child.profile",
        href: "/dashboard/info/profile",
      },
      {
        label: "category.info.child.inventory",
        href: "/dashboard/info/inventory",
      },
      {
        label: "category.info.child.reputation",
        href: "/dashboard/info/reputation",
      },
      {
        label: "category.info.child.collection",
        href: "/dashboard/info/collection",
      },
      {
        label: "category.info.child.banners",
        href: "/dashboard/info/banners",
      },
      {
        label: "category.info.child.achievements",
        href: "/dashboard/info/achievements",
      },
    ],
  },
  {
    label: "category.world",
    child: [
      {
        label: "category.world.child.rating",
        href: "/dashboard/world/rating",
      },
      {
        label: "category.world.child.info",
        href: "/dashboard/world/info",
      },
    ],
  },
];
