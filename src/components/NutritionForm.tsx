import { motion } from "framer-motion";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { CalculateButton } from "~/components/nutrition/CalculateButton";
import {
  ingredientCategories,
  ingredientLabels,
  motionVariants,
} from "~/components/nutrition/constants";
import { FormHeader } from "~/components/nutrition/FormHeader";
import IngredientFormItem from "~/components/nutrition/IngredientFormItem";
import { NutritionReport } from "~/components/nutrition/NutritionReport";
import { Form } from "~/components/ui/form";
import { nutritionData } from "~/data/nutritionData";
import "./NutritionForm.css";
import { List } from "lucide-react";
import { PiNumberCircleZeroFill } from "react-icons/pi";
import { RecipeIcon, ResetIcon } from "@radix-ui/react-icons";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { calculateNutrition } from "./nutrition/calculateNutrition";
import { downloadCSV } from "./nutrition/generateCSV";
import { TabNavigation } from "./nutrition/TabNavigation";

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
    defaultValues: Object.fromEntries(
      Object.keys(nutritionData).map((key) => [
        key,
        nutritionData[key as IngredientKey].defaultValue,
      ])
    ) as FormValues,
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
    const nutrition = calculateNutrition(data);
    setTotalNutrition(nutrition);
  };

  const resetForm = useCallback(() => {
    form.reset();
  }, [form.reset]);

  const setAllToZero = useCallback(() => {
    Object.keys(nutritionData).forEach((key) => {
      form.setValue(key as IngredientKey, 0);
    });
  }, [form.setValue]);

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
    const defaultValues = Object.fromEntries(
      Object.keys(nutritionData).map((key) => [
        key,
        nutritionData[key as IngredientKey].defaultValue,
      ])
    ) as FormValues;
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
        <div className="absolute right-2 top-2 flex space-x-2">
          <HoverCard>
            <HoverCardTrigger asChild>
              <button
                type="button"
                className="reset-button"
                aria-label="View current recipe"
              >
                <List className="reset-icon" />
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <p className="font-semibold">Current Recipe</p>
              <Separator className="my-2" />
              <ul className="list-none p-0">
                {Object.entries(form.getValues())
                  .filter(([key, value]) => value > 0)
                  .sort(([, a], [, b]) => b - a)
                  .map(([key, value]) => (
                    <li key={key} className="mb-1">
                      {ingredientLabels[key]}: {value}g
                    </li>
                  ))}
              </ul>
            </HoverCardContent>
          </HoverCard>
          <button
            type="button"
            onClick={resetForm}
            className="reset-button"
            aria-label="Reset all ingredients to default values"
          >
            <ResetIcon className="reset-icon" />
          </button>
          <button
            type="button"
            onClick={setAllToZero}
            className="reset-button"
            aria-label="Set all ingredients to zero"
          >
            <PiNumberCircleZeroFill className="reset-icon" />
          </button>
        </div>
        <div className="nutrition-form-card-content">
          <Form {...form}>
            <form className="form-grid" onSubmit={form.handleSubmit(onSubmit)}>
              <Tabs defaultValue="liquids" className="tabs-container w-full">
                <TabNavigation></TabNavigation>

                <TabsContent value="liquids" className="ingredient-grid">
                  <IngredientFormItem
                    ingredients={ingredientCategories.liquids}
                    control={form.control}
                    nutritionData={nutritionData}
                    handleInputChange={handleInputChange}
                  />
                </TabsContent>

                <TabsContent value="oils" className="ingredient-grid">
                  <IngredientFormItem
                    ingredients={ingredientCategories.oils}
                    control={form.control}
                    nutritionData={nutritionData}
                    handleInputChange={handleInputChange}
                  />
                </TabsContent>

                <TabsContent value="fullSeeds" className="ingredient-grid">
                  <IngredientFormItem
                    ingredients={ingredientCategories.fullSeeds}
                    control={form.control}
                    nutritionData={nutritionData}
                    handleInputChange={handleInputChange}
                  />
                </TabsContent>

                <TabsContent value="carbohydrates" className="ingredient-grid">
                  <IngredientFormItem
                    ingredients={ingredientCategories.carbohydrates}
                    control={form.control}
                    nutritionData={nutritionData}
                    handleInputChange={handleInputChange}
                  />
                </TabsContent>

                <TabsContent value="powders" className="ingredient-grid">
                  <IngredientFormItem
                    ingredients={ingredientCategories.powders}
                    control={form.control}
                    nutritionData={nutritionData}
                    handleInputChange={handleInputChange}
                  />
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
      />
    </motion.div>
  );
};

export default NutritionForm;
