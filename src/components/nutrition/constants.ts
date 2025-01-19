export const ingredientLabels = {
  goldenFlaxSeeds: "Golden Flax Seeds",
  rawMilkYogurt: "Raw Milk Yogurt",
  brownFlaxSeeds: "Brown Flax Seeds",
  oatmeal: "Oatmeal",
  cocoaNibs: "Cocoa Nibs",
  rawCocoaPowder: "Raw Cocoa Powder",
  almonds: "Almonds",
  gojiBerries: "Goji Berries",
  pumpkinSeeds: "Pumpkin Seeds",
  macadamiaNuts: "Macadamia Nuts",
  coconutOil: "Coconut Oil",
  hempSeedsPowder: "Hemp Seeds Powder",
  wholeMilk: "Whole Milk",
  chiaSeeds: "Chia Seeds",
  driedRaisins: "Dried Raisins",
  quinoaPowder: "Quinoa Powder",
  almondsPowder: "Almonds Powder",
  macadamiaPowder: "Macadamia Powder",
  blackBeansPowder: "Black Beans Powder",
  redBeansPowder: "Red Beans Powder",
  mungBeansPowder: "Mung Beans Powder",
  chickpeaPowder: "Chickpea Powder",
  brownRicePowder: "Brown Rice Powder",
} as {
  [key: string]: string;
};

export const ingredientCategories = {
  liquids: ["rawMilkYogurt", "wholeMilk"].sort(),
  oils: ["coconutOil"].sort(),
  carbohydrates: [
    "oatmeal",
    "brownRicePowder",
    "quinoaPowder",
    "driedRaisins",
    "chickpeaPowder",
    "blackBeansPowder",
    "redBeansPowder",
    "mungBeansPowder",
  ].sort(),
  fullSeeds: [
    "almonds",
    "brownFlaxSeeds",
    "chiaSeeds",
    "cocoaNibs",
    "gojiBerries",
    "goldenFlaxSeeds",
    "macadamiaNuts",
    "pumpkinSeeds",
  ].sort(),
  powders: [
    "almondsPowder",
    "blackBeansPowder",
    "brownRicePowder",
    "hempSeedsPowder",
    "quinoaPowder",
    "rawCocoaPowder",
    "redBeansPowder",
  ].sort(),
} as const;

export const motionVariants = {
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  itemVariants: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};
