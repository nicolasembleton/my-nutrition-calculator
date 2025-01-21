// src/App.tsx

import React from "react";
import NutritionForm from "./components/NutritionForm";
import { ThemeProvider } from "./lib/theme-provider";
import { ThemeToggle } from "./components/ui/theme-toggle";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors">
        <ThemeToggle />
        <NutritionForm />
      </div>
    </ThemeProvider>
  );
};

export default App;
