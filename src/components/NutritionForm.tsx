import { motion } from "framer-motion";
import React, { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { TabNavigation } from "./nutrition/TabNavigation";
import { calculateNutrition } from "./nutrition/calculateNutrition";
import { downloadCSV } from "./nutrition/generateCSV";

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
        formValues={form.getValues()}
      />
    </motion.div>
  );
};

export default NutritionForm;
