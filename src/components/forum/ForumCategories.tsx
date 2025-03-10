
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Baby, Palmtree, Home, School, PartyPopper } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export type ForumCategory = "general" | "viajes" | "alojamientos" | "offtopic" | "humor";

interface ForumCategoriesProps {
  selectedCategory: ForumCategory;
  onCategoryChange: (category: ForumCategory) => void;
}

const ForumCategories = ({ selectedCategory, onCategoryChange }: ForumCategoriesProps) => {
  // Use the main blue color from the design system
  const iconColor = "#0077b6"; // familyxp-primary color
  const isMobile = useIsMobile();
  
  // Determine icon size based on screen size
  const iconSize = isMobile ? 20 : 24;

  return (
    <Tabs 
      defaultValue={selectedCategory} 
      className="w-full"
      onValueChange={(value) => onCategoryChange(value as ForumCategory)}
    >
      <TabsList className="grid grid-cols-5 w-full h-auto border-0 bg-transparent gap-1 p-0">
        <TabsTrigger 
          value="general" 
          className="flex flex-col items-center justify-center gap-1 py-3 px-1 rounded bg-white border border-gray-200 data-[state=active]:bg-familyxp-primary data-[state=active]:text-white hover:bg-gray-50 flex-1"
        >
          <Home size={iconSize} color={selectedCategory === "general" ? "white" : iconColor} />
          <span className="text-xs truncate w-full text-center">General</span>
        </TabsTrigger>
        <TabsTrigger 
          value="viajes" 
          className="flex flex-col items-center justify-center gap-1 py-3 px-1 rounded bg-white border border-gray-200 data-[state=active]:bg-familyxp-primary data-[state=active]:text-white hover:bg-gray-50 flex-1"
        >
          <Palmtree size={iconSize} color={selectedCategory === "viajes" ? "white" : iconColor} />
          <span className="text-xs truncate w-full text-center">Viajes</span>
        </TabsTrigger>
        <TabsTrigger 
          value="alojamientos" 
          className="flex flex-col items-center justify-center gap-1 py-3 px-1 rounded bg-white border border-gray-200 data-[state=active]:bg-familyxp-primary data-[state=active]:text-white hover:bg-gray-50 flex-1"
        >
          <Heart size={iconSize} color={selectedCategory === "alojamientos" ? "white" : iconColor} />
          <span className="text-xs truncate w-full text-center">Hospedaje</span>
        </TabsTrigger>
        <TabsTrigger 
          value="offtopic" 
          className="flex flex-col items-center justify-center gap-1 py-3 px-1 rounded bg-white border border-gray-200 data-[state=active]:bg-familyxp-primary data-[state=active]:text-white hover:bg-gray-50 flex-1"
        >
          <School size={iconSize} color={selectedCategory === "offtopic" ? "white" : iconColor} />
          <span className="text-xs truncate w-full text-center">Offtopic</span>
        </TabsTrigger>
        <TabsTrigger 
          value="humor" 
          className="flex flex-col items-center justify-center gap-1 py-3 px-1 rounded bg-white border border-gray-200 data-[state=active]:bg-familyxp-primary data-[state=active]:text-white hover:bg-gray-50 flex-1"
        >
          <PartyPopper size={iconSize} color={selectedCategory === "humor" ? "white" : iconColor} />
          <span className="text-xs truncate w-full text-center">Humor</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ForumCategories;
