import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Slider } from "~/components/ui/slider";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { IngredientValue } from "./IngredientValue";
import { NutrientHoverContent } from "./NutrientHoverContent";
import { nutritionData } from "~/data/nutritionData";
import { ingredientLabels } from "./constants";
import { IngredientKey } from "./types";

interface IngredientFormItemProps {
  ingredient: IngredientKey;
  field: any; //  Type this properly later
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void
  ) => void;
}

const IngredientFormItem: React.FC<IngredientFormItemProps> = ({
  ingredient,
  field,
  handleInputChange,
}) => {
  const key = ingredient;
  return (
    <FormField
      key={key}
      name={key}
      // control={form.control}  -- removed
      render={() => (
        <FormItem>
          <div className="ingredient-cell">
            <div className="calorie-indicator">
              {(
                (nutritionData[key].nutrition.calories / 100) *
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
                  <NutrientHoverContent
                    ingredient={key}
                    value={field.value}
                    nutritionData={nutritionData}
                  />
                </HoverCardContent>
              </HoverCard>
            </div>
            <FormLabel>{ingredientLabels[key]}</FormLabel>
            <div className="space-x-2 flex items-center">
              <IngredientValue
                value={field.value}
                defaultValue={nutritionData[key].defaultValue}
                onChange={(val) => field.onChange(val)}
                onInputChange={(e) => handleInputChange(e, field.onChange)}
              />
            </div>

            <div className="slider-container">
              <Slider
                min={0}
                max={Math.max(10, nutritionData[key].defaultValue * 3)}
                step={0.1}
                value={[field.value]}
                onValueChange={(vals) => field.onChange(vals[0])}
              />
            </div>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default IngredientFormItem;
