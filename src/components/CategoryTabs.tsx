
import { Link } from "react-router-dom";
import { Filter } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

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
  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="relative px-4">
        <ScrollArea className="max-w-full pb-4">
          <div className="flex items-center py-4 space-x-8 min-w-max">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                to={`/explorar?categoria=${category.slug}`}
                className={`flex flex-col items-center space-y-2 pb-2 min-w-[80px] border-b-2 transition-colors ${
                  activeCategory === category.id ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black hover:border-gray-300'
                }`}
              >
                <img src={category.icon} alt={category.name} className="w-6 h-6" />
                <span className="text-xs whitespace-nowrap">{category.name}</span>
              </Link>
            ))}
            <div className="border-l border-gray-200 pl-6">
              <Button variant="outline" size="sm" className="flex items-center gap-2 rounded-full border border-gray-300">
                <Filter size={16} />
                <span>Filtros</span>
              </Button>
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default CategoryTabs;
