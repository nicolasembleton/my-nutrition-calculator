import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { ingredientLabels, motionVariants } from "./constants";
import { NutrientSection } from "./NutrientSection";
import { nutritionData } from "~/data/nutritionData";
import { FormValues, NutritionTotal } from "./types";

interface NutritionReportProps {
  totalNutrition: NutritionTotal;
  onDownload: () => void;
  formValues: FormValues;
}

export const NutritionReport = ({
  totalNutrition,
  onDownload,
  formValues,
}: NutritionReportProps) => (
  <motion.div
    className="nutrition-label"
    variants={motionVariants.itemVariants}
  >
    <div className="nutrition-label-header">
      <h2>Nutrition Report</h2>
      <Button onClick={onDownload} className="download-button" size="sm">
        Download Detailed Report
      </Button>
    </div>
    <NutrientSection
      title="Basic Info"
      formValues={formValues}
      nutrients={[
        {
          name: "Calories",
          value: totalNutrition.calories,
          unit: " cal",
          nutrientKey: "calories",
        },
      ]}
      fullWidth
      showIngredientBreakdown={true}
      nutritionData={nutritionData}
    />
    <div className="nutrition-sections">
      <NutrientSection
        title="Fats"
        formValues={formValues}
        nutrients={[
          { name: "Total Fat", value: totalNutrition.totalFat, unit: "g", nutrientKey: "totalFat" },
          {
            name: "Saturated Fat",
            value: totalNutrition.saturatedFat,
            unit: "g",
            nutrientKey: "saturatedFat",
          },
          {
            name: "Polyunsaturated Fat",
            value: totalNutrition.polyunsaturatedFat,
            unit: "g",
            nutrientKey: "polyunsaturatedFat",
          },
          {
            name: "Monounsaturated Fat",
            value: totalNutrition.monounsaturatedFat,
            unit: "g",
            nutrientKey: "monounsaturatedFat",
          },
        ]}
        showIngredientBreakdown={true}
        nutritionData={nutritionData}
      />
      <NutrientSection
        title="Carbohydrates"
        formValues={formValues}
        nutrients={[
          {
            name: "Total Carbohydrate",
            value: totalNutrition.totalCarbohydrate,
            unit: "g",
            nutrientKey: "totalCarbohydrate",
          },
          {
            name: "Dietary Fiber",
            value: totalNutrition.dietaryFiber,
            unit: "g",
            nutrientKey: "dietaryFiber",
          },
          { name: "Sugars", value: totalNutrition.sugars, unit: "g", nutrientKey: "sugars" },
        ]}
        showIngredientBreakdown={true}
        nutritionData={nutritionData}
      />
      <NutrientSection
        title="Protein"
        formValues={formValues}
        nutrients={[
          { name: "Protein", value: totalNutrition.protein, unit: "g", nutrientKey: "protein" },
        ]}
        fullWidth
        showIngredientBreakdown={true}
        nutritionData={nutritionData}
      />
      <NutrientSection
        title="Minerals"
        formValues={formValues}
        nutrients={[
          { name: "Sodium", value: totalNutrition.sodium, unit: "mg", nutrientKey: "sodium" },
          { name: "Iron", value: totalNutrition.iron, unit: "mg", nutrientKey: "iron" },
          { name: "Calcium", value: totalNutrition.calcium, unit: "mg", nutrientKey: "calcium" },
          { name: "Magnesium", value: totalNutrition.magnesium, unit: "mg", nutrientKey: "magnesium" },
          { name: "Potassium", value: totalNutrition.potassium, unit: "mg", nutrientKey: "potassium" },
          { name: "Zinc", value: totalNutrition.zinc, unit: "mg", nutrientKey: "zinc" },
        ]}
        showIngredientBreakdown={true}
        nutritionData={nutritionData}
      />
      <NutrientSection
        title="Vitamins"
        formValues={formValues}
        nutrients={[
          { name: "Vitamin A", value: totalNutrition.vitaminA, unit: "IU", nutrientKey: "vitaminA" },
          { name: "Vitamin C", value: totalNutrition.vitaminC, unit: "mg", nutrientKey: "vitaminC" },
          { name: "Vitamin D", value: totalNutrition.vitaminD, unit: "IU", nutrientKey: "vitaminD" },
        ]}
        showIngredientBreakdown={true}
        nutritionData={nutritionData}
      />
    </div>
  </motion.div>
);
