import React from "react";
import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel } from "~/components/ui/form";
import { Slider } from "../ui/slider";
import { ingredientLabels } from "./constants";
import { IngredientValue } from "./IngredientValue";
import { IngredientKey } from "./types";

interface IngredientFormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  ingredients: IngredientKey[];
  control: Control<any>;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void
  ) => void;
  nutritionData: any;
}

const IngredientFormItem: React.FC<IngredientFormItemProps> = ({
  ingredients,
  control,
  handleInputChange,
  nutritionData,
  ...props
}) => {
  return (
    <>
      {ingredients.map((ingredient) => {
        const key = ingredient;
        return (
          <FormField
            key={key}
            name={key}
            control={control}
            render={({ field }) => (
              <FormItem className="bg-background">
                <div className="ingredient-cell">
                  <FormLabel>{ingredientLabels[key]}</FormLabel>
                  <div className="space-x-2">
                    <IngredientValue
                      ingredient={key}
                      nutritionData={nutritionData}
                      value={field.value}
                      defaultValue={nutritionData[key].defaultValue}
                      onChange={(val) => field.onChange(val)}
                      onInputChange={(e) =>
                        handleInputChange(e, field.onChange)
                      }
                    />
                  </div>

                  <div className="slider-container">
                    <Slider
                      min={0}
                      max={
                        nutritionData[key].maxValue ??
                        Math.max(10, nutritionData[key].defaultValue * 3)
                      }
                      step={0.1}
                      value={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                    />
                  </div>
                </div>
              </FormItem>
            )}
          />
        );
      })}
    </>
  );
};

export default IngredientFormItem;
