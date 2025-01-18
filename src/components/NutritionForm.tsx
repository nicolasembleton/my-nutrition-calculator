import { nutritionData } from "~/data/nutritionData";

import React, { useState } from "react";
import { ingredientCategories } from "~/components/nutrition/constants";
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

const ingredientLabels = {
  goldenFlaxSeeds: "Golden Flax Seeds",
  brownFlaxSeeds: "Brown Flax Seeds",
  oatmeal: "Oatmeal",
  cocoaNibs: "Cocoa Nibs",
  rawCocoaPowder: "Raw Cocoa Powder",
  almonds: "Almonds",
  gojiBerries: "Goji Berries",
  pumpkinSeeds: "Pumpkin Seeds",
  macadamiaNuts: "Macadamia Nuts",
  coconutOil: "Coconut Oil",
  hempSeedsPowder: "Hemp Seeds Powder",
  wholeMilk: "Whole Milk",
  chiaSeeds: "Chia Seeds",
  driedRaisins: "Dried Raisins",
  quinoaPowder: "Quinoa Powder",
  almondsPowder: "Almonds Powder",
  macadamiaPowder: "Macadamia Powder",
  blackBeansPowder: "Black Beans Powder",
  redBeansPowder: "Red Beans Powder",
  mungBeansPowder: "Mung Beans Powder",
  chickpeaPowder: "Chickpea Powder",
  brownRicePowder: "Brown Rice Powder",
};

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
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="nutrition-form-card" variants={itemVariants}>
        <div className="nutrition-form-card-header">
          <h2>Nutrition Calculator</h2>
        </div>
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
                                    <h4>{ingredientLabels[key]} Nutrition</h4>
                                    <div className="nutrient-hover-sections">
                                      {/* Calories Section */}
                                      <div className="nutrient-section-group">
                                        <div className="nutrient-section-title">
                                          Basic Info
                                        </div>
                                        <div className="nutrient-hover-item">
                                          <span className="nutrient-name">
                                            Calories:
                                          </span>
                                          <span className="nutrient-value">
                                            {(
                                              (nutritionData[key].nutrition
                                                .calories /
                                                100) *
                                              field.value
                                            ).toFixed(2)}
                                          </span>
                                        </div>
                                      </div>

                                      {/* Fats Section */}
                                      <div className="nutrient-section-group">
                                        <div className="nutrient-section-title">
                                          Fats
                                        </div>
                                        {[
                                          ["Total Fat", "totalFat", "g"],
                                          [
                                            "Saturated Fat",
                                            "saturatedFat",
                                            "g",
                                          ],
                                          [
                                            "Polyunsaturated Fat",
                                            "polyunsaturatedFat",
                                            "g",
                                          ],
                                          [
                                            "Monounsaturated Fat",
                                            "monounsaturatedFat",
                                            "g",
                                          ],
                                        ].map(([label, nutrientKey, unit]) => (
                                          <div
                                            key={nutrientKey}
                                            className="nutrient-hover-item"
                                          >
                                            <span className="nutrient-name">
                                              {label}:
                                            </span>
                                            <span className="nutrient-value">
                                              {(
                                                (nutritionData[key].nutrition[
                                                  nutrientKey
                                                ] /
                                                  100) *
                                                field.value
                                              ).toFixed(2)}
                                              {unit}
                                            </span>
                                          </div>
                                        ))}
                                      </div>

                                      {/* Carbs Section */}
                                      <div className="nutrient-section-group">
                                        <div className="nutrient-section-title">
                                          Carbohydrates
                                        </div>
                                        {[
                                          [
                                            "Total Carbohydrate",
                                            "totalCarbohydrate",
                                            "g",
                                          ],
                                          [
                                            "Dietary Fiber",
                                            "dietaryFiber",
                                            "g",
                                          ],
                                          ["Sugars", "sugars", "g"],
                                        ].map(([label, nutrientKey, unit]) => (
                                          <div
                                            key={nutrientKey}
                                            className="nutrient-hover-item"
                                          >
                                            <span className="nutrient-name">
                                              {label}:
                                            </span>
                                            <span className="nutrient-value">
                                              {(
                                                (nutritionData[key].nutrition[
                                                  nutrientKey
                                                ] /
                                                  100) *
                                                field.value
                                              ).toFixed(2)}
                                              {unit}
                                            </span>
                                          </div>
                                        ))}
                                      </div>

                                      {/* Protein Section */}
                                      <div className="nutrient-section-group">
                                        <div className="nutrient-section-title">
                                          Protein
                                        </div>
                                        <div className="nutrient-hover-item">
                                          <span className="nutrient-name">
                                            Protein:
                                          </span>
                                          <span className="nutrient-value">
                                            {(
                                              (nutritionData[key].nutrition
                                                .protein /
                                                100) *
                                              field.value
                                            ).toFixed(2)}
                                            g
                                          </span>
                                        </div>
                                      </div>

                                      <div className="nutrient-section-group">
                                        <div className="nutrient-section-title">
                                          Minerals
                                        </div>
                                        {[
                                          ["Sodium", "sodium", "mg"],
                                          ["Iron", "iron", "mg"],
                                          ["Calcium", "calcium", "mg"],
                                          ["Magnesium", "magnesium", "mg"],
                                          ["Potassium", "potassium", "mg"],
                                          ["Zinc", "zinc", "mg"],
                                        ].map(([label, nutrientKey, unit]) => (
                                          <div
                                            key={nutrientKey}
                                            className="nutrient-hover-item"
                                          >
                                            <span className="nutrient-name">
                                              {label}:
                                            </span>
                                            <span className="nutrient-value">
                                              {(
                                                (nutritionData[key].nutrition[
                                                  nutrientKey
                                                ] /
                                                  100) *
                                                field.value
                                              ).toFixed(2)}
                                              {unit}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="nutrient-section-group">
                                        <div className="nutrient-section-title">
                                          Vitamins
                                        </div>
                                        {[
                                          ["Vitamin A", "vitaminA", "IU"],
                                          ["Vitamin C", "vitaminC", "mg"],
                                          ["Vitamin D", "vitaminD", "IU"],
                                        ].map(([label, nutrientKey, unit]) => (
                                          <div
                                            key={nutrientKey}
                                            className="nutrient-hover-item"
                                          >
                                            <span className="nutrient-name">
                                              {label}:
                                            </span>
                                            <span className="nutrient-value">
                                              {(
                                                (nutritionData[key].nutrition[
                                                  nutrientKey
                                                ] /
                                                  100) *
                                                field.value
                                              ).toFixed(2)}
                                              {unit}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </HoverCardContent>
                                </HoverCard>
                              </div>
                              <FormLabel>{ingredientLabels[key]}</FormLabel>
                              <FormControl>
                                <div className="space-x-2 flex items-center">
                                  <Input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    placeholder={nutritionData[
                                      key
                                    ].defaultValue.toFixed(1)}
                                    value={
                                      typeof field.value === "number"
                                        ? field.value.toFixed(1)
                                        : field.value
                                    }
                                    onChange={(e) => {
                                      handleInputChange(e, field.onChange);
                                      field.onChange(
                                        parseFloat(e.target.value) || 0
                                      );
                                    }}
                                  />
                                  <span className="text-sm text-muted-foreground">
                                    g
                                  </span>
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
                                    <h4>{ingredientLabels[key]} Nutrition</h4>
                                    <div className="nutrient-hover-sections">
                                      {/* Basic Info Section - Full Width */}
                                      <div className="nutrient-section-group full-width">
                                        <div className="nutrient-section-title">
                                          Basic Info
                                        </div>
                                        <div className="nutrient-hover-item">
                                          <span className="nutrient-name">
                                            Calories:
                                          </span>
                                          <span className="nutrient-value">
                                            {(
                                              (nutritionData[key].nutrition
                                                .calories /
                                                100) *
                                              field.value
                                            ).toFixed(2)}
                                          </span>
                                        </div>
                                      </div>

                                      {/* Fats Section - First Column */}
                                      <div className="nutrient-section-group">
                                        <div className="nutrient-section-title">
                                          Fats
                                        </div>
                                        {[
                                          ["Total Fat", "totalFat", "g"],
                                          [
                                            "Saturated Fat",
                                            "saturatedFat",
                                            "g",
                                          ],
                                          [
                                            "Polyunsaturated Fat",
                                            "polyunsaturatedFat",
                                            "g",
                                          ],
                                          [
                                            "Monounsaturated Fat",
                                            "monounsaturatedFat",
                                            "g",
                                          ],
                                        ].map(([label, nutrientKey, unit]) => (
                                          <div
                                            key={nutrientKey}
                                            className="nutrient-hover-item"
                                          >
                                            <span className="nutrient-name">
                                              {label}:
                                            </span>
                                            <span className="nutrient-value">
                                              {(
                                                (nutritionData[key].nutrition[
                                                  nutrientKey
                                                ] /
                                                  100) *
                                                field.value
                                              ).toFixed(2)}
                                              {unit}
                                            </span>
                                          </div>
                                        ))}
                                      </div>

                                      {/* Carbs Section - Second Column */}
                                      <div className="nutrient-section-group">
                                        <div className="nutrient-section-title">
                                          Carbohydrates
                                        </div>
                                        {[
                                          [
                                            "Total Carbohydrate",
                                            "totalCarbohydrate",
                                            "g",
                                          ],
                                          [
                                            "Dietary Fiber",
                                            "dietaryFiber",
                                            "g",
                                          ],
                                          ["Sugars", "sugars", "g"],
                                        ].map(([label, nutrientKey, unit]) => (
                                          <div
                                            key={nutrientKey}
                                            className="nutrient-hover-item"
                                          >
                                            <span className="nutrient-name">
                                              {label}:
                                            </span>
                                            <span className="nutrient-value">
                                              {(
                                                (nutritionData[key].nutrition[
                                                  nutrientKey
                                                ] /
                                                  100) *
                                                field.value
                                              ).toFixed(2)}
                                              {unit}
                                            </span>
                                          </div>
                                        ))}
                                      </div>

                                      {/* Protein Section - Full Width */}
                                      <div className="nutrient-section-group full-width">
                                        <div className="nutrient-section-title">
                                          Protein
                                        </div>
                                        <div className="nutrient-hover-item">
                                          <span className="nutrient-name">
                                            Protein:
                                          </span>
                                          <span className="nutrient-value">
                                            {(
                                              (nutritionData[key].nutrition
                                                .protein /
                                                100) *
                                              field.value
                                            ).toFixed(2)}
                                            g
                                          </span>
                                        </div>
                                      </div>

                                      {/* Minerals Section - First Column */}
                                      <div className="nutrient-section-group">
                                        <div className="nutrient-section-title">
                                          Minerals
                                        </div>
                                        {[
                                          ["Sodium", "sodium", "mg"],
                                          ["Iron", "iron", "mg"],
                                          ["Calcium", "calcium", "mg"],
                                          ["Magnesium", "magnesium", "mg"],
                                          ["Potassium", "potassium", "mg"],
                                          ["Zinc", "zinc", "mg"],
                                        ].map(([label, nutrientKey, unit]) => (
                                          <div
                                            key={nutrientKey}
                                            className="nutrient-hover-item"
                                          >
                                            <span className="nutrient-name">
                                              {label}:
                                            </span>
                                            <span className="nutrient-value">
                                              {(
                                                (nutritionData[key].nutrition[
                                                  nutrientKey
                                                ] /
                                                  100) *
                                                field.value
                                              ).toFixed(2)}
                                              {unit}
                                            </span>
                                          </div>
                                        ))}
                                      </div>

                                      {/* Vitamins Section - Second Column */}
                                      <div className="nutrient-section-group">
                                        <div className="nutrient-section-title">
                                          Vitamins
                                        </div>
                                        {[
                                          ["Vitamin A", "vitaminA", "IU"],
                                          ["Vitamin C", "vitaminC", "mg"],
                                          ["Vitamin D", "vitaminD", "IU"],
                                        ].map(([label, nutrientKey, unit]) => (
                                          <div
                                            key={nutrientKey}
                                            className="nutrient-hover-item"
                                          >
                                            <span className="nutrient-name">
                                              {label}:
                                            </span>
                                            <span className="nutrient-value">
                                              {(
                                                (nutritionData[key].nutrition[
                                                  nutrientKey
                                                ] /
                                                  100) *
                                                field.value
                                              ).toFixed(2)}
                                              {unit}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </HoverCardContent>
                                </HoverCard>
                              </div>
                              <FormLabel>{ingredientLabels[key]}</FormLabel>
                              <FormControl>
                                <div className="space-x-2 flex items-center">
                                  <Input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    placeholder={nutritionData[
                                      key
                                    ].defaultValue.toFixed(1)}
                                    value={
                                      typeof field.value === "number"
                                        ? field.value.toFixed(1)
                                        : field.value
                                    }
                                    onChange={(e) => {
                                      handleInputChange(e, field.onChange);
                                      field.onChange(
                                        parseFloat(e.target.value) || 0
                                      );
                                    }}
                                  />
                                  <span className="text-sm text-muted-foreground">
                                    g
                                  </span>
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
                                    <h4>{ingredientLabels[key]} Nutrition</h4>
                                    <div className="nutrient-hover-sections">
                                      {/* Basic Info Section - Full Width */}
                                      <div className="nutrient-section-group full-width">
                                        <div className="nutrient-section-title">
                                          Basic Info
                                        </div>
                                        <div className="nutrient-hover-item">
                                          <span className="nutrient-name">
                                            Calories:
                                          </span>
                                          <span className="nutrient-value">
                                            {(
                                              (nutritionData[key].nutrition
                                                .calories /
                                                100) *
                                              field.value
                                            ).toFixed(2)}
                                          </span>
                                        </div>
                                      </div>

                                      {/* Fats Section - First Column */}
                                      <div className="nutrient-section-group">
                                        <div className="nutrient-section-title">
                                          Fats
                                        </div>
                                        {[
                                          ["Total Fat", "totalFat", "g"],
                                          [
                                            "Saturated Fat",
                                            "saturatedFat",
                                            "g",
                                          ],
                                          [
                                            "Polyunsaturated Fat",
                                            "polyunsaturatedFat",
                                            "g",
                                          ],
                                          [
                                            "Monounsaturated Fat",
                                            "monounsaturatedFat",
                                            "g",
                                          ],
                                        ].map(([label, nutrientKey, unit]) => (
                                          <div
                                            key={nutrientKey}
                                            className="nutrient-hover-item"
                                          >
                                            <span className="nutrient-name">
                                              {label}:
                                            </span>
                                            <span className="nutrient-value">
                                              {(
                                                (nutritionData[key].nutrition[
                                                  nutrientKey
                                                ] /
                                                  100) *
                                                field.value
                                              ).toFixed(2)}
                                              {unit}
                                            </span>
                                          </div>
                                        ))}
                                      </div>

                                      {/* Carbs Section - Second Column */}
                                      <div className="nutrient-section-group">
                                        <div className="nutrient-section-title">
                                          Carbohydrates
                                        </div>
                                        {[
                                          [
                                            "Total Carbohydrate",
                                            "totalCarbohydrate",
                                            "g",
                                          ],
                                          [
                                            "Dietary Fiber",
                                            "dietaryFiber",
                                            "g",
                                          ],
                                          ["Sugars", "sugars", "g"],
                                        ].map(([label, nutrientKey, unit]) => (
                                          <div
                                            key={nutrientKey}
                                            className="nutrient-hover-item"
                                          >
                                            <span className="nutrient-name">
                                              {label}:
                                            </span>
                                            <span className="nutrient-value">
                                              {(
                                                (nutritionData[key].nutrition[
                                                  nutrientKey
                                                ] /
                                                  100) *
                                                field.value
                                              ).toFixed(2)}
                                              {unit}
                                            </span>
                                          </div>
                                        ))}
                                      </div>

                                      {/* Protein Section - Full Width */}
                                      <div className="nutrient-section-group full-width">
                                        <div className="nutrient-section-title">
                                          Protein
                                        </div>
                                        <div className="nutrient-hover-item">
                                          <span className="nutrient-name">
                                            Protein:
                                          </span>
                                          <span className="nutrient-value">
                                            {(
                                              (nutritionData[key].nutrition
                                                .protein /
                                                100) *
                                              field.value
                                            ).toFixed(2)}
                                            g
                                          </span>
                                        </div>
                                      </div>

                                      {/* Minerals Section - First Column */}
                                      <div className="nutrient-section-group">
                                        <div className="nutrient-section-title">
                                          Minerals
                                        </div>
                                        {[
                                          ["Sodium", "sodium", "mg"],
                                          ["Iron", "iron", "mg"],
                                          ["Calcium", "calcium", "mg"],
                                          ["Magnesium", "magnesium", "mg"],
                                          ["Potassium", "potassium", "mg"],
                                          ["Zinc", "zinc", "mg"],
                                        ].map(([label, nutrientKey, unit]) => (
                                          <div
                                            key={nutrientKey}
                                            className="nutrient-hover-item"
                                          >
                                            <span className="nutrient-name">
                                              {label}:
                                            </span>
                                            <span className="nutrient-value">
                                              {(
                                                (nutritionData[key].nutrition[
                                                  nutrientKey
                                                ] /
                                                  100) *
                                                field.value
                                              ).toFixed(2)}
                                              {unit}
                                            </span>
                                          </div>
                                        ))}
                                      </div>

                                      {/* Vitamins Section - Second Column */}
                                      <div className="nutrient-section-group">
                                        <div className="nutrient-section-title">
                                          Vitamins
                                        </div>
                                        {[
                                          ["Vitamin A", "vitaminA", "IU"],
                                          ["Vitamin C", "vitaminC", "mg"],
                                          ["Vitamin D", "vitaminD", "IU"],
                                        ].map(([label, nutrientKey, unit]) => (
                                          <div
                                            key={nutrientKey}
                                            className="nutrient-hover-item"
                                          >
                                            <span className="nutrient-name">
                                              {label}:
                                            </span>
                                            <span className="nutrient-value">
                                              {(
                                                (nutritionData[key].nutrition[
                                                  nutrientKey
                                                ] /
                                                  100) *
                                                field.value
                                              ).toFixed(2)}
                                              {unit}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </HoverCardContent>
                                </HoverCard>
                              </div>
                              <FormLabel>{ingredientLabels[key]}</FormLabel>
                              <FormControl>
                                <div className="space-x-2 flex items-center">
                                  <Input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    placeholder={nutritionData[
                                      key
                                    ].defaultValue.toFixed(1)}
                                    value={
                                      typeof field.value === "number"
                                        ? field.value.toFixed(1)
                                        : field.value
                                    }
                                    onChange={(e) => {
                                      handleInputChange(e, field.onChange);
                                      field.onChange(
                                        parseFloat(e.target.value) || 0
                                      );
                                    }}
                                  />
                                  <span className="text-sm text-muted-foreground">
                                    g
                                  </span>
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
                                    {/* Existing HoverCard content */}
                                  </HoverCardContent>
                                </HoverCard>
                              </div>
                              <FormLabel>{ingredientLabels[key]}</FormLabel>
                              <FormControl>
                                <div className="space-x-2 flex items-center">
                                  <Input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    placeholder={nutritionData[
                                      key
                                    ].defaultValue.toFixed(1)}
                                    value={
                                      typeof field.value === "number"
                                        ? field.value.toFixed(1)
                                        : field.value
                                    }
                                    onChange={(e) => {
                                      handleInputChange(e, field.onChange);
                                      field.onChange(
                                        parseFloat(e.target.value) || 0
                                      );
                                    }}
                                  />
                                  <span className="text-sm text-muted-foreground">
                                    g
                                  </span>
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
                                    <h4>{ingredientLabels[key]} Nutrition</h4>
                                    <div className="nutrient-hover-sections">
                                      {/* Basic Info Section - Full Width */}
                                      <div className="nutrient-section-group full-width">
                                        <div className="nutrient-section-title">
                                          Basic Info
                                        </div>
                                        <div className="nutrient-hover-item">
                                          <span className="nutrient-name">
                                            Calories:
                                          </span>
                                          <span className="nutrient-value">
                                            {(
                                              (nutritionData[key].nutrition
                                                .calories /
                                                100) *
                                              field.value
                                            ).toFixed(2)}
                                          </span>
                                        </div>
                                      </div>

                                      {/* Fats Section - First Column */}
                                      <div className="nutrient-section-group">
                                        <div className="nutrient-section-title">
                                          Fats
                                        </div>
                                        {[
                                          ["Total Fat", "totalFat", "g"],
                                          [
                                            "Saturated Fat",
                                            "saturatedFat",
                                            "g",
                                          ],
                                          [
                                            "Polyunsaturated Fat",
                                            "polyunsaturatedFat",
                                            "g",
                                          ],
                                          [
                                            "Monounsaturated Fat",
                                            "monounsaturatedFat",
                                            "g",
                                          ],
                                        ].map(([label, nutrientKey, unit]) => (
                                          <div
                                            key={nutrientKey}
                                            className="nutrient-hover-item"
                                          >
                                            <span className="nutrient-name">
                                              {label}:
                                            </span>
                                            <span className="nutrient-value">
                                              {(
                                                (nutritionData[key].nutrition[
                                                  nutrientKey
                                                ] /
                                                  100) *
                                                field.value
                                              ).toFixed(2)}
                                              {unit}
                                            </span>
                                          </div>
                                        ))}
                                      </div>

                                      {/* Carbs Section - Second Column */}
                                      <div className="nutrient-section-group">
                                        <div className="nutrient-section-title">
                                          Carbohydrates
                                        </div>
                                        {[
                                          [
                                            "Total Carbohydrate",
                                            "totalCarbohydrate",
                                            "g",
                                          ],
                                          [
                                            "Dietary Fiber",
                                            "dietaryFiber",
                                            "g",
                                          ],
                                          ["Sugars", "sugars", "g"],
                                        ].map(([label, nutrientKey, unit]) => (
                                          <div
                                            key={nutrientKey}
                                            className="nutrient-hover-item"
                                          >
                                            <span className="nutrient-name">
                                              {label}:
                                            </span>
                                            <span className="nutrient-value">
                                              {(
                                                (nutritionData[key].nutrition[
                                                  nutrientKey
                                                ] /
                                                  100) *
                                                field.value
                                              ).toFixed(2)}
                                              {unit}
                                            </span>
                                          </div>
                                        ))}
                                      </div>

                                      {/* Protein Section - Full Width */}
                                      <div className="nutrient-section-group full-width">
                                        <div className="nutrient-section-title">
                                          Protein
                                        </div>
                                        <div className="nutrient-hover-item">
                                          <span className="nutrient-name">
                                            Protein:
                                          </span>
                                          <span className="nutrient-value">
                                            {(
                                              (nutritionData[key].nutrition
                                                .protein /
                                                100) *
                                              field.value
                                            ).toFixed(2)}
                                            g
                                          </span>
                                        </div>
                                      </div>

                                      {/* Minerals Section - First Column */}
                                      <div className="nutrient-section-group">
                                        <div className="nutrient-section-title">
                                          Minerals
                                        </div>
                                        {[
                                          ["Sodium", "sodium", "mg"],
                                          ["Iron", "iron", "mg"],
                                          ["Calcium", "calcium", "mg"],
                                          ["Magnesium", "magnesium", "mg"],
                                          ["Potassium", "potassium", "mg"],
                                          ["Zinc", "zinc", "mg"],
                                        ].map(([label, nutrientKey, unit]) => (
                                          <div
                                            key={nutrientKey}
                                            className="nutrient-hover-item"
                                          >
                                            <span className="nutrient-name">
                                              {label}:
                                            </span>
                                            <span className="nutrient-value">
                                              {(
                                                (nutritionData[key].nutrition[
                                                  nutrientKey
                                                ] /
                                                  100) *
                                                field.value
                                              ).toFixed(2)}
                                              {unit}
                                            </span>
                                          </div>
                                        ))}
                                      </div>

                                      {/* Vitamins Section - Second Column */}
                                      <div className="nutrient-section-group">
                                        <div className="nutrient-section-title">
                                          Vitamins
                                        </div>
                                        {[
                                          ["Vitamin A", "vitaminA", "IU"],
                                          ["Vitamin C", "vitaminC", "mg"],
                                          ["Vitamin D", "vitaminD", "IU"],
                                        ].map(([label, nutrientKey, unit]) => (
                                          <div
                                            key={nutrientKey}
                                            className="nutrient-hover-item"
                                          >
                                            <span className="nutrient-name">
                                              {label}:
                                            </span>
                                            <span className="nutrient-value">
                                              {(
                                                (nutritionData[key].nutrition[
                                                  nutrientKey
                                                ] /
                                                  100) *
                                                field.value
                                              ).toFixed(2)}
                                              {unit}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </HoverCardContent>
                                </HoverCard>
                              </div>
                              <FormLabel>{ingredientLabels[key]}</FormLabel>
                              <FormControl>
                                <div className="space-x-2 flex items-center">
                                  <Input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    placeholder={nutritionData[
                                      key
                                    ].defaultValue.toFixed(1)}
                                    value={
                                      typeof field.value === "number"
                                        ? field.value.toFixed(1)
                                        : field.value
                                    }
                                    onChange={(e) => {
                                      handleInputChange(e, field.onChange);
                                      field.onChange(
                                        parseFloat(e.target.value) || 0
                                      );
                                    }}
                                  />
                                  <span className="text-sm text-muted-foreground">
                                    g
                                  </span>
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

              <Button type="submit" className="calculate-cta">
                Calculate Nutrition
              </Button>
            </form>
          </Form>
        </div>
      </motion.div>
      <motion.div className="nutrition-label" variants={itemVariants}>
        <div className="nutrition-label-header">
          <h2>Nutrition Report</h2>
          <Button
            onClick={() => downloadCSV(form.getValues())}
            className="download-button"
          >
            Download Detailed Report
          </Button>
        </div>
        {/* Basic Info - Full Width */}
        <div className="nutrition-section-group full-width">
          <div className="nutrition-section-title">Basic Info</div>
          <div className="nutrient">
            <span className="nutrient-name">Calories</span>
            <span className="nutrient-value">
              {totalNutrition.calories.toFixed(2)} cal
            </span>
          </div>
        </div>

        <div className="nutrition-sections">
          {/* Fats Section - First Column */}
          <div className="nutrition-section-group">
            <div className="nutrition-section-title">Fats</div>
            <div className="nutrient">
              <span className="nutrient-name">Total Fat</span>
              <span className="nutrient-value">
                {totalNutrition.totalFat.toFixed(2)}g
              </span>
            </div>
            <div className="nutrient">
              <span className="nutrient-name">Saturated Fat</span>
              <span className="nutrient-value">
                {totalNutrition.saturatedFat.toFixed(2)}g
              </span>
            </div>
            <div className="nutrient">
              <span className="nutrient-name">Polyunsaturated Fat</span>
              <span className="nutrient-value">
                {totalNutrition.polyunsaturatedFat.toFixed(2)}g
              </span>
            </div>
            <div className="nutrient">
              <span className="nutrient-name">Monounsaturated Fat</span>
              <span className="nutrient-value">
                {totalNutrition.monounsaturatedFat.toFixed(2)}g
              </span>
            </div>
          </div>

          {/* Carbs Section - Second Column */}
          <div className="nutrition-section-group">
            <div className="nutrition-section-title">Carbohydrates</div>
            <div className="nutrient">
              <span className="nutrient-name">Total Carbohydrate</span>
              <span className="nutrient-value">
                {totalNutrition.totalCarbohydrate.toFixed(2)}g
              </span>
            </div>
            <div className="nutrient">
              <span className="nutrient-name">Dietary Fiber</span>
              <span className="nutrient-value">
                {totalNutrition.dietaryFiber.toFixed(2)}g
              </span>
            </div>
            <div className="nutrient">
              <span className="nutrient-name">Sugars</span>
              <span className="nutrient-value">
                {totalNutrition.sugars.toFixed(2)}g
              </span>
            </div>
          </div>

          {/* Protein Section - Full Width */}
          <div className="nutrition-section-group full-width">
            <div className="nutrition-section-title">Protein</div>
            <div className="nutrient">
              <span className="nutrient-name">Protein</span>
              <span className="nutrient-value">
                {totalNutrition.protein.toFixed(2)}g
              </span>
            </div>
          </div>

          {/* Minerals Section - First Column */}
          <div className="nutrition-section-group">
            <div className="nutrition-section-title">Minerals</div>
            <div className="nutrient">
              <span className="nutrient-name">Sodium</span>
              <span className="nutrient-value">
                {totalNutrition.sodium.toFixed(2)}mg
              </span>
            </div>
            <div className="nutrient">
              <span className="nutrient-name">Iron</span>
              <span className="nutrient-value">
                {totalNutrition.iron.toFixed(2)}mg
              </span>
            </div>
            <div className="nutrient">
              <span className="nutrient-name">Calcium</span>
              <span className="nutrient-value">
                {totalNutrition.calcium.toFixed(2)}mg
              </span>
            </div>
            <div className="nutrient">
              <span className="nutrient-name">Magnesium</span>
              <span className="nutrient-value">
                {totalNutrition.magnesium.toFixed(2)}mg
              </span>
            </div>
            <div className="nutrient">
              <span className="nutrient-name">Potassium</span>
              <span className="nutrient-value">
                {totalNutrition.potassium.toFixed(2)}mg
              </span>
            </div>
            <div className="nutrient">
              <span className="nutrient-name">Zinc</span>
              <span className="nutrient-value">
                {totalNutrition.zinc.toFixed(2)}mg
              </span>
            </div>
          </div>

          {/* Vitamins Section - Second Column */}
          <div className="nutrition-section-group">
            <div className="nutrition-section-title">Vitamins</div>
            <div className="nutrient">
              <span className="nutrient-name">Vitamin A</span>
              <span className="nutrient-value">
                {totalNutrition.vitaminA.toFixed(2)}IU
              </span>
            </div>
            <div className="nutrient">
              <span className="nutrient-name">Vitamin C</span>
              <span className="nutrient-value">
                {totalNutrition.vitaminC.toFixed(2)}mg
              </span>
            </div>
            <div className="nutrient">
              <span className="nutrient-name">Vitamin D</span>
              <span className="nutrient-value">
                {totalNutrition.vitaminD.toFixed(2)}IU
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NutritionForm;
