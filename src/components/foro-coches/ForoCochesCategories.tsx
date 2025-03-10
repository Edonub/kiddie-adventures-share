
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

interface ForoCochesCategoriesProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const ForoCochesCategories = ({ activeCategory, setActiveCategory }: ForoCochesCategoriesProps) => {
  const isMobile = useIsMobile();
  
  return (
    <Tabs defaultValue="General" value={activeCategory} onValueChange={setActiveCategory} className="mb-6">
      <TabsList className="grid grid-cols-5 w-full bg-[#444]">
        <TabsTrigger 
          value="General" 
          className="data-[state=active]:bg-[#ff4d4d] data-[state=active]:text-white truncate px-1"
        >
          <span className={`${isMobile ? 'text-xs' : 'text-sm'} truncate`}>General</span>
        </TabsTrigger>
        <TabsTrigger 
          value="Viajes" 
          className="data-[state=active]:bg-[#ff4d4d] data-[state=active]:text-white truncate px-1"
        >
          <span className={`${isMobile ? 'text-xs' : 'text-sm'} truncate`}>Viajes</span>
        </TabsTrigger>
        <TabsTrigger 
          value="Alojamientos" 
          className="data-[state=active]:bg-[#ff4d4d] data-[state=active]:text-white truncate px-1"
        >
          <span className={`${isMobile ? 'text-xs' : 'text-sm'} truncate`}>Alojamientos</span>
        </TabsTrigger>
        <TabsTrigger 
          value="Offtopic" 
          className="data-[state=active]:bg-[#ff4d4d] data-[state=active]:text-white truncate px-1"
        >
          <span className={`${isMobile ? 'text-xs' : 'text-sm'} truncate`}>Offtopic</span>
        </TabsTrigger>
        <TabsTrigger 
          value="Humor" 
          className="data-[state=active]:bg-[#ff4d4d] data-[state=active]:text-white truncate px-1"
        >
          <span className={`${isMobile ? 'text-xs' : 'text-sm'} truncate`}>Humor</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ForoCochesCategories;
