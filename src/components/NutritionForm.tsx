import { nutritionData } from "~/data/nutritionData";
import { NutrientHoverContent } from "~/components/nutrition/NutrientHoverContent";
import { NutritionReport } from "~/components/nutrition/NutritionReport";
import { NutrientSection } from "~/components/nutrition/NutrientSection";

import React, { useState } from "react";
import { FormHeader } from "~/components/nutrition/FormHeader";
import { IngredientValue } from "~/components/nutrition/IngredientValue";
import { CalculateButton } from "~/components/nutrition/CalculateButton";
import {
  ingredientLabels,
  ingredientCategories,
  motionVariants,
} from "~/components/nutrition/constants";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Input } from "~/components/ui/input";
import { Slider } from "~/components/ui/slider";
import { Button } from "~/components/ui/button";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import "./NutritionForm.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// New function to generate CSV
const generateCSV = (data: FormValues): string => {
  // Define CSV headers
  const headers = [
    "Ingredient",
    "Weight (g)",
    "Calories",
    "Total Fat (g)",
    "Saturated Fat (g)",
    "Polyunsaturated Fat (g)",
    "Monounsaturated Fat (g)",
    "Cholesterol (mg)",
    "Sodium (mg)",
    "Total Carbohydrate (g)",
    "Dietary Fiber (g)",
    "Sugars (g)",
    "Protein (g)",
    "Iron (mg)",
    "Calcium (mg)",
    "Magnesium (mg)",
    "Potassium (mg)",
    "Vitamin A (IU)",
    "Vitamin C (mg)",
    "Vitamin D (IU)",
    "Zinc (mg)",
  ].join(",");

  // Generate rows for each ingredient
  const rows = Object.entries(data).map(([ingredient, amount]) => {
    const key = ingredient as IngredientKey;
    const nutritionDataItem = nutritionData[key].nutrition;

    // Calculate contributions for each nutrient
    const contributions = {
      calories: (nutritionDataItem.calories / 100) * amount,
      totalFat: (nutritionDataItem.totalFat / 100) * amount,
      saturatedFat: (nutritionDataItem.saturatedFat / 100) * amount,
      polyunsaturatedFat: (nutritionDataItem.polyunsaturatedFat / 100) * amount,
      monounsaturatedFat: (nutritionDataItem.monounsaturatedFat / 100) * amount,
      cholesterol: (nutritionDataItem.cholesterol / 100) * amount,
      sodium: (nutritionDataItem.sodium / 100) * amount,
      totalCarbohydrate: (nutritionDataItem.totalCarbohydrate / 100) * amount,
      dietaryFiber: (nutritionDataItem.dietaryFiber / 100) * amount,
      sugars: (nutritionDataItem.sugars / 100) * amount,
      protein: (nutritionDataItem.protein / 100) * amount,
      iron: (nutritionDataItem.iron / 100) * amount,
      calcium: (nutritionDataItem.calcium / 100) * amount,
      magnesium: (nutritionDataItem.magnesium / 100) * amount,
      potassium: (nutritionDataItem.potassium / 100) * amount,
      vitaminA: (nutritionDataItem.vitaminA / 100) * amount,
      vitaminC: (nutritionDataItem.vitaminC / 100) * amount,
      vitaminD: (nutritionDataItem.vitaminD / 100) * amount,
      zinc: (nutritionDataItem.zinc / 100) * amount,
    };

    return [
      ingredientLabels[key],
      amount.toFixed(1),
      ...Object.values(contributions).map((v) => v.toFixed(2)),
    ].join(",");
  });

  // Calculate and add totals row
  const totals = Object.values(data).reduce(
    (acc, amount, index) => {
      const ingredient = Object.keys(data)[index] as IngredientKey;
      const nutritionDataItem = nutritionData[ingredient].nutrition;

      acc.calories += (nutritionDataItem.calories / 100) * amount;
      acc.totalFat += (nutritionDataItem.totalFat / 100) * amount;
      acc.saturatedFat += (nutritionDataItem.saturatedFat / 100) * amount;
      acc.polyunsaturatedFat +=
        (nutritionDataItem.polyunsaturatedFat / 100) * amount;
      acc.monounsaturatedFat +=
        (nutritionDataItem.monounsaturatedFat / 100) * amount;
      acc.cholesterol += (nutritionDataItem.cholesterol / 100) * amount;
      acc.sodium += (nutritionDataItem.sodium / 100) * amount;
      acc.totalCarbohydrate +=
        (nutritionDataItem.totalCarbohydrate / 100) * amount;
      acc.dietaryFiber += (nutritionDataItem.dietaryFiber / 100) * amount;
      acc.sugars += (nutritionDataItem.sugars / 100) * amount;
      acc.protein += (nutritionDataItem.protein / 100) * amount;
      acc.iron += (nutritionDataItem.iron / 100) * amount;
      acc.calcium += (nutritionDataItem.calcium / 100) * amount;
      acc.magnesium += (nutritionDataItem.magnesium / 100) * amount;
      acc.potassium += (nutritionDataItem.potassium / 100) * amount;
      acc.vitaminA += (nutritionDataItem.vitaminA / 100) * amount;
      acc.vitaminC += (nutritionDataItem.vitaminC / 100) * amount;
      acc.vitaminD += (nutritionDataItem.vitaminD / 100) * amount;
      acc.zinc += (nutritionDataItem.zinc / 100) * amount;

      return acc;
    },
    {
      calories: 0,
      totalFat: 0,
      saturatedFat: 0,
      polyunsaturatedFat: 0,
      monounsaturatedFat: 0,
      cholesterol: 0,
      sodium: 0,
      totalCarbohydrate: 0,
      dietaryFiber: 0,
      sugars: 0,
      protein: 0,
      iron: 0,
      calcium: 0,
      magnesium: 0,
      potassium: 0,
      vitaminA: 0,
      vitaminC: 0,
      vitaminD: 0,
      zinc: 0,
    }
  );

  const totalsRow = [
    "TOTALS",
    Object.values(data)
      .reduce((sum, val) => sum + val, 0)
      .toFixed(1),
    ...Object.values(totals).map((v) => v.toFixed(2)),
  ].join(",");

  // Combine all parts
  return [headers, ...rows, totalsRow].join("\n");
};

