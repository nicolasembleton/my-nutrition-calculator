import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/ui/hover-card";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { ingredientLabels } from "./constants";

interface NutrientSectionProps {
  title: string;
  nutrients: Array<{
    name: string;
    value: number;
    unit: string;
    nutrientKey?: keyof NutritionDataItem["nutrition"];
  }>;
  fullWidth?: boolean;
  showIngredientBreakdown?: boolean;
  nutritionData?: Record<string, NutritionDataItem>;
}

export const NutrientSection = ({
  title,
  nutrients,
  fullWidth = false,
  showIngredientBreakdown = false,
  nutritionData,
}: NutrientSectionProps) => (
  <div className={`nutrition-section-group ${fullWidth ? "full-width" : ""}`}>
    <div className="nutrition-section-title">{title}</div>
    {nutrients.map(({ name, value, unit, nutrientKey }) => (
      <div key={name} className="nutrient">
        <span className="nutrient-name">{name}</span>
        {showIngredientBreakdown && nutrientKey && nutritionData && (
          <HoverCard>
            <HoverCardTrigger asChild>
              <button className="ml-1 text-xs opacity-50">
                <QuestionMarkCircledIcon className="h-4 w-4" />
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="grid gap-4">
                <div className="font-bold">Ingredients contributing to {name}</div>
                <div className="text-sm text-muted-foreground">
                  {Object.entries(nutritionData)
                    .filter(([_, data]) => data.nutrition[nutrientKey as keyof typeof data.nutrition] > 0)
                    .map(([key, data]) => (
                      <div key={key} className="flex justify-between">
                        <span>{ingredientLabels[key]}</span>
                        <span>{(data.nutrition[nutrientKey as keyof typeof data.nutrition] * (value / Object.values(nutritionData).reduce((sum, item) => sum + item.nutrition[nutrientKey as keyof typeof item.nutrition], 0))).toFixed(2)}{unit}</span>
                      </div>
                    ))}
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        )}
        <span className="nutrient-value">
          {value.toFixed(2)}
          {unit}
        </span>
      </div>
    ))}
  </div>
);
