
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
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default CategoryTabs;
