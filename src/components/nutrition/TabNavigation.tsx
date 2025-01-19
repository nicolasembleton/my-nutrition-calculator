import { TabsList, TabsTrigger } from "~/components/ui/tabs";

export const TabNavigation = () => (
  <TabsList className="mb-0">
    <TabsTrigger value="liquids">Liquids</TabsTrigger>
    <TabsTrigger value="oils">Oils</TabsTrigger>
    <TabsTrigger value="carbohydrates">Carbohydrates</TabsTrigger>
    <TabsTrigger value="fullSeeds">Full Seeds</TabsTrigger>
    <TabsTrigger value="powders">Powders</TabsTrigger>
  </TabsList>
);
