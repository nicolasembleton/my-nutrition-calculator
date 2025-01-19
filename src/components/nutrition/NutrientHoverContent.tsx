import React from "react";
import { IngredientKey } from "./types";
import { ingredientLabels } from "./constants";
import { NutritionDataItem } from "~/data/nutritionData";

interface NutrientHoverContentProps {
  ingredient: IngredientKey;
  value: number;
  nutritionData: Record<IngredientKey, NutritionDataItem>;
}

export const NutrientHoverContent = ({
  ingredient,
  value,
  nutritionData,
}: NutrientHoverContentProps) => (
  <div className="nutrient-hover-sections">
    <div className="nutrient-section-group full-width">
      <div className="nutrient-section-title">Basic Info</div>
      <div className="nutrient-hover-item">
        <span className="nutrient-name">Calories:</span>
        <span className="nutrient-value">
          {(
            (nutritionData[ingredient].nutrition.calories / 100) *
            value
          ).toFixed(2)}
        </span>
      </div>
    </div>
  </div>
);
