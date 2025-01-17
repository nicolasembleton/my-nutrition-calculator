export type IngredientKey =
  | "goldenFlaxSeeds"
  | "brownFlaxSeeds"
  | "oatmeal"
  | "cocoaNibs"
  | "rawCocoaPowder"
  | "almonds"
  | "gojiBerries"
  | "pumpkinSeeds"
  | "macadamiaNuts"
  | "coconutOil"
  | "hempSeedsPowder"
  | "wholeMilk"
  | "chiaSeeds"
  | "driedRaisins"
  | "quinoaPowder"
  | "almondsPowder"
  | "macadamiaPowder"
  | "blackBeansPowder"
  | "redBeansPowder"
  | "mungBeansPowder"
  | "chickpeaPowder"
  | "brownRicePowder";

export interface NutritionInfo {
  calories: number;
  totalFat: number;
  saturatedFat: number;
  polyunsaturatedFat: number;
  monounsaturatedFat: number;
  cholesterol: number;
  sodium: number;
  totalCarbohydrate: number;
  dietaryFiber: number;
  sugars: number;
  protein: number;
  iron: number;
  calcium: number;
  magnesium: number;
  potassium: number;
  vitaminA: number;
  vitaminC: number;
  vitaminD: number;
  zinc: number;
}

export interface IngredientData {
  defaultValue: number;
  nutrition: NutritionInfo;
}

export const nutritionData: Record<IngredientKey, IngredientData>;
