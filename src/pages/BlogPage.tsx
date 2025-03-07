import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  created_at: string;
  author_name: string;
  author_title?: string;
  image_url: string;
  read_time: string;
}

const blogCategories = [
  "Todos", "Consejos", "Educativo", "Entretenimiento", "Gastronomía", 
  "Inspiración", "Entrevistas", "Lugares", "Manualidades", "Salud"
];

const sampleBlogPosts = [
  {
    id: "1",
    title: "10 actividades imprescindibles para hacer con niños en invierno",
    excerpt: "Descubre las mejores actividades para disfrutar con los más pequeños durante los meses fríos del año.",
    category: "Inspiración",
    created_at: "15 mayo 2023",
    author_name: "María Gómez",
    image_url: "https://images.unsplash.com/photo-1610025763872-76c13223c320?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2ludGVyJTIwY2hpbGRyZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    read_time: "5 min"
  },
  {
    id: "2",
    title: "Cómo planificar un viaje familiar perfecto",
    excerpt: "Guía completa con consejos prácticos para organizar un viaje en familia sin estrés y con diversión asegurada.",
    category: "Consejos",
    created_at: "2 junio 2023",
    author_name: "Carlos Martínez",
    image_url: "https://images.unsplash.com/photo-1551655510-955bbd123c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFtaWx5JTIwdHJhdmVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    read_time: "8 min"
  },
  {
    id: "3",
    title: "Entrevista: Ana López, creadora de experiencias educativas",
    excerpt: "Conversamos con Ana López sobre cómo crear experiencias educativas memorables para los más pequeños.",
    category: "Entrevistas",
    created_at: "20 junio 2023",
    author_name: "Paula Vázquez",
    author_title: "Periodista educativa",
    image_url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVhY2hlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    read_time: "10 min"
  },
];

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(date);
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  useEffect(() => {
    async function fetchBlogPosts() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          const formattedPosts: BlogPost[] = data.map(post => ({
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            category: post.category,
            created_at: formatDate(post.created_at),
            author_name: post.author_name,
            author_title: post.author_title,
            image_url: post.image_url || 'https://images.unsplash.com/photo-1610025763872-76c13223c320?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2ludGVyJTIwY2hpbGRyZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
            read_time: post.read_time || '5 min',
          }));

          setBlogPosts(formattedPosts);
          setFeaturedPosts(formattedPosts.slice(0, 3));
          setRecentPosts(formattedPosts);
        } else {
          console.log("No se encontraron posts en la base de datos, usando datos de muestra");
          setBlogPosts(sampleBlogPosts);
          setFeaturedPosts(sampleBlogPosts);
          setRecentPosts(sampleBlogPosts);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        toast({
          title: "Error al cargar el blog",
          description: "No se pudieron cargar los artículos. Por favor, inténtalo de nuevo más tarde.",
          variant: "destructive",
        });
        setBlogPosts(sampleBlogPosts);
        setFeaturedPosts(sampleBlogPosts);
        setRecentPosts(sampleBlogPosts);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlogPosts();
  }, [toast]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Búsqueda realizada",
      description: `Has buscado: ${searchTerm}`,
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pb-12">
        <section className="bg-familyxp-tertiary py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="bg-white text-familyxp-primary mb-4">Blog Familea</Badge>
                <h1 className="text-4xl font-bold text-familyxp-primary mb-4">
                  Ideas, consejos y experiencias para familias
                </h1>
                <p className="text-gray-700 mb-6">
                  Descubre artículos sobre crianza, educación, actividades y mucho más para disfrutar al máximo de la vida en familia.
                </p>
                <form onSubmit={handleSearch} className="relative">
                  <Input 
                    placeholder="Buscar en el blog..." 
                    className="pl-4 pr-10 py-2 rounded-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button type="submit" className="absolute right-0 top-0 rounded-r-full h-full bg-familyxp-primary">
                    Buscar
                  </Button>
                </form>
              </div>
              <div className="hidden lg:block">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Familia leyendo" 
                  className="rounded-lg shadow-lg max-h-80 w-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
                  }}
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Artículos destacados</h2>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-familyxp-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredPosts.map((post) => (
                  <BlogCard 
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    category={post.category}
                    date={post.created_at}
                    author={post.author_name}
                    authorTitle={post.author_title}
                    image={post.image_url}
                    readTime={post.read_time}
                  />
                ))}
              </div>
            )}
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
                {isLoading ? (
                  <div className="flex justify-center items-center h-40">
                    <Loader2 className="h-8 w-8 animate-spin text-familyxp-primary" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentPosts.map((post) => (
                      <BlogCard 
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        excerpt={post.excerpt}
                        category={post.category}
                        date={post.created_at}
                        author={post.author_name}
                        authorTitle={post.author_title}
                        image={post.image_url}
                        readTime={post.read_time}
                      />
                    ))}
                  </div>
                )}
                
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
                        <BlogCard 
                          key={post.id}
                          id={post.id}
                          title={post.title}
                          excerpt={post.excerpt}
                          category={post.category}
                          date={post.created_at}
                          author={post.author_name}
                          authorTitle={post.author_title}
                          image={post.image_url}
                          readTime={post.read_time}
                        />
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
