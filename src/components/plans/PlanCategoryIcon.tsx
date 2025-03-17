
import React from "react";
import { 
  Sun, 
  Landmark, 
  Home, 
  Utensils, 
  LayoutGrid, 
  LucideIcon 
} from "lucide-react";

type CategoryIconProps = {
  category: string;
  size?: number;
  className?: string;
};

const PlanCategoryIcon: React.FC<CategoryIconProps> = ({ 
  category, 
  size = 18, 
  className = "" 
}) => {
  // Map categories to appropriate icons
  const getIcon = (): LucideIcon => {
    const lowerCategory = category.toLowerCase();
    
    if (lowerCategory.includes("aire libre")) return Sun;
    if (lowerCategory.includes("cultural")) return Landmark;
    if (lowerCategory.includes("interior")) return Home;
    if (lowerCategory.includes("comida")) return Utensils;
    
    // Default icon
    return LayoutGrid;
  };

  const Icon = getIcon();
  
  return <Icon size={size} className={className} />;
};

export default PlanCategoryIcon;
