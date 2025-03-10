
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Baby, Palmtree, Home, School, PartyPopper } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export type ForumCategory = "general" | "viajes" | "alojamientos" | "offtopic" | "humor";

interface ForumCategoriesProps {
  selectedCategory: ForumCategory;
  onCategoryChange: (category: ForumCategory) => void;
}

const ForumCategories = ({ selectedCategory, onCategoryChange }: ForumCategoriesProps) => {
  const iconColor = "#0077b6";
  const isMobile = useIsMobile();
  const iconSize = isMobile ? 20 : 24;

  return (
    <Tabs 
      defaultValue={selectedCategory} 
      className="w-full"
      onValueChange={(value) => onCategoryChange(value as ForumCategory)}
    >
      <TabsList className="grid w-full grid-cols-5 gap-1 h-auto border-0 bg-transparent p-0">
        <TabsTrigger 
          value="general" 
          className="flex flex-col items-center justify-center gap-1 py-3 px-1 rounded bg-white border border-gray-200 data-[state=active]:bg-familyxp-primary data-[state=active]:text-white hover:bg-gray-50 w-full"
        >
          <Home size={iconSize} color={selectedCategory === "general" ? "white" : iconColor} />
          <span className="text-xs w-full text-center truncate">General</span>
        </TabsTrigger>
        <TabsTrigger 
          value="viajes" 
          className="flex flex-col items-center justify-center gap-1 py-3 px-1 rounded bg-white border border-gray-200 data-[state=active]:bg-familyxp-primary data-[state=active]:text-white hover:bg-gray-50 w-full"
        >
          <Palmtree size={iconSize} color={selectedCategory === "viajes" ? "white" : iconColor} />
          <span className="text-xs w-full text-center truncate">Viajes</span>
        </TabsTrigger>
        <TabsTrigger 
          value="alojamientos" 
          className="flex flex-col items-center justify-center gap-1 py-3 px-1 rounded bg-white border border-gray-200 data-[state=active]:bg-familyxp-primary data-[state=active]:text-white hover:bg-gray-50 w-full"
        >
          <Heart size={iconSize} color={selectedCategory === "alojamientos" ? "white" : iconColor} />
          <span className="text-xs w-full text-center truncate">Hospedaje</span>
        </TabsTrigger>
        <TabsTrigger 
          value="offtopic" 
          className="flex flex-col items-center justify-center gap-1 py-3 px-1 rounded bg-white border border-gray-200 data-[state=active]:bg-familyxp-primary data-[state=active]:text-white hover:bg-gray-50 w-full"
        >
          <School size={iconSize} color={selectedCategory === "offtopic" ? "white" : iconColor} />
          <span className="text-xs w-full text-center truncate">Offtopic</span>
        </TabsTrigger>
        <TabsTrigger 
          value="humor" 
          className="flex flex-col items-center justify-center gap-1 py-3 px-1 rounded bg-white border border-gray-200 data-[state=active]:bg-familyxp-primary data-[state=active]:text-white hover:bg-gray-50 w-full"
        >
          <PartyPopper size={iconSize} color={selectedCategory === "humor" ? "white" : iconColor} />
          <span className="text-xs w-full text-center truncate">Humor</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ForumCategories;
