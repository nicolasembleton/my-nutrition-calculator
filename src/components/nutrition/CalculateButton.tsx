import React from "react";
import { Button } from "~/components/ui/button";

interface CalculateButtonProps {
  onClick: () => void;
}

export const CalculateButton = ({ onClick }: CalculateButtonProps) => (
  <Button type="submit" className="calculate-cta" onClick={onClick}>
    Calculate Nutrition
  </Button>
);
