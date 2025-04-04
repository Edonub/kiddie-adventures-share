
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import type { Plan } from "./types";
import { planCategories } from "./types";
import PlanCategoryIcon from "./PlanCategoryIcon";

interface PlanCategoriesProps {
  isLoading: boolean;
  recentPlans: Plan[]; // All plans to show in the "todos" tab
  plans: Plan[]; // All plans to filter by category
}

const PlanCategories = ({ isLoading, recentPlans, plans }: PlanCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState("todos");

  // Filter plans by category
  const getPlansByCategory = (category: string) => {
    if (category === "todos") return recentPlans;
    return plans.filter(plan => plan.category.toLowerCase() === category.toLowerCase());
  };

  // Check if a category has plans
  const categoryHasPlans = (category: string) => {
    if (category === "todos") return recentPlans.length > 0;
    return plans.some(plan => plan.category.toLowerCase() === category.toLowerCase());
  };

  const handleCategoryChange = (category: string) => {
    if (categoryHasPlans(category)) {
      setSelectedCategory(category);
    }
  };

  // Prevent default behavior for tabs that would navigate away
  const handleTabClick = (e: React.MouseEvent, category: string) => {
    if (!categoryHasPlans(category.toLowerCase())) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <Tabs value={selectedCategory} onValueChange={handleCategoryChange} defaultValue="todos">
        <TabsList className="mb-4 flex overflow-x-auto no-scrollbar py-2 whitespace-nowrap w-full justify-start">
          {planCategories.map((category) => {
            const hasContent = categoryHasPlans(category.toLowerCase());
            return (
              <TabsTrigger 
                key={category} 
                value={category.toLowerCase()}
                disabled={!hasContent}
                className={`${!hasContent ? "opacity-50 cursor-not-allowed" : ""} flex-shrink-0 mx-1 first:ml-0 min-w-[80px]`}
                onClick={(e) => handleTabClick(e, category)}
              >
                <div className="flex flex-col items-center gap-1 py-1.5">
                  <PlanCategoryIcon category={category} size={18} className="mb-1" />
                  <span className="text-xs font-medium">{category}</span>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>
        
        {planCategories.map((category) => (
          <TabsContent key={category} value={category.toLowerCase()} className="mt-2">
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-familyxp-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {getPlansByCategory(category.toLowerCase()).map((plan) => (
                  <PropertyCard 
                    key={plan.id}
                    id={plan.id.toString()}
                    title={plan.title}
                    images={[plan.image_url]}
                    location={plan.location || ""}
                    host={"Anfitrión"}
                    dates={"Fechas disponibles"}
                    price={plan.price || 0}
                    rating={4.5}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default PlanCategories;
