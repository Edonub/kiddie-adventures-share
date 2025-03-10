
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

export const fetchLocations = async (query: string): Promise<NominatimResult[]> => {
  if (query.length < 2) return [];
  
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&countrycodes=es&format=json&limit=5&addressdetails=1`
    );
    
    if (!response.ok) {
      throw new Error(`Error en la búsqueda: ${response.statusText}`);
    }
    
    const data: NominatimResult[] = await response.json();
    console.log("Nominatim results for Spain:", data);
    return data;
  } catch (error) {
    console.error("Error fetching from Nominatim:", error);
    throw error;
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
