
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample blog posts data
const blogPosts = [
  {
    id: "1",
    title: "10 actividades imprescindibles para hacer con niños en invierno",
    excerpt: "Descubre las mejores actividades para disfrutar con los más pequeños durante los meses fríos del año.",
    category: "Inspiración",
    date: "15 mayo 2023",
    author: "María Gómez",
    image: "https://images.unsplash.com/photo-1610025763872-76c13223c320?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2ludGVyJTIwY2hpbGRyZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    readTime: "5 min"
  },
  {
    id: "2",
    title: "Cómo planificar un viaje familiar perfecto",
    excerpt: "Guía completa con consejos prácticos para organizar un viaje en familia sin estrés y con diversión asegurada.",
    category: "Consejos",
    date: "2 junio 2023",
    author: "Carlos Martínez",
    image: "https://images.unsplash.com/photo-1551655510-955bbd123c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFtaWx5JTIwdHJhdmVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    readTime: "8 min"
  },
  {
    id: "3",
    title: "Entrevista: Ana López, creadora de experiencias educativas",
    excerpt: "Conversamos con Ana López sobre cómo crear experiencias educativas memorables para los más pequeños.",
    category: "Entrevistas",
    date: "20 junio 2023",
    author: "Paula Vázquez",
    authorTitle: "Periodista educativa",
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVhY2hlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    readTime: "10 min"
  },
  {
    id: "4",
    title: "Los mejores parques infantiles de España",
    excerpt: "Un recorrido por los parques infantiles más originales y divertidos de toda España para disfrutar en familia.",
    category: "Lugares",
    date: "5 julio 2023",
    author: "Roberto Sánchez",
    image: "https://images.unsplash.com/photo-1596997000403-f49vba4a3abb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxheWdyb3VuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    readTime: "7 min"
  },
  {
    id: "5",
    title: "Recetas divertidas para cocinar con niños",
    excerpt: "Selección de recetas fáciles y divertidas para introducir a los niños en el mundo de la cocina.",
    category: "Gastronomía",
    date: "14 julio 2023",
    author: "Elena Ruiz",
    authorTitle: "Chef especialista en cocina infantil",
    image: "https://images.unsplash.com/photo-1605713661868-898a0c89a392?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29va2luZyUyMHdpdGglMjBraWRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    readTime: "6 min"
  },
  {
    id: "6",
    title: "Juegos educativos para desarrollar habilidades matemáticas",
    excerpt: "Aprende cómo los juegos pueden ayudar a tus hijos a mejorar sus habilidades matemáticas de forma divertida.",
    category: "Educativo",
    date: "25 julio 2023",
    author: "Javier López",
    authorTitle: "Profesor y pedagogo",
    image: "https://images.unsplash.com/photo-1580894908361-967195033215?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWF0aHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    readTime: "9 min"
  },
];

const blogCategories = [
  "Todos", "Consejos", "Educativo", "Entretenimiento", "Gastronomía", 
  "Inspiración", "Entrevistas", "Lugares", "Manualidades", "Salud"
];

const featuredPosts = blogPosts.slice(0, 3);
const recentPosts = [...blogPosts].sort(() => Math.random() - 0.5).slice(0, 6);

const BlogPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pb-12">
        <section className="bg-familyxp-tertiary py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="bg-white text-familyxp-primary mb-4">Blog FamilyXp</Badge>
                <h1 className="text-4xl font-bold text-familyxp-primary mb-4">
                  Ideas, consejos y experiencias para familias
                </h1>
                <p className="text-gray-700 mb-6">
                  Descubre artículos sobre crianza, educación, actividades y mucho más para disfrutar al máximo de la vida en familia.
                </p>
                <div className="relative">
                  <Input 
                    placeholder="Buscar en el blog..." 
                    className="pl-4 pr-10 py-2 rounded-full"
                  />
                  <Button className="absolute right-0 top-0 rounded-full h-full bg-familyxp-primary">
                    Buscar
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block">
                <img 
                  src="https://images.unsplash.com/photo-1533113354171-490d836238e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFtaWx5JTIwcmVhZGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" 
                  alt="Familia leyendo" 
                  className="rounded-lg shadow-lg max-h-80 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Artículos destacados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} {...post} />
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Explora nuestro contenido</h2>
            
            <Tabs defaultValue="todos">
              <TabsList className="mb-6 flex flex-wrap">
                {blogCategories.map((category) => (
                  <TabsTrigger key={category} value={category.toLowerCase()}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value="todos" className="mt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentPosts.map((post) => (
                    <BlogCard key={post.id} {...post} />
                  ))}
                </div>
                
                <div className="text-center mt-8">
                  <Button className="bg-familyxp-primary">Cargar más artículos</Button>
                </div>
              </TabsContent>
              
              {blogCategories.slice(1).map((category) => (
                <TabsContent key={category} value={category.toLowerCase()} className="mt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogPosts
                      .filter(post => post.category === category)
                      .map((post) => (
                        <BlogCard key={post.id} {...post} />
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
        
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Suscríbete a nuestro boletín</h2>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Recibe cada semana en tu correo electrónico las mejores ideas y planes para disfrutar en familia
            </p>
            <div className="flex max-w-md mx-auto">
              <Input 
                placeholder="Tu correo electrónico" 
                className="rounded-r-none"
              />
              <Button className="rounded-l-none bg-familyxp-primary">
                Suscribirme
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
