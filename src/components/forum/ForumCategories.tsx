
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessageSquare, Home, Compass, Car, Laugh, Tag } from "lucide-react";

export type ForumCategory = "general" | "viajes" | "alojamientos" | "offtopic" | "humor";

interface ForumCategoriesProps {
  selectedCategory: ForumCategory;
  onCategoryChange: (category: ForumCategory) => void;
}

const ForumCategories = ({ selectedCategory, onCategoryChange }: ForumCategoriesProps) => {
  return (
    <Tabs 
      defaultValue={selectedCategory} 
      className="w-full mb-6"
      onValueChange={(value) => onCategoryChange(value as ForumCategory)}
    >
      <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
        <TabsTrigger value="general" className="flex items-center gap-2">
          <Home size={16} />
          <span className="hidden sm:inline">General</span>
        </TabsTrigger>
        <TabsTrigger value="viajes" className="flex items-center gap-2">
          <Compass size={16} />
          <span className="hidden sm:inline">Viajes</span>
        </TabsTrigger>
        <TabsTrigger value="alojamientos" className="flex items-center gap-2">
          <Home size={16} />
          <span className="hidden sm:inline">Alojamientos</span>
        </TabsTrigger>
        <TabsTrigger value="offtopic" className="flex items-center gap-2">
          <Tag size={16} />
          <span className="hidden sm:inline">Offtopic</span>
        </TabsTrigger>
        <TabsTrigger value="humor" className="flex items-center gap-2">
          <Laugh size={16} />
          <span className="hidden sm:inline">Humor</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ForumCategories;
