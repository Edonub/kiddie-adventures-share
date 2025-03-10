
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
          className="flex flex-col items-center gap-1 py-3 rounded bg-[#3a3a3a] data-[state=active]:bg-[#ff4d4d] data-[state=active]:text-white"
        >
          <Home size={18} />
          <span className="text-xs">General</span>
        </TabsTrigger>
        <TabsTrigger 
          value="viajes" 
          className="flex flex-col items-center gap-1 py-3 rounded bg-[#3a3a3a] data-[state=active]:bg-[#ff4d4d] data-[state=active]:text-white"
        >
          <Compass size={18} />
          <span className="text-xs">Viajes</span>
        </TabsTrigger>
        <TabsTrigger 
          value="alojamientos" 
          className="flex flex-col items-center gap-1 py-3 rounded bg-[#3a3a3a] data-[state=active]:bg-[#ff4d4d] data-[state=active]:text-white"
        >
          <Building size={18} />
          <span className="text-xs">Hospedaje</span>
        </TabsTrigger>
        <TabsTrigger 
          value="offtopic" 
          className="flex flex-col items-center gap-1 py-3 rounded bg-[#3a3a3a] data-[state=active]:bg-[#ff4d4d] data-[state=active]:text-white"
        >
          <Tag size={18} />
          <span className="text-xs">Offtopic</span>
        </TabsTrigger>
        <TabsTrigger 
          value="humor" 
          className="flex flex-col items-center gap-1 py-3 rounded bg-[#3a3a3a] data-[state=active]:bg-[#ff4d4d] data-[state=active]:text-white"
        >
          <Laugh size={18} />
          <span className="text-xs">Humor</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ForumCategories;
