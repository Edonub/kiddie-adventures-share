
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Plane } from "lucide-react";
import CategorySelector from "@/components/CategorySelector";

const categories = [
  { id: 1, name: "Planes", icon: <Plane className="w-4 h-4 mr-1.5" /> },
  { id: 2, name: "Todos" },
  { id: 3, name: "Al aire libre" },
  { id: 4, name: "Cultural" },
  { id: 5, name: "Interior" },
  { id: 6, name: "Comida y bebida" },
  { id: 7, name: "Excursiones" },
  { id: 8, name: "Aventura" },
];

const CategoriasPage = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<number>(1);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 pt-4 w-full">
        <div className="container mx-auto px-4">
          {/* Category Selection using the reusable CategorySelector component */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <CategorySelector 
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={(id) => setSelectedCategory(Number(id))}
            />
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
            <p className="text-gray-600">
              Content for {categories.find(c => c.id === selectedCategory)?.name} category will appear here.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoriasPage;
