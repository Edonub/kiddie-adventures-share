
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
    <div className="border-b border-gray-200 mb-0.5 w-full">
      <div className="relative w-full">
        <ScrollArea className="w-full pb-1">
          <div className={isMobile 
            ? "flex overflow-x-auto py-1 w-full gap-1" 
            : "flex justify-between py-1 w-full"
          }>
            {categories.map((category) => (
              <Link 
                key={category.id} 
                to={`/explorar?categoria=${category.slug}`}
                className={`flex flex-col items-center justify-center px-2 py-1 rounded-lg transition-colors ${
                  activeCategory === category.id 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'text-gray-600 hover:bg-gray-100'
                } ${isMobile ? 'flex-shrink-0' : ''}`}
                style={{ minWidth: isMobile ? '60px' : 'auto' }}
              >
                <div className={`rounded-full bg-gray-100 p-1 mb-0.5 ${
                  activeCategory === category.id ? 'bg-primary/20' : ''
                }`}>
                  <img 
                    src={category.icon} 
                    alt={category.name} 
                    className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} 
                  />
                </div>
                <span className="text-[10px] text-center w-full truncate">{category.name}</span>
              </Link>
            ))}
          </div>
          {isMobile && <ScrollBar orientation="horizontal" />}
        </ScrollArea>
      </div>
    </div>
  );
};

export default CategoryTabs;
