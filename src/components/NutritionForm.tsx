import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { nutritionData } from "../../docs/defaultValues.js";
import { useForm, Controller } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import "./NutritionForm.css";

type IngredientKey = keyof typeof nutritionData;

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

interface FormValues {
  [key: string]: number;
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
    defaultValues: Object.keys(nutritionData).reduce((acc, key) => ({
      ...acc,
      [key]: nutritionData[key as IngredientKey].defaultValue
    }), {} as FormValues)
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
      onChange(parsedValue);
    } else if (value === "") {
      onChange(0);
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
        zinc: 0
      };

          Object.keys(data).forEach((ingredient) => {
        const amount = data[ingredient];
        const key = ingredient as IngredientKey;
        const nutritionDataItem = nutritionData[key].nutrition;

        if (!isNaN(amount)) {
          nutrition.calories += (nutritionDataItem.calories / 100) * amount;
          nutrition.totalFat += (nutritionDataItem.totalFat / 100) * amount;
          nutrition.saturatedFat += (nutritionDataItem.saturatedFat / 100) * amount;
          nutrition.polyunsaturatedFat +=
            (nutritionDataItem.polyunsaturatedFat / 100) * amount;
          nutrition.monounsaturatedFat +=
            (nutritionDataItem.monounsaturatedFat / 100) * amount;
          nutrition.cholesterol += (nutritionDataItem.cholesterol / 100) * amount;
          nutrition.sodium += (nutritionDataItem.sodium / 100) * amount;
          nutrition.totalCarbohydrate += (nutritionDataItem.totalCarbohydrate / 100) * amount;
          nutrition.dietaryFiber += (nutritionDataItem.dietaryFiber / 100) * amount;
          nutrition.sugars += (nutritionDataItem.sugars / 100) * amount;
          nutrition.protein += (nutritionDataItem.protein / 100) * amount;
          nutrition.iron += (nutritionDataItem.iron / 100) * amount || 0;
          nutrition.calcium += (nutritionDataItem.calcium / 100) * amount || 0;
          nutrition.magnesium += (nutritionDataItem.magnesium / 100) * amount || 0;
          nutrition.potassium += (nutritionDataItem.potassium / 100) * amount || 0;
          nutrition.vitaminA += (nutritionDataItem.vitaminA / 100) * amount || 0;
          nutrition.vitaminC += (nutritionDataItem.vitaminC / 100) * amount || 0;
          nutrition.vitaminD += (nutritionDataItem.vitaminD / 100) * amount || 0;
          nutrition.zinc += (nutritionDataItem.zinc / 100) * amount || 0;
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

        <div className="nutrition-form-container">
          <div className="nutrition-form-card">
            <div className="nutrition-form-card-header">
              <h2>Nutrition Calculator</h2>
            </div>
            <div className="nutrition-form-card-content">
              <Form {...form}>
                <form className="form-grid" onSubmit={form.handleSubmit(onSubmit)}>
                  {(Object.keys(nutritionData) as NutritionIngredient[]).map((ingredient) => (
                    <FormField
                      key={ingredient}
                      name={ingredient}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{ingredientLabels[ingredient]}</FormLabel>
                          <FormControl>
                            <input
                              type="number"
                              {...field}
                              onChange={(e) => handleInputChange(e, field.onChange)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <Button type="submit">Calculate</Button>
                </form>
              </Form>
            </div>
          </div>

         <motion.div
           className="nutrition-label"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
         >
           <h2>Total Nutrition</h2>
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
       </div>
       return (
      <div className="nutrition-form-container">
        <div className="nutrition-form-card">
          <div className="nutrition-form-card-header">
            <h2>Nutrition Calculator</h2>
          </div>
          <div className="nutrition-form-card-content">
            <Form {...form}>
              <form className="form-grid" onSubmit={form.handleSubmit(onSubmit)}>
                {Object.keys(nutritionData).map((ingredient) => {
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
                              {...field}
                              onChange={(e) => handleInputChange(e, field.onChange)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                })}
                <Button type="submit">Calculate</Button>
              </form>
            </Form>
          </div>
        </div>
        <motion.div
          className="nutrition-label"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Total Nutrition</h2>
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
      </div>
    );
      };

      export default NutritionForm;
