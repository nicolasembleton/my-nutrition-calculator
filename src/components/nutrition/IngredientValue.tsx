import React from 'react';
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
  onInputChange 
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
    <span className="text-sm text-muted-foreground">g</span>
    <div className="slider-container">
      <Slider
        min={0}
        max={Math.max(10, defaultValue * 3)}
        step={0.1}
        value={[value]}
        onValueChange={(vals) => onChange(vals[0])}
      />
    </div>
  </div>
);
