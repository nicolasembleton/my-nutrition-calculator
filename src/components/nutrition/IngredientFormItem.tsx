import React from "react";
import { IngredientValue } from "./IngredientValue";
import { IngredientKey } from "./types";
import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel } from "~/components/ui/form";
import { ingredientLabels } from "./constants";
import { Slider } from "../ui/slider";

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
    <div {...props}>
      {ingredients.map((ingredient) => {
        const key = ingredient;
        return (
          <FormField
            key={key}
            name={key}
            control={control}
            render={({ field }) => (
              <FormItem>
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
                      max={Math.max(10, nutritionData[key].defaultValue * 3)}
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
    </div>
  );
};

export default IngredientFormItem;
