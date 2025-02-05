import { TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ingredientCategories } from "./constants";

export const TabNavigation = () => (
  <TabsList className="mb-0">
    <TabsTrigger value="dairy">Dairy</TabsTrigger>
    <TabsTrigger value="meats">Meats</TabsTrigger>
    <TabsTrigger value="oils">Oils</TabsTrigger>
    <TabsTrigger value="carbohydrates">Carbohydrates</TabsTrigger>
    <TabsTrigger value="fullSeeds">Full Seeds</TabsTrigger>
    <TabsTrigger value="powders">Powders</TabsTrigger>
  </TabsList>
);
