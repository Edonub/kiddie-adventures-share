
export interface NominatimResult {
  display_name: string;
  place_id: number;
  lat: string;
  lon: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
    state?: string;
    country?: string;
  };
}

// Lista precargada de localidades populares en España para mejorar la respuesta
const popularLocations = [
  { place_id: 1, display_name: "Madrid, Comunidad de Madrid, España", lat: "40.4168", lon: "-3.7038" },
  { place_id: 2, display_name: "Barcelona, Cataluña, España", lat: "41.3851", lon: "2.1734" },
  { place_id: 3, display_name: "Valencia, Comunidad Valenciana, España", lat: "39.4699", lon: "-0.3763" },
  { place_id: 4, display_name: "Sevilla, Andalucía, España", lat: "37.3891", lon: "-5.9845" },
  { place_id: 5, display_name: "Zaragoza, Aragón, España", lat: "41.6488", lon: "-0.8891" },
  { place_id: 6, display_name: "Málaga, Andalucía, España", lat: "36.7213", lon: "-4.4213" },
  { place_id: 7, display_name: "Murcia, Región de Murcia, España", lat: "37.9922", lon: "-1.1307" },
  { place_id: 8, display_name: "Palma de Mallorca, Islas Baleares, España", lat: "39.5696", lon: "2.6502" },
  { place_id: 9, display_name: "Las Palmas de Gran Canaria, Canarias, España", lat: "28.1235", lon: "-15.4366" },
  { place_id: 10, display_name: "Bilbao, País Vasco, España", lat: "43.2630", lon: "-2.9350" },
];

export const fetchLocations = async (query: string): Promise<NominatimResult[]> => {
  if (query.length < 2) return [];
  
  try {
    // Primero buscamos en las localidades populares (respuesta instantánea)
    const filteredPopular = popularLocations.filter(location => 
      location.display_name.toLowerCase().includes(query.toLowerCase())
    );
    
    // Si encontramos coincidencias en las populares, las devolvemos inmediatamente
    if (filteredPopular.length > 0) {
      return filteredPopular;
    }
    
    // Si no hay coincidencias en populares, hacemos la petición a la API
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&countrycodes=es&format=json&limit=5&addressdetails=1`
    );
    
    if (!response.ok) {
      throw new Error(`Error en la búsqueda: ${response.statusText}`);
    }
    
    const data: NominatimResult[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetchLocations:", error);
    return []; // Devolvemos array vacío en caso de error para evitar errores en cascada
  }
};

export const removeDuplicateLocations = (results: NominatimResult[]): NominatimResult[] => {
  const seen = new Set<string>();
  return results.filter(result => {
    const mainLocation = result.display_name.split(',')[0].trim();
    if (seen.has(mainLocation)) return false;
    seen.add(mainLocation);
    return true;
  });
};

export const formatDisplayName = (displayName: string): { main: string, secondary: string } => {
  const parts = displayName.split(',').map(part => part.trim());
  const main = parts[0];
  const secondary = parts.length > 2 ? `${parts[1]}, España` : 'España';
  return { main, secondary };
};

export const storeSelectedLocation = (suggestion: NominatimResult, simplifiedName: string) => {
  localStorage.setItem('selectedLocation', JSON.stringify({
    name: simplifiedName,
    lat: suggestion.lat,
    lon: suggestion.lon,
    full: suggestion.display_name,
    country: "España"
  }));
};
