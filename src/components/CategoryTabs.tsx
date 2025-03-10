
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
    <div className="border-b border-gray-200 mb-3">
      <div className="relative">
        <ScrollArea className="max-w-full pb-2">
          <div className="flex items-center py-2 space-x-4 min-w-max">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                to={`/explorar?categoria=${category.slug}`}
                className={`flex flex-col items-center space-y-1 pb-1 min-w-[50px] border-b-2 transition-colors ${
                  activeCategory === category.id ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black hover:border-gray-300'
                }`}
              >
                <img 
                  src={category.icon} 
                  alt={category.name} 
                  className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} 
                />
                <span className="text-xs whitespace-nowrap">{category.name}</span>
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
