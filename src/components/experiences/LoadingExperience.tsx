
import React from "react";

const LoadingExperience: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="ml-4 text-gray-600">Cargando experiencia...</p>
      </div>
    </div>
  );
};

export default LoadingExperience;
