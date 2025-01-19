import React from "react";

interface NutrientSectionProps {
  title: string;
  nutrients: Array<{
    name: string;
    value: number;
    unit: string;
  }>;
  fullWidth?: boolean;
}

export const NutrientSection = ({
  title,
  nutrients,
  fullWidth = false,
}: NutrientSectionProps) => (
  <div className={`nutrition-section-group ${fullWidth ? "full-width" : ""}`}>
    <div className="nutrition-section-title">{title}</div>
    {nutrients.map(({ name, value, unit }) => (
      <div key={name} className="nutrient">
        <span className="nutrient-name">{name}</span>
        <span className="nutrient-value">
          {value.toFixed(2)}
          {unit}
        </span>
      </div>
    ))}
  </div>
);
