
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Baby, Palmtree, Home, School, PartyPopper } from "lucide-react";

export type ForumCategory = "general" | "viajes" | "alojamientos" | "offtopic" | "humor";

interface ForumCategoriesProps {
  selectedCategory: ForumCategory;
  onCategoryChange: (category: ForumCategory) => void;
}

const ForumCategories = ({ selectedCategory, onCategoryChange }: ForumCategoriesProps) => {
  // Use the main blue color from the design system
  const iconColor = "#0077b6"; // familyxp-primary color

  return (
    <Tabs 
      defaultValue={selectedCategory} 
      className="w-full"
      onValueChange={(value) => onCategoryChange(value as ForumCategory)}
    >
      <TabsList className="grid grid-cols-5 w-full h-auto border-0 bg-transparent gap-1 p-0">
        <TabsTrigger 
          value="general" 
          className="flex flex-col items-center justify-center gap-1 py-3 px-0 rounded bg-white border border-gray-200 data-[state=active]:bg-familyxp-primary data-[state=active]:text-white hover:bg-gray-50 flex-1"
        >
          <Home size={20} color={selectedCategory === "general" ? "white" : iconColor} />
          <span className="text-xs">General</span>
        </TabsTrigger>
        <TabsTrigger 
          value="viajes" 
          className="flex flex-col items-center justify-center gap-1 py-3 px-0 rounded bg-white border border-gray-200 data-[state=active]:bg-familyxp-primary data-[state=active]:text-white hover:bg-gray-50 flex-1"
        >
          <Palmtree size={20} color={selectedCategory === "viajes" ? "white" : iconColor} />
          <span className="text-xs">Viajes</span>
        </TabsTrigger>
        <TabsTrigger 
          value="alojamientos" 
          className="flex flex-col items-center justify-center gap-1 py-3 px-0 rounded bg-white border border-gray-200 data-[state=active]:bg-familyxp-primary data-[state=active]:text-white hover:bg-gray-50 flex-1"
        >
          <Heart size={20} color={selectedCategory === "alojamientos" ? "white" : iconColor} />
          <span className="text-xs">Hospedaje</span>
        </TabsTrigger>
        <TabsTrigger 
          value="offtopic" 
          className="flex flex-col items-center justify-center gap-1 py-3 px-0 rounded bg-white border border-gray-200 data-[state=active]:bg-familyxp-primary data-[state=active]:text-white hover:bg-gray-50 flex-1"
        >
          <School size={20} color={selectedCategory === "offtopic" ? "white" : iconColor} />
          <span className="text-xs">Offtopic</span>
        </TabsTrigger>
        <TabsTrigger 
          value="humor" 
          className="flex flex-col items-center justify-center gap-1 py-3 px-0 rounded bg-white border border-gray-200 data-[state=active]:bg-familyxp-primary data-[state=active]:text-white hover:bg-gray-50 flex-1"
        >
          <PartyPopper size={20} color={selectedCategory === "humor" ? "white" : iconColor} />
          <span className="text-xs">Humor</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ForumCategories;
