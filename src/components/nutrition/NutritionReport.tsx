import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { ingredientLabels, motionVariants } from "./constants";
import { NutrientSection } from "./NutrientSection";
import { FormValues, NutritionTotal } from "./types";

interface NutritionReportProps {
  totalNutrition: NutritionTotal;
  onDownload: () => void;
}

export const NutritionReport = ({
  totalNutrition,
  onDownload,
}: NutritionReportProps) => (
  <motion.div
    className="nutrition-label -z-10"
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
      nutrients={[
        {
          name: "Calories",
          value: totalNutrition.calories,
          unit: " cal",
        },
      ]}
      fullWidth
    />
    <div className="nutrition-sections">
      <NutrientSection
        title="Fats"
        nutrients={[
          { name: "Total Fat", value: totalNutrition.totalFat, unit: "g" },
          {
            name: "Saturated Fat",
            value: totalNutrition.saturatedFat,
            unit: "g",
          },
          {
            name: "Polyunsaturated Fat",
            value: totalNutrition.polyunsaturatedFat,
            unit: "g",
          },
          {
            name: "Monounsaturated Fat",
            value: totalNutrition.monounsaturatedFat,
            unit: "g",
          },
        ]}
      />
      <NutrientSection
        title="Carbohydrates"
        nutrients={[
          {
            name: "Total Carbohydrate",
            value: totalNutrition.totalCarbohydrate,
            unit: "g",
          },
          {
            name: "Dietary Fiber",
            value: totalNutrition.dietaryFiber,
            unit: "g",
          },
          { name: "Sugars", value: totalNutrition.sugars, unit: "g" },
        ]}
      />
      <NutrientSection
        title="Protein"
        nutrients={[
          { name: "Protein", value: totalNutrition.protein, unit: "g" },
        ]}
        fullWidth
      />
      <NutrientSection
        title="Minerals"
        nutrients={[
          { name: "Sodium", value: totalNutrition.sodium, unit: "mg" },
          { name: "Iron", value: totalNutrition.iron, unit: "mg" },
          { name: "Calcium", value: totalNutrition.calcium, unit: "mg" },
          { name: "Magnesium", value: totalNutrition.magnesium, unit: "mg" },
          { name: "Potassium", value: totalNutrition.potassium, unit: "mg" },
          { name: "Zinc", value: totalNutrition.zinc, unit: "mg" },
        ]}
      />
      <NutrientSection
        title="Vitamins"
        nutrients={[
          { name: "Vitamin A", value: totalNutrition.vitaminA, unit: "IU" },
          { name: "Vitamin C", value: totalNutrition.vitaminC, unit: "mg" },
          { name: "Vitamin D", value: totalNutrition.vitaminD, unit: "IU" },
        ]}
      />
    </div>
  </motion.div>
);
