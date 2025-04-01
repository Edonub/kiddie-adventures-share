
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plane } from "lucide-react";

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
          {/* Category Selection Bar */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <ScrollArea className="w-full">
              <div className="flex overflow-x-auto py-2 gap-2 scrollbar-none">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
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
