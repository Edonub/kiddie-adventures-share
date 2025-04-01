
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CategoriasPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 pt-4 w-full">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
            <p className="text-gray-600">
              Contenido de categorías aparecerá aquí.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoriasPage;
