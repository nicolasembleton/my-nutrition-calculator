import { TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ingredientCategories } from "./constants";

export const TabNavigation = () => (
  <TabsList className="scr relative mb-0 flex h-10 max-w-full items-center justify-start overflow-x-auto rounded-md bg-muted p-1 text-muted-foreground">
    <TabsTrigger value="dairy" className="transition-all duration-300">
      Dairy
    </TabsTrigger>
    <TabsTrigger value="meats" className="transition-all duration-300">
      Meats
    </TabsTrigger>
    <TabsTrigger value="oils" className="transition-all duration-300">
      Oils
    </TabsTrigger>
    <TabsTrigger value="carbohydrates" className="transition-all duration-300">
      Carbohydrates
    </TabsTrigger>
    <TabsTrigger value="fullSeeds" className="transition-all duration-300">
      Full Seeds
    </TabsTrigger>
    <TabsTrigger value="powders" className="transition-all duration-300">
      Powders
    </TabsTrigger>
    <TabsTrigger value="fruits" className="transition-all duration-300">
      Fruits
    </TabsTrigger>
  </TabsList>
);
