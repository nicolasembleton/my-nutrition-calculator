import React from 'react';
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { NutritionTotal, FormValues } from "./types";
import { NutrientSection } from "./NutrientSection";
import { motionVariants } from "./constants";

interface NutritionReportProps {
  totalNutrition: NutritionTotal;
  onDownload: () => void;
  formValues: FormValues;
}

export const NutritionReport = ({ 
  totalNutrition, 
  onDownload, 
  formValues 
}: NutritionReportProps) => (
  <motion.div className="nutrition-label" variants={motionVariants.itemVariants}>
    <div className="nutrition-label-header">
      <h2>Nutrition Report</h2>
      <Button onClick={onDownload} className="download-button">
        Download Detailed Report
      </Button>
    </div>
    <NutrientSection 
      title="Basic Info" 
      nutrients={[{
        name: "Calories", 
        value: totalNutrition.calories, 
        unit: " cal"
      }]} 
      fullWidth 
    />
    <div className="nutrition-sections">
      <NutrientSection 
        title="Fats" 
        nutrients={[
          { name: "Total Fat", value: totalNutrition.totalFat, unit: "g" },
          { name: "Saturated Fat", value: totalNutrition.saturatedFat, unit: "g" },
          { name: "Polyunsaturated Fat", value: totalNutrition.polyunsaturatedFat, unit: "g" },
          { name: "Monounsaturated Fat", value: totalNutrition.monounsaturatedFat, unit: "g" }
        ]} 
      />
      {/* Add other nutrient sections similarly */}
    </div>
  </motion.div>
);
