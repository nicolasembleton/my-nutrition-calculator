import { nutritionData } from "~/data/nutritionData";
import { FormValues, NutritionTotal, IngredientKey } from "./types";

export const calculateNutrition = (data: FormValues): NutritionTotal => {
  const nutrition: NutritionTotal = {
    calories: 0,
    totalFat: 0,
    saturatedFat: 0,
    polyunsaturatedFat: 0,
    monounsaturatedFat: 0,
    cholesterol: 0,
    sodium: 0,
    totalCarbohydrate: 0,
    dietaryFiber: 0,
    sugars: 0,
    protein: 0,
    iron: 0,
    calcium: 0,
    magnesium: 0,
    potassium: 0,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    zinc: 0,
  };

  Object.keys(data).forEach((ingredient) => {
    const amount = data[ingredient];
    const key = ingredient as IngredientKey;
    const nutritionDataItem = nutritionData[key].nutrition;

    if (!isNaN(amount)) {
      // Calculate each nutrient contribution
      const contributions = {
        calories: (nutritionDataItem.calories / 100) * amount,
        totalFat: (nutritionDataItem.totalFat / 100) * amount,
        saturatedFat: (nutritionDataItem.saturatedFat / 100) * amount,
        polyunsaturatedFat: (nutritionDataItem.polyunsaturatedFat / 100) * amount,
        monounsaturatedFat: (nutritionDataItem.monounsaturatedFat / 100) * amount,
        cholesterol: (nutritionDataItem.cholesterol / 100) * amount,
        sodium: (nutritionDataItem.sodium / 100) * amount,
        totalCarbohydrate: (nutritionDataItem.totalCarbohydrate / 100) * amount,
        dietaryFiber: (nutritionDataItem.dietaryFiber / 100) * amount,
        sugars: (nutritionDataItem.sugars / 100) * amount,
        protein: (nutritionDataItem.protein / 100) * amount,
        iron: (nutritionDataItem.iron / 100) * amount || 0,
        calcium: (nutritionDataItem.calcium / 100) * amount || 0,
        magnesium: (nutritionDataItem.magnesium / 100) * amount || 0,
        potassium: (nutritionDataItem.potassium / 100) * amount || 0,
        vitaminA: (nutritionDataItem.vitaminA / 100) * amount || 0,
        vitaminC: (nutritionDataItem.vitaminC / 100) * amount || 0,
        vitaminD: (nutritionDataItem.vitaminD / 100) * amount || 0,
        zinc: (nutritionDataItem.zinc / 100) * amount || 0,
      };

      // Add to running totals
      Object.entries(contributions).forEach(([nutrient, value]) => {
        nutrition[nutrient as keyof NutritionTotal] += value;
      });
    }
  });

  return nutrition;
};
