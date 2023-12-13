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
    label: "category.dashboard",
    child: [
      {
        label: "category.dashboard",
        href: "/dashboard",
      },
    ],
  },
  {
    label: "category.info",
    child: [
      {
        label: "category.info.child.profile",
        href: "/dashboard/user/profile",
      },
      {
        label: "category.info.child.inventory",
        href: "/dashboard/user/inventory",
      },
      {
        label: "category.info.child.reputation",
        href: "/dashboard/user/reputation",
      },
      {
        label: "category.info.child.collection",
        href: "/dashboard/user/collection",
      },
      {
        label: "category.info.child.banners",
        href: "/dashboard/user/banners",
      },
      {
        label: "category.info.child.achievements",
        href: "/dashboard/user/achievements",
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
