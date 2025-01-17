import React, { useState, useEffect } from "react";
import { nutritionData } from "../../docs/defaultValues.js";

const NutritionForm: React.FC = () => {
  const [ingredientValues, setIngredientValues] = useState({
    goldenFlaxSeeds: nutritionData.goldenFlaxSeeds.defaultValue,
    brownFlaxSeeds: nutritionData.brownFlaxSeeds.defaultValue,
    oatmeal: nutritionData.oatmeal.defaultValue,
    cocoaNibs: nutritionData.cocoaNibs.defaultValue,
    rawCocoaPowder: nutritionData.rawCocoaPowder.defaultValue,
    almonds: nutritionData.almonds.defaultValue,
    gojiBerries: nutritionData.gojiBerries.defaultValue,
    pumpkinSeeds: nutritionData.pumpkinSeeds.defaultValue,
    macadamiaNuts: nutritionData.macadamiaNuts.defaultValue,
    coconutOil: nutritionData.coconutOil.defaultValue,
    hempSeedsPowder: nutritionData.hempSeedsPowder.defaultValue,
    wholeMilk: nutritionData.wholeMilk.defaultValue,
    chiaSeeds: nutritionData.chiaSeeds.defaultValue,
    driedRaisins: nutritionData.driedRaisins.defaultValue,
    quinoaPowder: nutritionData.quinoaPowder.defaultValue,
    almondsPowder: nutritionData.almondsPowder.defaultValue,
    macadamiaPowder: nutritionData.macadamiaPowder.defaultValue,
    blackBeansPowder: nutritionData.blackBeansPowder.defaultValue,
    redBeansPowder: nutritionData.redBeansPowder.defaultValue,
    mungBeansPowder: nutritionData.mungBeansPowder.defaultValue,
    chickpeaPowder: nutritionData.chickpeaPowder.defaultValue,
    brownRicePowder: nutritionData.brownRicePowder.defaultValue,
  });
  const [totalNutrition, setTotalNutrition] = useState({
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const parsedValue = parseFloat(value);

    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setIngredientValues({
        ...ingredientValues,
        [name]: parsedValue,
      });
    } else if (value === '') {
      setIngredientValues({
        ...ingredientValues,
        [name]: '',
      });
    }
  };

  const calculateTotalNutrition = () => {
    const nutrition = {
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

    Object.keys(ingredientValues).forEach((ingredient) => {
      const amount = parseFloat(ingredientValues[ingredient]);
      const data = nutritionData[ingredient].nutrition;

      if (!isNaN(amount)) {
        nutrition.calories += (data.calories / 100) * amount;
        nutrition.totalFat += (data.totalFat / 100) * amount;
        nutrition.saturatedFat += (data.saturatedFat / 100) * amount;
        nutrition.polyunsaturatedFat +=
          (data.polyunsaturatedFat / 100) * amount;
        nutrition.monounsaturatedFat +=
          (data.monounsaturatedFat / 100) * amount;
        nutrition.cholesterol += (data.cholesterol / 100) * amount;
        nutrition.sodium += (data.sodium / 100) * amount;
        nutrition.totalCarbohydrate += (data.totalCarbohydrate / 100) * amount;
        nutrition.dietaryFiber += (data.dietaryFiber / 100) * amount;
        nutrition.sugars += (data.sugars / 100) * amount;
        nutrition.protein += (data.protein / 100) * amount;
        nutrition.iron += (data.iron / 100) * amount || 0;
        nutrition.calcium += (data.calcium / 100) * amount || 0;
        nutrition.magnesium += (data.magnesium / 100) * amount || 0;
        nutrition.potassium += (data.potassium / 100) * amount || 0;
        nutrition.vitaminA += (data.vitaminA / 100) * amount || 0;
        nutrition.vitaminC += (data.vitaminC / 100) * amount || 0;
        nutrition.vitaminD += (data.vitaminD / 100) * amount || 0;
        nutrition.zinc += (data.zinc / 100) * amount || 0;
      }
    });

    setTotalNutrition(nutrition);
  };

  useEffect(() => {
    calculateTotalNutrition();
  }, [ingredientValues]);

  return (
    <div>
      <form>
        {Object.keys(ingredientValues).map((ingredient) => (
          <div key={ingredient}>
            <label htmlFor={ingredient}>{ingredient}</label>
            <input
              type="number"
              id={ingredient}
              name={ingredient}
              value={ingredientValues[ingredient]}
              onChange={handleInputChange}
            />
          </div>
        ))}
        <button type="button" onClick={calculateTotalNutrition}>Calculate</button>
      </form>
      <div className="nutrition-label">
        <h2>Total Nutrition</h2>
        <div className="nutrition-header">
          <div className="serving-size">Serving Size: 100g</div>
          <div className="calories">Calories: {totalNutrition.calories.toFixed(2)}</div>
        </div>
        <div className="nutrition-content">
          <div className="nutrient-section">
            <div className="nutrient">Total Fat: {totalNutrition.totalFat.toFixed(2)}g</div>
            <div className="nutrient">Saturated Fat: {totalNutrition.saturatedFat.toFixed(2)}g</div>
            <div className="nutrient">Polyunsaturated Fat: {totalNutrition.polyunsaturatedFat.toFixed(2)}g</div>
            <div className="nutrient">Monounsaturated Fat: {totalNutrition.monounsaturatedFat.toFixed(2)}g</div>
            <div className="nutrient">Cholesterol: {totalNutrition.cholesterol.toFixed(2)}mg</div>
            <div className="nutrient">Sodium: {totalNutrition.sodium.toFixed(2)}mg</div>
          </div>
          <div className="nutrient-section">
            <div className="nutrient">Total Carbohydrate: {totalNutrition.totalCarbohydrate.toFixed(2)}g</div>
            <div className="nutrient">Dietary Fiber: {totalNutrition.dietaryFiber.toFixed(2)}g</div>
            <div className="nutrient">Sugars: {totalNutrition.sugars.toFixed(2)}g</div>
            <div className="nutrient">Protein: {totalNutrition.protein.toFixed(2)}g</div>
          </div>
          <div className="nutrient-section">
            <div className="nutrient">Iron: {totalNutrition.iron.toFixed(2)}mg</div>
            <div className="nutrient">Calcium: {totalNutrition.calcium.toFixed(2)}mg</div>
            <div className="nutrient">Magnesium: {totalNutrition.magnesium.toFixed(2)}mg</div>
            <div className="nutrient">Potassium: {totalNutrition.potassium.toFixed(2)}mg</div>
            <div className="nutrient">Vitamin A: {totalNutrition.vitaminA.toFixed(2)}IU</div>
            <div className="nutrient">Vitamin C: {totalNutrition.vitaminC.toFixed(2)}mg</div>
            <div className="nutrient">Vitamin D: {totalNutrition.vitaminD.toFixed(2)}IU</div>
            <div className="nutrient">Zinc: {totalNutrition.zinc.toFixed(2)}mg</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionForm;
 import "./NutritionForm.css"; // Import the CSS file
