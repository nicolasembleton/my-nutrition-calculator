import { nutritionData } from "~/data/nutritionData";

export interface NutritionTotal {
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

export type IngredientKey = keyof typeof nutritionData;
export type FormValues = Record<IngredientKey, number>;
