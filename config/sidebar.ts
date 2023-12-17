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
    label: "category.user",
    child: [
      {
        label: "category.user.child.profile",
        href: "/dashboard/user/profile",
      },
      {
        label: "category.user.child.inventory",
        href: "/dashboard/user/inventory",
      },
      {
        label: "category.user.child.reputation",
        href: "/dashboard/user/reputation",
      },
      {
        label: "category.user.child.collection",
        href: "/dashboard/user/collection",
      },
      {
        label: "category.user.child.titles",
        href: "/dashboard/user/titles",
      },
      {
        label: "category.user.child.banners",
        href: "/dashboard/user/banners",
      },
      {
        label: "category.user.child.achievements",
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
