
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Home, Compass, Building, Tag, Laugh } from "lucide-react";

export type ForumCategory = "general" | "viajes" | "alojamientos" | "offtopic" | "humor";

interface ForumCategoriesProps {
  selectedCategory: ForumCategory;
  onCategoryChange: (category: ForumCategory) => void;
}

const ForumCategories = ({ selectedCategory, onCategoryChange }: ForumCategoriesProps) => {
  return (
    <Tabs 
      defaultValue={selectedCategory} 
      className="w-full"
      onValueChange={(value) => onCategoryChange(value as ForumCategory)}
    >
      <TabsList className="grid grid-cols-5 w-full h-auto border-0 bg-transparent gap-1 p-0">
        <TabsTrigger 
          value="general" 
          className="flex flex-col items-center gap-1 py-3 rounded bg-white border border-gray-200 data-[state=active]:bg-familyxp-primary data-[state=active]:text-white hover:bg-gray-50"
        >
          <Home size={18} />
          <span className="text-xs">General</span>
        </TabsTrigger>
        <TabsTrigger 
          value="viajes" 
          className="flex flex-col items-center gap-1 py-3 rounded bg-white border border-gray-200 data-[state=active]:bg-familyxp-primary data-[state=active]:text-white hover:bg-gray-50"
        >
          <Compass size={18} />
          <span className="text-xs">Viajes</span>
        </TabsTrigger>
        <TabsTrigger 
          value="alojamientos" 
          className="flex flex-col items-center gap-1 py-3 rounded bg-white border border-gray-200 data-[state=active]:bg-familyxp-primary data-[state=active]:text-white hover:bg-gray-50"
        >
          <Building size={18} />
          <span className="text-xs">Hospedaje</span>
        </TabsTrigger>
        <TabsTrigger 
          value="offtopic" 
          className="flex flex-col items-center gap-1 py-3 rounded bg-white border border-gray-200 data-[state=active]:bg-familyxp-primary data-[state=active]:text-white hover:bg-gray-50"
        >
          <Tag size={18} />
          <span className="text-xs">Offtopic</span>
        </TabsTrigger>
        <TabsTrigger 
          value="humor" 
          className="flex flex-col items-center gap-1 py-3 rounded bg-white border border-gray-200 data-[state=active]:bg-familyxp-primary data-[state=active]:text-white hover:bg-gray-50"
        >
          <Laugh size={18} />
          <span className="text-xs">Humor</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ForumCategories;
