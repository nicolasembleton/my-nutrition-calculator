// src/App.tsx

import React from "react";
import NutritionForm from "./components/NutritionForm";
import { ThemeToggle } from "./components/ui/theme-toggle";
import { ThemeProvider } from "./lib/theme-provider";

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
