import React from "react";
import { NutritionDataItem, NutritionKey } from "~/data/nutritionData";
import { IngredientKey } from "./types";

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
          {" cal"}
        </span>
      </div>
    </div>

    {/* Fats Section */}
    <div className="nutrient-section-group">
      <div className="nutrient-section-title">Fats</div>
      {[
        ["Total Fat", "totalFat", "g"],
        ["Saturated Fat", "saturatedFat", "g"],
        ["Polyunsaturated Fat", "polyunsaturatedFat", "g"],
        ["Monounsaturated Fat", "monounsaturatedFat", "g"],
      ].map(([label, nutrientKey, unit]) => (
        <div key={nutrientKey} className="nutrient-hover-item">
          <span className="nutrient-name">{label}:</span>
          <span className="nutrient-value">
            {(
              (nutritionData[ingredient].nutrition[
                nutrientKey as NutritionKey
              ] /
                100) *
              value
            ).toFixed(2)}
            {unit}
          </span>
        </div>
      ))}
    </div>

    {/* Carbs Section */}
    <div className="nutrient-section-group">
      <div className="nutrient-section-title">Carbohydrates</div>
      {[
        ["Total Carbohydrate", "totalCarbohydrate", "g"],
        ["Dietary Fiber", "dietaryFiber", "g"],
        ["Sugars", "sugars", "g"],
      ].map(([label, nutrientKey, unit]) => (
        <div key={nutrientKey} className="nutrient-hover-item">
          <span className="nutrient-name">{label}:</span>
          <span className="nutrient-value">
            {(
              (nutritionData[ingredient].nutrition[
                nutrientKey as NutritionKey
              ] /
                100) *
              value
            ).toFixed(2)}
            {unit}
          </span>
        </div>
      ))}
    </div>

    {/* Protein Section */}
    <div className="nutrient-section-group">
      <div className="nutrient-section-title">Protein</div>
      <div className="nutrient-hover-item">
        <span className="nutrient-name">Protein:</span>
        <span className="nutrient-value">
          {(
            (nutritionData[ingredient].nutrition["protein" as NutritionKey] /
              100) *
            value
          ).toFixed(2)}
          g
        </span>
      </div>
    </div>

    <div className="nutrient-section-group">
      <div className="nutrient-section-title">Minerals</div>
      {[
        ["Sodium", "sodium", "mg"],
        ["Iron", "iron", "mg"],
        ["Calcium", "calcium", "mg"],
        ["Magnesium", "magnesium", "mg"],
        ["Potassium", "potassium", "mg"],
        ["Zinc", "zinc", "mg"],
      ].map(([label, nutrientKey, unit]) => (
        <div key={nutrientKey} className="nutrient-hover-item">
          <span className="nutrient-name">{label}:</span>
          <span className="nutrient-value">
            {(
              (nutritionData[ingredient].nutrition[
                nutrientKey as NutritionKey
              ] /
                100) *
              value
            ).toFixed(2)}
            {unit}
          </span>
        </div>
      ))}
    </div>
    <div className="nutrient-section-group">
      <div className="nutrient-section-title">Vitamins</div>
      {[
        ["Vitamin A", "vitaminA", "IU"],
        ["Vitamin C", "vitaminC", "mg"],
        ["Vitamin D", "vitaminD", "IU"],
      ].map(([label, nutrientKey, unit]) => (
        <div key={nutrientKey} className="nutrient-hover-item">
          <span className="nutrient-name">{label}:</span>
          <span className="nutrient-value">
            {(
              (nutritionData[ingredient].nutrition[
                nutrientKey as NutritionKey
              ] /
                100) *
              value
            ).toFixed(2)}
            {unit}
          </span>
        </div>
      ))}
    </div>
  </div>
);
