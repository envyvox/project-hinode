import { Location } from "@prisma/client";

type LocationAction = {
  image: string;
  label: string;
  description: string;
  buttonLabel: string;
  handler: () => void;
};

type LocationActions = {
  [key in Location]: LocationAction[];
};

export const locationActions: LocationActions = {
  Capital: [
    {
      image: "ShopSeed",
      label: "Action label",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices nunc turpis, non consequat odio consequat a. Proin felis sapien, sagittis ac neque et, consequat lobortis est. In vel purus et magna vestibulum venenatis. Curabitur dictum est sed eleifend pulvinar.",
      buttonLabel: "Action button label",
      handler: () => {},
    },
    {
      image: "Market",
      label: "Action label 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices nunc turpis, non consequat odio consequat a. Proin felis sapien, sagittis ac neque et, consequat lobortis est. In vel purus et magna vestibulum venenatis. Curabitur dictum est sed eleifend pulvinar.",
      buttonLabel: "Action button label",
      handler: () => {},
    },
    {
      image: "",
      label: "Action label 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices nunc turpis, non consequat odio consequat a. Proin felis sapien, sagittis ac neque et, consequat lobortis est. In vel purus et magna vestibulum venenatis. Curabitur dictum est sed eleifend pulvinar.",
      buttonLabel: "Action button label",
      handler: () => {},
    },
  ],
  Garden: [
    {
      image: "ShopRecipe",
      label: "Action label",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices nunc turpis, non consequat odio consequat a. Proin felis sapien, sagittis ac neque et, consequat lobortis est. In vel purus et magna vestibulum venenatis. Curabitur dictum est sed eleifend pulvinar.",
      buttonLabel: "Action button label",
      handler: () => {},
    },
    {
      image: "",
      label: "Action label 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices nunc turpis, non consequat odio consequat a. Proin felis sapien, sagittis ac neque et, consequat lobortis est. In vel purus et magna vestibulum venenatis. Curabitur dictum est sed eleifend pulvinar.",
      buttonLabel: "Action button label",
      handler: () => {},
    },
    {
      image: "",
      label: "Action label 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices nunc turpis, non consequat odio consequat a. Proin felis sapien, sagittis ac neque et, consequat lobortis est. In vel purus et magna vestibulum venenatis. Curabitur dictum est sed eleifend pulvinar.",
      buttonLabel: "Action button label",
      handler: () => {},
    },
  ],
  Seaport: [
    {
      image: "Fisher",
      label: "Action label",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices nunc turpis, non consequat odio consequat a. Proin felis sapien, sagittis ac neque et, consequat lobortis est. In vel purus et magna vestibulum venenatis. Curabitur dictum est sed eleifend pulvinar.",
      buttonLabel: "Action button label",
      handler: () => {},
    },
    {
      image: "",
      label: "Action label 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices nunc turpis, non consequat odio consequat a. Proin felis sapien, sagittis ac neque et, consequat lobortis est. In vel purus et magna vestibulum venenatis. Curabitur dictum est sed eleifend pulvinar.",
      buttonLabel: "Action button label",
      handler: () => {},
    },
    {
      image: "",
      label: "Action label 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices nunc turpis, non consequat odio consequat a. Proin felis sapien, sagittis ac neque et, consequat lobortis est. In vel purus et magna vestibulum venenatis. Curabitur dictum est sed eleifend pulvinar.",
      buttonLabel: "Action button label",
      handler: () => {},
    },
  ],
  Castle: [
    {
      image: "",
      label: "Action label",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices nunc turpis, non consequat odio consequat a. Proin felis sapien, sagittis ac neque et, consequat lobortis est. In vel purus et magna vestibulum venenatis. Curabitur dictum est sed eleifend pulvinar.",
      buttonLabel: "Action button label",
      handler: () => {},
    },
    {
      image: "",
      label: "Action label 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices nunc turpis, non consequat odio consequat a. Proin felis sapien, sagittis ac neque et, consequat lobortis est. In vel purus et magna vestibulum venenatis. Curabitur dictum est sed eleifend pulvinar.",
      buttonLabel: "Action button label",
      handler: () => {},
    },
  ],
  Village: [
    {
      image: "ShopProduct",
      label: "Action label",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices nunc turpis, non consequat odio consequat a. Proin felis sapien, sagittis ac neque et, consequat lobortis est. In vel purus et magna vestibulum venenatis. Curabitur dictum est sed eleifend pulvinar.",
      buttonLabel: "Action button label",
      handler: () => {},
    },
    {
      image: "",
      label: "Action label 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices nunc turpis, non consequat odio consequat a. Proin felis sapien, sagittis ac neque et, consequat lobortis est. In vel purus et magna vestibulum venenatis. Curabitur dictum est sed eleifend pulvinar.",
      buttonLabel: "Action button label",
      handler: () => {},
    },
    {
      image: "",
      label: "Action label 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices nunc turpis, non consequat odio consequat a. Proin felis sapien, sagittis ac neque et, consequat lobortis est. In vel purus et magna vestibulum venenatis. Curabitur dictum est sed eleifend pulvinar.",
      buttonLabel: "Action button label",
      handler: () => {},
    },
    {
      image: "",
      label: "Action label 4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices nunc turpis, non consequat odio consequat a. Proin felis sapien, sagittis ac neque et, consequat lobortis est. In vel purus et magna vestibulum venenatis. Curabitur dictum est sed eleifend pulvinar.",
      buttonLabel: "Action button label",
      handler: () => {},
    },
  ],
  InTransit: [],
  ExploreGarden: [],
  ExploreCastle: [],
  Fishing: [],
  FieldWatering: [],
  WorkOnContract: [],
};
