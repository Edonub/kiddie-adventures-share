
import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

const locations = [
  "New York", 
  "London", 
  "Tokyo", 
  "Paris", 
  "Sydney", 
  "Berlin", 
  "Barcelona", 
  "Rome"
];

const BuscarPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredLocations = locations.filter(location =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setIsOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 pt-4 w-full">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Buscar</h1>
            
            <div className="relative flex items-center mb-4">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-familyxp-primary focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>

              <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                  <button 
                    className="ml-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-familyxp-primary"
                    onClick={() => setIsOpen(true)}
                  >
                    {selectedLocation || "Location"}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-0 z-[100]" align="end">
                  <div className="max-h-60 overflow-y-auto">
                    {filteredLocations.length > 0 ? (
                      filteredLocations.map((location) => (
                        <button
                          key={location}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
                          onClick={() => handleLocationSelect(location)}
                        >
                          {location}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500">No locations found</div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 text-center">
                {selectedLocation 
                  ? `Search results for ${selectedLocation} will appear here.` 
                  : "Please select a location to start searching."}
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BuscarPage;
