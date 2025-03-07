
import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin } from 'lucide-react';
import { ActivityProps } from '../ActivityCard';

// Solucionar problema de marcadores en Leaflet con Webpack/Vite
// Importamos las imágenes directamente
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface MapViewProps {
  activities: ActivityProps[];
  onActivitySelect: (id: string) => void;
}

const MapView = ({ activities, onActivitySelect }: MapViewProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    // Si el mapa ya existe, lo eliminamos
    if (mapRef.current) {
      mapRef.current.remove();
    }

    // Crear mapa
    const map = L.map(mapContainerRef.current).setView([40.416775, -3.70379], 6); // Centro en España
    mapRef.current = map;

    // Añadir capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Crear grupo de marcadores para facilitar el ajuste del zoom
    const markers = L.featureGroup();

    // Añadir marcadores para cada actividad
    activities.forEach(activity => {
      // Crear coordenadas aleatorias para demo (en producción usaríamos coordenadas reales)
      const lat = getRandomCoordinate(36.0, 43.8); // Rango de latitudes para España
      const lng = getRandomCoordinate(-9.3, 3.3); // Rango de longitudes para España
      
      // Crear marcador con popup personalizado
      const marker = L.marker([lat, lng])
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold">${activity.title}</h3>
            <p class="text-sm text-gray-600">${activity.price === 0 ? 'Gratis' : `${activity.price}€`}</p>
            <button
              class="bg-familyxp-primary text-white text-xs px-2 py-1 rounded mt-2"
              onclick="window.selectActivity('${activity.id}')"
            >
              Ver detalles
            </button>
          </div>
        `);
        
      marker.addTo(map);
      markers.addTo(map);
    });

    // Ajustar zoom para mostrar todos los marcadores
    if (markers.getLayers().length > 0) {
      map.fitBounds(markers.getBounds().pad(0.2));
    }

    // Añadir método al objeto window para manejar la selección desde el popup
    // @ts-ignore
    window.selectActivity = (id: string) => {
      onActivitySelect(id);
    };

    // Limpiar al desmontar
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
      // @ts-ignore
      delete window.selectActivity;
    };
  }, [activities, onActivitySelect]);

  // Función para generar coordenadas aleatorias (solo para demo)
  const getRandomCoordinate = (min: number, max: number) => {
    return min + Math.random() * (max - min);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div ref={mapContainerRef} className="w-full h-[600px]" />
    </div>
  );
};

export default MapView;
