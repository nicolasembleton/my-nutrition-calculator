// src/App.tsx

import React from 'react';
import NutritionForm from './components/NutritionForm';

const App: React.FC = () => {
  return (
    <div>
      <h1>Nutrition Calculator</h1>
      <NutritionForm />
    </div>
  );
};

export default App;
