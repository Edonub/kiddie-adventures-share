
import { Link } from "react-router-dom";
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
    <div className="border-b border-gray-200 mb-3 w-full">
      <div className="relative w-full">
        <ScrollArea className="w-full pb-2">
          <div className="grid grid-cols-5 gap-4 py-2 w-full">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                to={`/explorar?categoria=${category.slug}`}
                className={`flex flex-col items-center justify-center space-y-1 pb-1 w-full border-b-2 transition-colors ${
                  activeCategory === category.id ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black hover:border-gray-300'
                }`}
              >
                <img 
                  src={category.icon} 
                  alt={category.name} 
                  className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} 
                />
                <span className="text-xs text-center w-full truncate px-1">{category.name}</span>
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default CategoryTabs;
