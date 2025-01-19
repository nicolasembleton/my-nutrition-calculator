import React from "react";
import { Input } from "~/components/ui/input";
import { Slider } from "~/components/ui/slider";

interface IngredientValueProps {
  value: number;
  defaultValue: number;
  onChange: (value: number) => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const IngredientValue = ({
  value,
  defaultValue,
  onChange,
  onInputChange,
}: IngredientValueProps) => (
  <div className="space-x-2 flex items-center">
    <Input
      type="number"
      step="0.1"
      min="0"
      placeholder={defaultValue.toFixed(1)}
      value={typeof value === "number" ? value.toFixed(1) : value}
      onChange={onInputChange}
    />
  </div>
);
