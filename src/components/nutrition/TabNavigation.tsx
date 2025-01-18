import React from 'react';
import { TabsList, TabsTrigger } from "~/components/ui/tabs";

export const TabNavigation = () => (
  <TabsList className="h-10 rounded-md bg-muted p-1 text-muted-foreground inline-flex items-center justify-center">
    <TabsTrigger value="liquids">Liquids</TabsTrigger>
    <TabsTrigger value="oils">Oils</TabsTrigger>
    <TabsTrigger value="carbohydrates">Carbohydrates</TabsTrigger>
    <TabsTrigger value="fullSeeds">Full Seeds</TabsTrigger>
    <TabsTrigger value="powders">Powders</TabsTrigger>
  </TabsList>
);
