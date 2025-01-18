import { nutritionData } from "~/data/nutritionData";

import React, { useState } from "react";
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
    },
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
      {} as FormValues,
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
    onChange: (...event: any[]) => void,
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
    console.group("Nutrition Calculation Report");
    console.log("Starting calculation with these ingredient amounts:");
    Object.entries(data).forEach(([ingredient, amount]) => {
      console.log(
        `${ingredientLabels[ingredient as IngredientKey]}: ${amount}g`,
      );
    });
    console.log("-------------------");

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

      console.group(
        `Calculating nutrition for ${ingredientLabels[key]} (${amount}g):`,
      );

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

        // Log the calculation for each nutrient
        console.log(`Base values per 100g:`);
        Object.entries(nutritionDataItem).forEach(([nutrient, value]) => {
          console.log(`${nutrient}: ${value}`);
        });

        console.log("\nCalculated contributions:");
        Object.entries(contributions).forEach(([nutrient, value]) => {
          console.log(
            `${nutrient}: (${nutritionDataItem[nutrient]} / 100) * ${amount}g = ${value.toFixed(2)}`,
          );
        });

        // Add to running totals
        Object.entries(contributions).forEach(([nutrient, value]) => {
          nutrition[nutrient as keyof NutritionTotal] += value;
        });
      }
      console.groupEnd();
    });

    console.log("\nFinal Totals:");
    Object.entries(nutrition).forEach(([nutrient, value]) => {
      console.log(`${nutrient}: ${value.toFixed(2)}`);
    });

    console.groupEnd();

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
      {} as FormValues,
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
                <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                  <TabsTrigger value="liquids">Liquids</TabsTrigger>
                  <TabsTrigger value="oils">Oils</TabsTrigger>
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
                            <FormLabel>{ingredientLabels[key]}</FormLabel>
                            <FormControl>
                              <input
                                type="number"
                                step="0.1"
                                min="0"
                                placeholder={nutritionData[key].defaultValue.toFixed(1)}
                                value={typeof field.value === "number" ? field.value.toFixed(1) : field.value}
                                onChange={(e) => handleInputChange(e, field.onChange)}
                              />
                            </FormControl>
                            <FormMessage />
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
                            <FormLabel>{ingredientLabels[key]}</FormLabel>
                            <FormControl>
                              <input
                                type="number"
                                step="0.1"
                                min="0"
                                placeholder={nutritionData[key].defaultValue.toFixed(1)}
                                value={typeof field.value === "number" ? field.value.toFixed(1) : field.value}
                                onChange={(e) => handleInputChange(e, field.onChange)}
                              />
                            </FormControl>
                            <FormMessage />
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
                            <FormLabel>{ingredientLabels[key]}</FormLabel>
                            <FormControl>
                              <input
                                type="number"
                                step="0.1"
                                min="0"
                                placeholder={nutritionData[key].defaultValue.toFixed(1)}
                                value={typeof field.value === "number" ? field.value.toFixed(1) : field.value}
                                onChange={(e) => handleInputChange(e, field.onChange)}
                              />
                            </FormControl>
                            <FormMessage />
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
                            <FormLabel>{ingredientLabels[key]}</FormLabel>
                            <FormControl>
                              <input
                                type="number"
                                step="0.1"
                                min="0"
                                placeholder={nutritionData[key].defaultValue.toFixed(1)}
                                value={typeof field.value === "number" ? field.value.toFixed(1) : field.value}
                                onChange={(e) => handleInputChange(e, field.onChange)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                  })}
                </TabsContent>
                <Button type="submit">Calculate</Button>
              </Tabs>
            </form>
          </Form>
        </div>
      </motion.div>
      <motion.div className="nutrition-label" variants={itemVariants}>
        <div className="nutrition-label-header">
          <h2>Total Nutrition</h2>
          <Button
            onClick={() => downloadCSV(form.getValues())}
            className="download-button"
          >
            Download Detailed Report
          </Button>
        </div>
        <div className="nutrition-header">
          <div className="serving-size">Serving Size: 100g</div>
          <div className="calories">
            Calories: {totalNutrition.calories.toFixed(2)}
          </div>
        </div>
        <div className="nutrition-content">
          <div className="nutrient-section">
            <div className="nutrient">
              Total Fat: {totalNutrition.totalFat.toFixed(2)}g
            </div>
            <div className="nutrient">
              Saturated Fat: {totalNutrition.saturatedFat.toFixed(2)}g
            </div>
            <div className="nutrient">
              Polyunsaturated Fat:{" "}
              {totalNutrition.polyunsaturatedFat.toFixed(2)}g
            </div>
            <div className="nutrient">
              Monounsaturated Fat:{" "}
              {totalNutrition.monounsaturatedFat.toFixed(2)}g
            </div>
            <div className="nutrient">
              Cholesterol: {totalNutrition.cholesterol.toFixed(2)}mg
            </div>
            <div className="nutrient">
              Sodium: {totalNutrition.sodium.toFixed(2)}mg
            </div>
          </div>
          <div className="nutrient-section">
            <div className="nutrient">
              Total Carbohydrate: {totalNutrition.totalCarbohydrate.toFixed(2)}g
            </div>
            <div className="nutrient">
              Dietary Fiber: {totalNutrition.dietaryFiber.toFixed(2)}g
            </div>
            <div className="nutrient">
              Sugars: {totalNutrition.sugars.toFixed(2)}g
            </div>
            <div className="nutrient">
              Protein: {totalNutrition.protein.toFixed(2)}g
            </div>
          </div>
          <div className="nutrient-section">
            <div className="nutrient">
              Iron: {totalNutrition.iron.toFixed(2)}mg
            </div>
            <div className="nutrient">
              Calcium: {totalNutrition.calcium.toFixed(2)}mg
            </div>
            <div className="nutrient">
              Magnesium: {totalNutrition.magnesium.toFixed(2)}mg
            </div>
            <div className="nutrient">
              Potassium: {totalNutrition.potassium.toFixed(2)}mg
            </div>
            <div className="nutrient">
              Vitamin A: {totalNutrition.vitaminA.toFixed(2)}IU
            </div>
            <div className="nutrient">
              Vitamin C: {totalNutrition.vitaminC.toFixed(2)}mg
            </div>
            <div className="nutrient">
              Vitamin D: {totalNutrition.vitaminD.toFixed(2)}IU
            </div>
            <div className="nutrient">
              Zinc: {totalNutrition.zinc.toFixed(2)}mg
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NutritionForm;
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
const ingredientCategories = {
  liquids: [
    'wholeMilk'
  ].sort(),

  oils: [
    'coconutOil'
  ].sort(),

  fullSeeds: [
    'almonds',
    'brownFlaxSeeds',
    'chiaSeeds',
    'cocoaNibs',
    'driedRaisins',
    'gojiBerries',
    'goldenFlaxSeeds',
    'macadamiaNuts',
    'oatmeal',
    'pumpkinSeeds'
  ].sort(),

  powders: [
    'almondsPowder',
    'blackBeansPowder',
    'brownRicePowder',
    'chickpeaPowder',
    'hempSeedsPowder',
    'macadamiaPowder',
    'mungBeansPowder',
    'quinoaPowder',
    'rawCocoaPowder',
    'redBeansPowder'
  ].sort()
} as const;
