
export interface Plan {
  id: number | string;
  title: string;
  category: string;
  image_url: string;
  description?: string;
  location?: string;
  price?: number;
}

export const planCategories = ["Todos", "Al aire libre", "Cultural", "Interior", "Comida y bebida"];

export const samplePlans = [
  { 
    id: 1, 
    title: "Excursión en montaña", 
    category: "Al aire libre", 
    image_url: "https://images.unsplash.com/photo-1551655510-955bbd123c5e", 
    location: "Sierra de Guadarrama",
    price: 25
  },
  { 
    id: 2, 
    title: "Taller de cocina", 
    category: "Comida y bebida", 
    image_url: "https://images.unsplash.com/photo-1551655510-955bbd123c5e", 
    location: "Madrid Centro",
    price: 35
  },
  { 
    id: 3, 
    title: "Visita al museo", 
    category: "Cultural", 
    image_url: "https://images.unsplash.com/photo-1551655510-955bbd123c5e", 
    location: "Museo del Prado",
    price: 15
  },
  { 
    id: 4, 
    title: "Escape room familiar", 
    category: "Interior", 
    image_url: "https://images.unsplash.com/photo-1551655510-955bbd123c5e", 
    location: "Madrid",
    price: 20
  }
];
