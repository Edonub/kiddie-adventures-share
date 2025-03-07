
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import SearchBar from "./SearchBar";

const HeroSection = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
          alt="Experiencias familiares" 
          className="h-full w-full object-cover brightness-50"
        />
      </div>
      
      <div className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center text-white">
        <h1 className="mb-3 text-4xl font-bold md:text-5xl lg:text-6xl">
          Experiencias familiares inolvidables
        </h1>
        <p className="mb-6 max-w-2xl text-lg md:text-xl">
          Descubre actividades únicas para disfrutar con los más pequeños y crear recuerdos que durarán toda la vida
        </p>
        
        <div className="mb-8 w-full max-w-3xl">
          <SearchBar variant="home" />
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
            Cómo funciona
          </Button>
          <Button className="bg-familyxp-primary hover:bg-familyxp-secondary">
            Crear actividad <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
