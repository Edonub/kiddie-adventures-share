
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MyExperiencesLoading: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando experiencias...</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyExperiencesLoading;
