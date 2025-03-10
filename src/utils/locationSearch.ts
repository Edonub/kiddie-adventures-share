
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

// Lista ampliada de localidades populares en España para respuesta inmediata
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
  // Añadimos más localidades comunes para mejorar la velocidad de respuesta
  { place_id: 11, display_name: "Alicante, Comunidad Valenciana, España", lat: "38.3452", lon: "-0.4815" },
  { place_id: 12, display_name: "Córdoba, Andalucía, España", lat: "37.8882", lon: "-4.7794" },
  { place_id: 13, display_name: "Granada, Andalucía, España", lat: "37.1773", lon: "-3.5986" },
  { place_id: 14, display_name: "Vigo, Galicia, España", lat: "42.2328", lon: "-8.7226" },
  { place_id: 15, display_name: "Gijón, Asturias, España", lat: "43.5452", lon: "-5.6635" },
  { place_id: 16, display_name: "A Coruña, Galicia, España", lat: "43.3713", lon: "-8.3962" },
  { place_id: 17, display_name: "Vitoria-Gasteiz, País Vasco, España", lat: "42.8467", lon: "-2.6716" },
  { place_id: 18, display_name: "Elche, Comunidad Valenciana, España", lat: "38.2655", lon: "-0.6968" },
  { place_id: 19, display_name: "Oviedo, Asturias, España", lat: "43.3614", lon: "-5.8497" },
  { place_id: 20, display_name: "Badalona, Cataluña, España", lat: "41.4399", lon: "2.2474" },
  { place_id: 21, display_name: "Cartagena, Región de Murcia, España", lat: "37.6257", lon: "-0.9966" },
  { place_id: 22, display_name: "Terrassa, Cataluña, España", lat: "41.5607", lon: "2.0080" },
  { place_id: 23, display_name: "Jerez de la Frontera, Andalucía, España", lat: "36.6866", lon: "-6.1375" },
  { place_id: 24, display_name: "Sabadell, Cataluña, España", lat: "41.5486", lon: "2.1078" },
  { place_id: 25, display_name: "Móstoles, Comunidad de Madrid, España", lat: "40.3233", lon: "-3.8653" },
  { place_id: 26, display_name: "Alcalá de Henares, Comunidad de Madrid, España", lat: "40.4819", lon: "-3.3644" },
  { place_id: 27, display_name: "Pamplona, Navarra, España", lat: "42.8186", lon: "-1.6442" },
  { place_id: 28, display_name: "Almería, Andalucía, España", lat: "36.8340", lon: "-2.4637" },
  { place_id: 29, display_name: "Santander, Cantabria, España", lat: "43.4628", lon: "-3.8044" },
  { place_id: 30, display_name: "Castellón de la Plana, Comunidad Valenciana, España", lat: "39.9860", lon: "-0.0499" }
];

export const fetchLocations = async (query: string): Promise<NominatimResult[]> => {
  if (query.length < 2) return [];
  
  // Normalizamos la consulta (minúsculas y quitamos acentos)
  const normalizedQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  // Primero buscamos en las localidades populares (respuesta instantánea)
  const filteredPopular = popularLocations.filter(location => {
    const normalizedLocation = location.display_name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return normalizedLocation.includes(normalizedQuery);
  });
  
  // Si encontramos coincidencias en las populares, las devolvemos inmediatamente
  if (filteredPopular.length > 0) {
    console.log("Resultados de localidades populares:", filteredPopular);
    return filteredPopular;
  }
  
  try {
    // Intentamos con API alternativa más rápida para mejorar el rendimiento
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&countrycodes=es&limit=7&q=${encodeURIComponent(query)}`
    );
    
    if (!response.ok) {
      throw new Error(`Error en la búsqueda: ${response.statusText}`);
    }
    
    const data: NominatimResult[] = await response.json();
    console.log("Datos crudos de API:", data);
    return data;
  } catch (error) {
    console.error("Error fetchLocations:", error);
    return [];
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
