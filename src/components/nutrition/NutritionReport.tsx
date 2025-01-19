import { motion } from "framer-motion";
import React from "react";
import { Button } from "~/components/ui/button";
import { motionVariants } from "./constants";
import { NutrientSection } from "./NutrientSection";
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
    className="nutrition-label -z-10"
    variants={motionVariants.itemVariants}
  >
    <div className="nutrition-label-header">
      <h2>Nutrition Report</h2>
      <Button onClick={onDownload} className="download-button">
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

      {/* Carbs Section - Second Column */}
      <div className="nutrition-section-group">
        <div className="nutrition-section-title">Carbohydrates</div>
        <div className="nutrient">
          <span className="nutrient-name">Total Carbohydrate</span>
          <span className="nutrient-value">
            {totalNutrition.totalCarbohydrate.toFixed(2)}g
          </span>
        </div>
        <div className="nutrient">
          <span className="nutrient-name">Dietary Fiber</span>
          <span className="nutrient-value">
            {totalNutrition.dietaryFiber.toFixed(2)}g
          </span>
        </div>
        <div className="nutrient">
          <span className="nutrient-name">Sugars</span>
          <span className="nutrient-value">
            {totalNutrition.sugars.toFixed(2)}g
          </span>
        </div>
      </div>

      {/* Protein Section - Full Width */}
      <div className="nutrition-section-group full-width">
        <div className="nutrition-section-title">Protein</div>
        <div className="nutrient">
          <span className="nutrient-name">Protein</span>
          <span className="nutrient-value">
            {totalNutrition.protein.toFixed(2)}g
          </span>
        </div>
      </div>

      {/* Minerals Section - First Column */}
      <div className="nutrition-section-group">
        <div className="nutrition-section-title">Minerals</div>
        <div className="nutrient">
          <span className="nutrient-name">Sodium</span>
          <span className="nutrient-value">
            {totalNutrition.sodium.toFixed(2)}mg
          </span>
        </div>
        <div className="nutrient">
          <span className="nutrient-name">Iron</span>
          <span className="nutrient-value">
            {totalNutrition.iron.toFixed(2)}mg
          </span>
        </div>
        <div className="nutrient">
          <span className="nutrient-name">Calcium</span>
          <span className="nutrient-value">
            {totalNutrition.calcium.toFixed(2)}mg
          </span>
        </div>
        <div className="nutrient">
          <span className="nutrient-name">Magnesium</span>
          <span className="nutrient-value">
            {totalNutrition.magnesium.toFixed(2)}mg
          </span>
        </div>
        <div className="nutrient">
          <span className="nutrient-name">Potassium</span>
          <span className="nutrient-value">
            {totalNutrition.potassium.toFixed(2)}mg
          </span>
        </div>
        <div className="nutrient">
          <span className="nutrient-name">Zinc</span>
          <span className="nutrient-value">
            {totalNutrition.zinc.toFixed(2)}mg
          </span>
        </div>
      </div>

      {/* Vitamins Section - Second Column */}
      <div className="nutrition-section-group">
        <div className="nutrition-section-title">Vitamins</div>
        <div className="nutrient">
          <span className="nutrient-name">Vitamin A</span>
          <span className="nutrient-value">
            {totalNutrition.vitaminA.toFixed(2)}IU
          </span>
        </div>
        <div className="nutrient">
          <span className="nutrient-name">Vitamin C</span>
          <span className="nutrient-value">
            {totalNutrition.vitaminC.toFixed(2)}mg
          </span>
        </div>
        <div className="nutrient">
          <span className="nutrient-name">Vitamin D</span>
          <span className="nutrient-value">
            {totalNutrition.vitaminD.toFixed(2)}IU
          </span>
        </div>
      </div>
    </div>
  </motion.div>
);
