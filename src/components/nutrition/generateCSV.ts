import { ingredientLabels } from "./constants";
import { nutritionData } from "~/data/nutritionData";
import { FormValues, IngredientKey } from "./types";

// New function to generate CSV
const generateCSV = (data: FormValues): string => {
  // Define CSV headers
  const headers = [
    "Ingredient",
    "Weight (g)",
    "Calories",
    "Total Fat (g)",
    "Saturated Fat (g)",
    "Polyunsaturated Fat (g)",
    "Monounsaturated Fat (g)",
    "Cholesterol (mg)",
    "Sodium (mg)",
    "Total Carbohydrate (g)",
    "Dietary Fiber (g)",
    "Sugars (g)",
    "Protein (g)",
    "Iron (mg)",
    "Calcium (mg)",
    "Magnesium (mg)",
    "Potassium (mg)",
    "Vitamin A (IU)",
    "Vitamin C (mg)",
    "Vitamin D (IU)",
    "Zinc (mg)",
  ].join(",");

  // Generate rows for each ingredient
  const rows = Object.entries(data).map(([ingredient, amount]) => {
    const key = ingredient as IngredientKey;
    const nutritionDataItem = nutritionData[key].nutrition;

    // Calculate contributions for each nutrient
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
      iron: (nutritionDataItem.iron / 100) * amount,
      calcium: (nutritionDataItem.calcium / 100) * amount,
      magnesium: (nutritionDataItem.magnesium / 100) * amount,
      potassium: (nutritionDataItem.potassium / 100) * amount,
      vitaminA: (nutritionDataItem.vitaminA / 100) * amount,
      vitaminC: (nutritionDataItem.vitaminC / 100) * amount,
      vitaminD: (nutritionDataItem.vitaminD / 100) * amount,
      zinc: (nutritionDataItem.zinc / 100) * amount,
    };

    return [
      ingredientLabels[key],
      amount.toFixed(1),
      ...Object.values(contributions).map((v) => v.toFixed(2)),
    ].join(",");
  });

  // Calculate and add totals row
  const totals = Object.values(data).reduce(
    (acc, amount, index) => {
      const ingredient = Object.keys(data)[index] as IngredientKey;
      const nutritionDataItem = nutritionData[ingredient].nutrition;

      acc.calories += (nutritionDataItem.calories / 100) * amount;
      acc.totalFat += (nutritionDataItem.totalFat / 100) * amount;
      acc.saturatedFat += (nutritionDataItem.saturatedFat / 100) * amount;
      acc.polyunsaturatedFat += (nutritionDataItem.polyunsaturatedFat / 100) * amount;
      acc.monounsaturatedFat += (nutritionDataItem.monounsaturatedFat / 100) * amount;
      acc.cholesterol += (nutritionDataItem.cholesterol / 100) * amount;
      acc.sodium += (nutritionDataItem.sodium / 100) * amount;
      acc.totalCarbohydrate += (nutritionDataItem.totalCarbohydrate / 100) * amount;
      acc.dietaryFiber += (nutritionDataItem.dietaryFiber / 100) * amount;
      acc.sugars += (nutritionDataItem.sugars / 100) * amount;
      acc.protein += (nutritionDataItem.protein / 100) * amount;
      acc.iron += (nutritionDataItem.iron / 100) * amount;
      acc.calcium += (nutritionDataItem.calcium / 100) * amount;
      acc.magnesium += (nutritionDataItem.magnesium / 100) * amount;
      acc.potassium += (nutritionDataItem.potassium / 100) * amount;
      acc.vitaminA += (nutritionDataItem.vitaminA / 100) * amount;
      acc.vitaminC += (nutritionDataItem.vitaminC / 100) * amount;
      acc.vitaminD += (nutritionDataItem.vitaminD / 100) * amount;
      acc.zinc += (nutritionDataItem.zinc / 100) * amount;

      return acc;
    },
    {
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
    }
  );

  const totalsRow = [
    "TOTALS",
    Object.values(data)
      .reduce((sum, val) => sum + val, 0)
      .toFixed(1),
    ...Object.values(totals).map((v) => v.toFixed(2)),
  ].join(",");

  // Combine all parts
  return [headers, ...rows, totalsRow].join("\n");
};

// Function to handle CSV download
export const downloadCSV = (data: FormValues) => {
  const csv = generateCSV(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "nutrition_report.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
