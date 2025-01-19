import React from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { Input } from "~/components/ui/input";
import { NutritionDataItem } from "~/data/nutritionData";
import { NutrientHoverContent } from "./NutrientHoverContent";
import { IngredientKey } from "./types";

interface IngredientValueProps {
  ingredient: IngredientKey;
  nutritionData: any;
  value: number | "";
  defaultValue: number;
  onChange: (value: number) => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const IngredientValue = ({
  ingredient,
  nutritionData,
  value,
  defaultValue,
  onChange,
  onInputChange,
}: IngredientValueProps) => (
  <div className="flex flex-row items-center justify-between">
    <div className="flex items-center space-x-2">
      <Input
        type="number"
        step="0.1"
        min="0"
        max={nutritionData[ingredient].maxValue ?? defaultValue * 10}
        placeholder={defaultValue.toFixed(1)}
        value={typeof value === "number" ? value.toFixed(1) : value}
        onChange={onInputChange}
      />
    </div>
    <div className="calorie-indicator">
      <span className="after:content-['cal']">
        {(
          (nutritionData[ingredient].nutrition.calories / 100) *
          Number(value)
        ).toFixed(1)}{" "}
      </span>
      <HoverCard>
        <HoverCardTrigger asChild>
          <button className="info-button">
            <InfoCircledIcon className="info-icon" />
          </button>
        </HoverCardTrigger>
        <HoverCardContent
          className="nutrient-hover-content w-auto"
          side="right"
        >
          <NutrientHoverContent
            ingredient={ingredient}
            value={Number(value)}
            nutritionData={nutritionData}
          />
        </HoverCardContent>
      </HoverCard>
    </div>
  </div>
);
