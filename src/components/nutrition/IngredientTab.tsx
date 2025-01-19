import React from "react";
import { Control, Controller } from "react-hook-form";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { TabsContent } from "~/components/ui/tabs";
import { NutritionDataItem } from "~/data/nutritionData";
import { ingredientLabels } from "./constants";
import { IngredientValue } from "./IngredientValue";
import { NutrientHoverContent } from "./NutrientHoverContent";
import { IngredientKey } from "./types";

interface IngredientTabProps {
  value: string;
  ingredients: IngredientKey[];
  control: Control<any>;
  nutritionData: Record<IngredientKey, NutritionDataItem>;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void
  ) => void;
}

export const IngredientTab = ({
  value,
  ingredients,
  control,
  nutritionData,
  handleInputChange,
}: IngredientTabProps) => (
  <TabsContent value={value} className="ingredient-grid">
    {ingredients.map((ingredient) => (
      <Controller
        key={ingredient}
        name={ingredient}
        control={control}
        render={({ field }) => (
          <div className="ingredient-cell">
            <div className="calorie-indicator">
              {(
                (nutritionData[ingredient].nutrition.calories / 100) *
                field.value
              ).toFixed(1)}{" "}
              cal
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button className="info-button">
                    <InfoCircledIcon className="info-icon" />
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="nutrient-hover-content w-auto">
                  <h4>{ingredientLabels[ingredient]} Nutrition</h4>
                  <NutrientHoverContent
                    ingredient={ingredient}
                    value={field.value}
                    nutritionData={nutritionData}
                  />
                </HoverCardContent>
              </HoverCard>
            </div>
            <label>{ingredientLabels[ingredient]}</label>
            <IngredientValue
              value={field.value}
              defaultValue={nutritionData[ingredient].defaultValue}
              onChange={field.onChange}
              ingredient={ingredient}
              nutritionData={nutritionData[ingredient]}
              onInputChange={(e) => {
                handleInputChange(e, field.onChange);
                field.onChange(parseFloat(e.target.value) || 0);
              }}
            />
          </div>
        )}
      />
    ))}
  </TabsContent>
);
