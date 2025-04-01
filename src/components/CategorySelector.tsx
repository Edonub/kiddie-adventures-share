
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LucideIcon } from "lucide-react";

interface Category {
  id: number | string;
  name: string;
  icon?: React.ReactNode;
}

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: number | string;
  onSelectCategory: (id: number | string) => void;
  className?: string;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  className = "",
}) => {
  return (
    <ScrollArea className={`w-full ${className}`}>
      <div className="flex overflow-x-auto py-2 gap-2 scrollbar-none">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition-colors flex items-center ${
              selectedCategory === category.id
                ? 'bg-familyxp-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.icon}
            {category.name}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CategorySelector;
