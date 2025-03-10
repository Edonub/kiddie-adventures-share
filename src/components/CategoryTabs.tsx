
import { Link } from "react-router-dom";
import { Filter } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  slug: string;
}

interface CategoryTabsProps {
  categories: CategoryItem[];
  activeCategory?: string;
}

const CategoryTabs = ({ categories, activeCategory }: CategoryTabsProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="relative">
        <ScrollArea className="max-w-full pb-4">
          <div className="flex items-center py-4 space-x-6 min-w-max">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                to={`/explorar?categoria=${category.slug}`}
                className={`flex flex-col items-center space-y-2 pb-2 min-w-[60px] border-b-2 transition-colors ${
                  activeCategory === category.id ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black hover:border-gray-300'
                }`}
              >
                <img 
                  src={category.icon} 
                  alt={category.name} 
                  className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} 
                />
                <span className="text-xs whitespace-nowrap">{category.name}</span>
              </Link>
            ))}
            {/* Only show filter button with text on desktop */}
            {isMobile ? (
              <div className="border-l border-gray-200 pl-4">
                <Button variant="outline" size="sm" className="flex items-center rounded-full border border-gray-300 w-10 h-10 p-0 justify-center">
                  <Filter size={16} />
                </Button>
              </div>
            ) : (
              <div className="border-l border-gray-200 pl-6">
                <Button variant="outline" size="sm" className="flex items-center gap-2 rounded-full border border-gray-300">
                  <Filter size={16} />
                  <span>Filtros</span>
                </Button>
              </div>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default CategoryTabs;
