
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ForoCochesCategoriesProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const ForoCochesCategories = ({ activeCategory, setActiveCategory }: ForoCochesCategoriesProps) => {
  return (
    <Tabs defaultValue="General" value={activeCategory} onValueChange={setActiveCategory} className="mb-6">
      <TabsList className="grid grid-cols-5 md:w-auto w-full bg-[#444]">
        <TabsTrigger value="General" className="data-[state=active]:bg-[#ff4d4d] data-[state=active]:text-white">
          General
        </TabsTrigger>
        <TabsTrigger value="Viajes" className="data-[state=active]:bg-[#ff4d4d] data-[state=active]:text-white">
          Viajes
        </TabsTrigger>
        <TabsTrigger value="Alojamientos" className="data-[state=active]:bg-[#ff4d4d] data-[state=active]:text-white">
          Alojamientos
        </TabsTrigger>
        <TabsTrigger value="Offtopic" className="data-[state=active]:bg-[#ff4d4d] data-[state=active]:text-white">
          Offtopic
        </TabsTrigger>
        <TabsTrigger value="Humor" className="data-[state=active]:bg-[#ff4d4d] data-[state=active]:text-white">
          Humor
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ForoCochesCategories;