// Function to handle CSV download
const downloadCSV = (data: FormValues) => {
  const csv = generateCSV(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "nutrition_report.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface NutritionTotal {
  calories: number;
  totalFat: number;
  saturatedFat: number;
  polyunsaturatedFat: number;
  monounsaturatedFat: number;
  cholesterol: number;
  sodium: number;
  totalCarbohydrate: number;
  dietaryFiber: number;
  sugars: number;
  protein: number;
  iron: number;
  calcium: number;
  magnesium: number;
  potassium: number;
  vitaminA: number;
  vitaminC: number;
  vitaminD: number;
  zinc: number;
}

type IngredientKey = keyof typeof nutritionData;
type FormValues = Record<IngredientKey, number>;

const NutritionForm: React.FC = () => {
  const form = useForm<FormValues>({
    defaultValues: Object.keys(nutritionData).reduce(
      (acc, key) => ({
        ...acc,
        [key]: nutritionData[key as IngredientKey].defaultValue,
      }),
      {} as FormValues
    ),
  });

  const [totalNutrition, setTotalNutrition] = useState<NutritionTotal>({
    calories: 0,
    totalFat: 0,
    saturatedFat: 0,
    polyunsaturatedFat: 0,
    monounsaturatedFat: 0,
    cholesterol: 0,
    sodium: 0,
    totalCarbohydrate: 0,
    dietaryFiber: 0,
    sugars: 0,
    protein: 0,
    iron: 0,
    calcium: 0,
    magnesium: 0,
    potassium: 0,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    zinc: 0,
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void
  ) => {
    const value = event.target.value;
    const parsedValue = parseFloat(value);

    if (!isNaN(parsedValue) && parsedValue >= 0) {
      onChange(Number(parsedValue.toFixed(1)));
    } else if (value === "") {
      onChange(0.0);
    }
  };

  const onSubmit = (data: FormValues) => {
    const nutrition: NutritionTotal = {
      calories: 0,
      totalFat: 0,
      saturatedFat: 0,
      polyunsaturatedFat: 0,
      monounsaturatedFat: 0,
      cholesterol: 0,
      sodium: 0,
      totalCarbohydrate: 0,
      dietaryFiber: 0,
      sugars: 0,
      protein: 0,
      iron: 0,
      calcium: 0,
      magnesium: 0,
      potassium: 0,
      vitaminA: 0,
      vitaminC: 0,
      vitaminD: 0,
      zinc: 0,
    };

    Object.keys(data).forEach((ingredient) => {
      const amount = data[ingredient];
      const key = ingredient as IngredientKey;
      const nutritionDataItem = nutritionData[key].nutrition;

      if (!isNaN(amount)) {
        // Calculate each nutrient contribution
        const contributions = {
          calories: (nutritionDataItem.calories / 100) * amount,
          totalFat: (nutritionDataItem.totalFat / 100) * amount,
          saturatedFat: (nutritionDataItem.saturatedFat / 100) * amount,
          polyunsaturatedFat:
            (nutritionDataItem.polyunsaturatedFat / 100) * amount,
          monounsaturatedFat:
            (nutritionDataItem.monounsaturatedFat / 100) * amount,
          cholesterol: (nutritionDataItem.cholesterol / 100) * amount,
          sodium: (nutritionDataItem.sodium / 100) * amount,
          totalCarbohydrate:
            (nutritionDataItem.totalCarbohydrate / 100) * amount,
          dietaryFiber: (nutritionDataItem.dietaryFiber / 100) * amount,
          sugars: (nutritionDataItem.sugars / 100) * amount,
          protein: (nutritionDataItem.protein / 100) * amount,
          iron: (nutritionDataItem.iron / 100) * amount || 0,
          calcium: (nutritionDataItem.calcium / 100) * amount || 0,
          magnesium: (nutritionDataItem.magnesium / 100) * amount || 0,
          potassium: (nutritionDataItem.potassium / 100) * amount || 0,
          vitaminA: (nutritionDataItem.vitaminA / 100) * amount || 0,
          vitaminC: (nutritionDataItem.vitaminC / 100) * amount || 0,
          vitaminD: (nutritionDataItem.vitaminD / 100) * amount || 0,
          zinc: (nutritionDataItem.zinc / 100) * amount || 0,
        };

        // Add to running totals
        Object.entries(contributions).forEach(([nutrient, value]) => {
          nutrition[nutrient as keyof NutritionTotal] += value;
        });
      }
    });

    setTotalNutrition(nutrition);
  };

  React.useEffect(() => {
    const subscription = form.watch((value) => {
      if (value) {
        form.handleSubmit(onSubmit)();
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, form.handleSubmit]);

  React.useEffect(() => {
    // Trigger initial calculation with default values
    const defaultValues = Object.keys(nutritionData).reduce(
      (acc, key) => ({
        ...acc,
        [key]: nutritionData[key as IngredientKey].defaultValue,
      }),
      {} as FormValues
    );
    onSubmit(defaultValues);
  }, []); // Empty dependency array means this runs once on mount

  return (
    <motion.div
      className="nutrition-form-container"
      variants={motionVariants.containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="nutrition-form-card" variants={itemVariants}>
        <FormHeader title="Nutrition Calculator" />

        <div className="nutrition-form-card-content">
          <Form {...form}>
            <form className="form-grid" onSubmit={form.handleSubmit(onSubmit)}>
              <Tabs defaultValue="liquids" className="tabs-container w-full">
                <TabsList className="h-10 rounded-md bg-muted p-1 text-muted-foreground inline-flex items-center justify-center">
                  <TabsTrigger value="liquids">Liquids</TabsTrigger>
                  <TabsTrigger value="oils">Oils</TabsTrigger>
                  <TabsTrigger value="carbohydrates">Carbohydrates</TabsTrigger>
                  <TabsTrigger value="fullSeeds">Full Seeds</TabsTrigger>
                  <TabsTrigger value="powders">Powders</TabsTrigger>
                </TabsList>

                <TabsContent value="liquids" className="ingredient-grid">
                  {ingredientCategories.liquids.map((ingredient) => {
                    const key = ingredient as IngredientKey;
                    return (
                      <FormField
                        key={key}
                        name={key}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <div className="ingredient-cell">
                              {/* Add calorie indicator */}
                              <div className="calorie-indicator">
                                {(
                                  (nutritionData[key].nutrition.calories /
                                    100) *
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
                              <FormControl>
                                <div className="space-x-2 flex items-center">
                                  <IngredientValue
                                    value={field.value}
                                    defaultValue={
                                      nutritionData[key].defaultValue
                                    }
                                    onChange={(val) => field.onChange(val)}
                                    onInputChange={(e) =>
                                      handleInputChange(e, field.onChange)
                                    }
                                  />
                                </div>
                              </FormControl>
                              <div className="slider-container">
                                <FormControl>
                                  <Slider
                                    min={0}
                                    max={Math.max(
                                      10,
                                      nutritionData[key].defaultValue * 3
                                    )}
                                    step={0.1}
                                    value={[field.value]}
                                    onValueChange={(vals) =>
                                      field.onChange(vals[0])
                                    }
                                  />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    );
                  })}
                </TabsContent>

                <TabsContent value="oils" className="ingredient-grid">
                  {ingredientCategories.oils.map((ingredient) => {
                    const key = ingredient as IngredientKey;
                    return (
                      <FormField
                        key={key}
                        name={key}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <div className="ingredient-cell">
                              {/* Add calorie indicator */}
                              <div className="calorie-indicator">
                                {(
                                  (nutritionData[key].nutrition.calories /
                                    100) *
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
                              <FormControl>
                                <div className="space-x-2 flex items-center">
                                  <IngredientValue
                                    value={field.value}
                                    defaultValue={
                                      nutritionData[key].defaultValue
                                    }
                                    onChange={(val) => field.onChange(val)}
                                    onInputChange={(e) =>
                                      handleInputChange(e, field.onChange)
                                    }
                                  />
                                </div>
                              </FormControl>
                              <div className="slider-container">
                                <FormControl>
                                  <Slider
                                    min={0}
                                    max={Math.max(
                                      10,
                                      nutritionData[key].defaultValue * 3
                                    )}
                                    step={0.1}
                                    value={[field.value]}
                                    onValueChange={(vals) =>
                                      field.onChange(vals[0])
                                    }
                                  />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    );
                  })}
                </TabsContent>

                <TabsContent value="fullSeeds" className="ingredient-grid">
                  {ingredientCategories.fullSeeds.map((ingredient) => {
                    const key = ingredient as IngredientKey;
                    return (
                      <FormField
                        key={key}
                        name={key}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <div className="ingredient-cell">
                              {/* Add calorie indicator */}
                              <div className="calorie-indicator">
                                {(
                                  (nutritionData[key].nutrition.calories /
                                    100) *
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
                              <FormControl>
                                <div className="space-x-2 flex items-center">
                                  <IngredientValue
                                    value={field.value}
                                    defaultValue={
                                      nutritionData[key].defaultValue
                                    }
                                    onChange={(val) => field.onChange(val)}
                                    onInputChange={(e) =>
                                      handleInputChange(e, field.onChange)
                                    }
                                  />
                                </div>
                              </FormControl>
                              <div className="slider-container">
                                <FormControl>
                                  <Slider
                                    min={0}
                                    max={Math.max(
                                      10,
                                      nutritionData[key].defaultValue * 3
                                    )}
                                    step={0.1}
                                    value={[field.value]}
                                    onValueChange={(vals) =>
                                      field.onChange(vals[0])
                                    }
                                  />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    );
                  })}
                </TabsContent>

                <TabsContent value="carbohydrates" className="ingredient-grid">
                  {ingredientCategories.carbohydrates.map((ingredient) => {
                    const key = ingredient as IngredientKey;
                    return (
                      <FormField
                        key={key}
                        name={key}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <div className="ingredient-cell">
                              <div className="calorie-indicator">
                                {(
                                  (nutritionData[key].nutrition.calories /
                                    100) *
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
                              <FormControl>
                                <div className="space-x-2 flex items-center">
                                  <IngredientValue
                                    value={field.value}
                                    defaultValue={
                                      nutritionData[key].defaultValue
                                    }
                                    onChange={(val) => field.onChange(val)}
                                    onInputChange={(e) =>
                                      handleInputChange(e, field.onChange)
                                    }
                                  />
                                </div>
                              </FormControl>
                              <div className="slider-container">
                                <FormControl>
                                  <Slider
                                    min={0}
                                    max={Math.max(
                                      10,
                                      nutritionData[key].defaultValue * 3
                                    )}
                                    step={0.1}
                                    value={[field.value]}
                                    onValueChange={(vals) =>
                                      field.onChange(vals[0])
                                    }
                                  />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    );
                  })}
                </TabsContent>

                <TabsContent value="powders" className="ingredient-grid">
                  {ingredientCategories.powders.map((ingredient) => {
                    const key = ingredient as IngredientKey;
                    return (
                      <FormField
                        key={key}
                        name={key}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <div className="ingredient-cell">
                              {/* Add calorie indicator */}
                              <div className="calorie-indicator">
                                {(
                                  (nutritionData[key].nutrition.calories /
                                    100) *
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
                              <FormControl>
                                <div className="space-x-2 flex items-center">
                                  <IngredientValue
                                    value={field.value}
                                    defaultValue={
                                      nutritionData[key].defaultValue
                                    }
                                    onChange={(val) => field.onChange(val)}
                                    onInputChange={(e) =>
                                      handleInputChange(e, field.onChange)
                                    }
                                  />
                                </div>
                              </FormControl>
                              <div className="slider-container">
                                <FormControl>
                                  <Slider
                                    min={0}
                                    max={Math.max(
                                      10,
                                      nutritionData[key].defaultValue * 3
                                    )}
                                    step={0.1}
                                    value={[field.value]}
                                    onValueChange={(vals) =>
                                      field.onChange(vals[0])
                                    }
                                  />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    );
                  })}
                </TabsContent>
              </Tabs>

              <CalculateButton onClick={form.handleSubmit(onSubmit)} />
            </form>
          </Form>
        </div>
      </motion.div>
      <NutritionReport
        totalNutrition={totalNutrition}
        onDownload={() => downloadCSV(form.getValues())}
        formValues={form.getValues()}
      />
    </motion.div>
  );
};

export default NutritionForm;
