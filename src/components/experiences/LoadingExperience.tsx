
import React from "react";

const LoadingExperience: React.FC = () => {
  return (
    <main className="flex-1 flex justify-center items-center min-h-[80vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Cargando experiencia...</p>
      </div>
    </main>
  );
};

export default LoadingExperience;
