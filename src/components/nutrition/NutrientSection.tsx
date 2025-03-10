import React from "react";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { NutritionDataItem } from "~/data/nutritionData";
import { ingredientLabels } from "./constants";
import { FormValues } from "./types";

interface NutrientSectionProps {
  title: string;
  formValues: FormValues;
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
  formValues,
  nutrients,
  fullWidth = false,
  showIngredientBreakdown = false,
  nutritionData,
}: NutrientSectionProps) => {
  return (
    <div className={`nutrition-section-group ${fullWidth ? "full-width" : ""}`}>
      <div className="nutrition-section-title">{title}</div>
      {nutrients.map(({ name, value, unit, nutrientKey }) => (
        <div key={name} className="nutrient">
          <span className="nutrient-name">{name}</span>
          {showIngredientBreakdown &&
          nutrientKey &&
          nutritionData &&
          formValues ? (
            <HoverCard>
              <HoverCardTrigger asChild>
                <button className="ml-1 text-xs opacity-50">
                  <QuestionMarkCircledIcon className="h-4 w-4 pr-1" />
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="grid gap-4">
                  <div className="font-bold">
                    Ingredients contributing to {name}
                  </div>
                  <ul className="m-0 list-none p-0">
                    {Object.entries(formValues)
                      .map(([key, value]) => {
                        const amount =
                          (value / 100) *
                          (nutritionData[key]?.nutrition[
                            nutrientKey as keyof (typeof nutritionData)[key]["nutrition"]
                          ] || 0);
                        const formattedAmount = amount.toFixed(2);
                        return formattedAmount !== "0.00"
                          ? { key, value: amount }
                          : null;
                      })
                      .filter(Boolean)
                      .sort((a, b) => b!.value - a!.value)
                      .map(({ key, value }) => (
                        <li
                          key={key}
                          className="flex justify-between text-sm text-muted-foreground"
                        >
                          <span>{ingredientLabels[key as string]}</span>
                          <span>
                            {value.toFixed(2)}
                            {unit}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              </HoverCardContent>
            </HoverCard>
          ) : null}
          <span className="nutrient-value">
            {value.toFixed(2)}
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
};
