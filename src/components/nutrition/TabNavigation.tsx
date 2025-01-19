import React from "react";
import { TabsList, TabsTrigger } from "~/components/ui/tabs";

export const TabNavigation = () => (
  <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
    <TabsTrigger value="liquids">Liquids</TabsTrigger>
    <TabsTrigger value="oils">Oils</TabsTrigger>
    <TabsTrigger value="carbohydrates">Carbohydrates</TabsTrigger>
    <TabsTrigger value="fullSeeds">Full Seeds</TabsTrigger>
    <TabsTrigger value="powders">Powders</TabsTrigger>
  </TabsList>
);
