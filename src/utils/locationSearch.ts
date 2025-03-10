
import { toast } from "sonner";

export interface NominatimResult {
  display_name: string;
  place_id: number;
  lat: string;
  lon: string;
}

// Fetch locations from Nominatim API
export const fetchLocations = async (query: string): Promise<NominatimResult[]> => {
  if (query.length < 2) return [];
  
  try {
    // Use OpenStreetMap Nominatim API filtered for Spain (countrycodes=es)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&countrycodes=es&format=json&limit=5&addressdetails=1`
    );
    
    if (!response.ok) {
      throw new Error(`Error en la búsqueda: ${response.statusText}`);
    }
    
    const data: NominatimResult[] = await response.json();
    console.log("Nominatim results for Spain:", data);
    
    // Return the data even if empty, caller will handle the empty case
    return data;
  } catch (error) {
    console.error("Error fetching from Nominatim:", error);
    // We'll let the caller handle the fallback logic
    throw error;
  }
};

// Eliminar resultados duplicados basados en la localidad principal
export const removeDuplicateLocations = (results: NominatimResult[]): NominatimResult[] => {
  const seen = new Set<string>();
  return results.filter(result => {
    // Obtener la localidad principal (primera parte del display_name)
    const mainLocation = result.display_name.split(',')[0].trim();
    const key = `${mainLocation}`;
    
    // Si ya hemos visto esta localidad, es un duplicado
    if (seen.has(key)) {
      return false;
    }
    
    // Añadir la localidad al conjunto de vistas
    seen.add(key);
    return true;
  });
};

// Format display name to be more readable
export const formatDisplayName = (displayName: string): { main: string, secondary: string } => {
  const parts = displayName.split(',').map(part => part.trim());
  
  if (parts.length === 1) {
    return { main: parts[0], secondary: 'España' };
  }
  
  const main = parts[0];
  // Simplificamos para mostrar siempre España como país
  const secondary = parts.length > 2 
    ? `${parts[1]}, España` 
    : 'España';
    
  return { main, secondary };
};

// Get mock destinations based on input value (fallback)
export const getMockDestinations = (value: string): { name: string, country: string }[] => {
  const lowerValue = value.toLowerCase();
  
  // Mock data de localidades españolas
  const allDestinations = [
    { name: "Sevilla", country: "España" },
    { name: "Centro, Sevilla", country: "España" },
    { name: "Triana, Sevilla", country: "España" },
    { name: "Casco Antiguo, Sevilla", country: "España" },
    { name: "Sevilla Este, Sevilla", country: "España" },
    { name: "Madrid", country: "España" },
    { name: "Barcelona", country: "España" },
    { name: "Valencia", country: "España" },
    { name: "Málaga", country: "España" },
    { name: "Granada", country: "España" },
    { name: "Toledo", country: "España" },
    { name: "Santiago de Compostela", country: "España" },
    { name: "Bilbao", country: "España" },
    { name: "San Sebastián", country: "España" },
    { name: "Córdoba", country: "España" }
  ];
  
  // Filtrar destinos y eliminar duplicados
  const filteredDestinations = allDestinations.filter(d => 
    d.name.toLowerCase().includes(lowerValue) || 
    d.country.toLowerCase().includes(lowerValue)
  );
  
  // Eliminar duplicados para datos mockeados
  const uniqueDestinations = filteredDestinations.filter((destination, index, self) =>
    index === self.findIndex(d => d.name.split(',')[0] === destination.name.split(',')[0])
  );
  
  return uniqueDestinations.slice(0, 5);
};

export const storeSelectedLocation = (suggestion: NominatimResult, simplifiedName: string) => {
  // Store the full location data including coordinates if needed later
  // This can be used for maps or for more precise search
  localStorage.setItem('selectedLocation', JSON.stringify({
    name: simplifiedName,
    lat: suggestion.lat,
    lon: suggestion.lon,
    full: suggestion.display_name,
    country: "España"
  }));
};
