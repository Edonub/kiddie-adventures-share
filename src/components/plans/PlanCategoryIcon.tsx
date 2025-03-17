
import React from "react";
import { 
  Sun, 
  Landmark, 
  Home, 
  Utensils, 
  LayoutGrid,
  Music,
  Mountain,
  Wine,
  Ticket,
  Users,
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
    
    if (lowerCategory === "todos") return LayoutGrid;
    if (lowerCategory.includes("aire libre")) return Sun;
    if (lowerCategory.includes("cultural")) return Landmark;
    if (lowerCategory.includes("interior")) return Home;
    if (lowerCategory.includes("comida")) return Utensils;
    if (lowerCategory.includes("música") || lowerCategory.includes("musica")) return Music;
    if (lowerCategory.includes("aventura")) return Mountain;
    if (lowerCategory.includes("bebida")) return Wine;
    if (lowerCategory.includes("evento")) return Ticket;
    if (lowerCategory.includes("grupo")) return Users;
    
    // Default icon
    return LayoutGrid;
  };

  const Icon = getIcon();
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Icon size={size} className="text-familyxp-primary" strokeWidth={2} />
    </div>
  );
};

export default PlanCategoryIcon;
