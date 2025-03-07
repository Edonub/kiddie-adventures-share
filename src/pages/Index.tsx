
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ActivityCard from "@/components/ActivityCard";
import CategoryList from "@/components/CategoryList";
import CategoryCard from "@/components/CategoryCard";
import DestinationCard from "@/components/DestinationCard";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [featuredActivities, setFeaturedActivities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch featured activities
        const { data: activities, error: activitiesError } = await supabase
          .from("activities")
          .select("*")
          .limit(4)
          .order('rating', { ascending: false });

        if (activitiesError) throw activitiesError;
        setFeaturedActivities(activities);

        // Fetch blog posts
        const { data: posts, error: postsError } = await supabase
          .from("blog_posts")
          .select("*")
          .limit(3)
          .order('created_at', { ascending: false });

        if (postsError) throw postsError;
        setBlogPosts(posts);

        // Use predefined categories and destinations for now
        // These would typically come from a database in a production environment
        setCategories([
          {
            title: "Aventura",
            image: "https://images.unsplash.com/photo-1504173010664-32509aeebb62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJlZSUyMGNsaW1iaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
            count: 45,
            slug: "aventura"
          },
          {
            title: "Gastronomía",
            image: "https://images.unsplash.com/photo-1608835291099-33ccc0ddeab7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2lkcyUyMGNvb2tpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
            count: 32,
            slug: "gastronomia"
          },
          {
            title: "Cultural",
            image: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2lkcyUyMG11c2V1bXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            count: 28,
            slug: "cultural"
          },
          {
            title: "Educativo",
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWR1Y2F0aW9uJTIwY2hpbGRyZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
            count: 36,
            slug: "educativo"
          },
          {
            title: "Naturaleza",
            image: "https://images.unsplash.com/photo-1502500759775-3d9538388a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlJTIwY2hpbGRyZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
            count: 42,
            slug: "naturaleza"
          },
          {
            title: "Acuático",
            image: "https://images.unsplash.com/photo-1517363898874-737b62a7db91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2lkcyUyMHN3aW1taW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
            count: 25,
            slug: "acuatico"
          },
        ]);

        setDestinations([
          {
            name: "Madrid",
            image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFkcmlkfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
            count: 124,
            slug: "madrid"
          },
          {
            name: "Barcelona",
            image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFyY2Vsb25hfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
            count: 98,
            slug: "barcelona"
          },
          {
            name: "Valencia",
            image: "https://images.unsplash.com/photo-1599719619096-7025b3e8db45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmFsZW5jaWElMjBzcGFpbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            count: 76,
            slug: "valencia"
          },
          {
            name: "Sevilla",
            image: "https://images.unsplash.com/photo-1515443961218-a51367888e4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2V2aWxsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            count: 64,
            slug: "sevilla"
          },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSignUp = () => {
    navigate("/auth");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        
        {!loading && featuredActivities.length > 0 && (
          <CategoryList title="Experiencias destacadas" seeAllLink="/explorar">
            {featuredActivities.map((activity) => (
              <ActivityCard key={activity.id} {...activity} />
            ))}
          </CategoryList>
        )}
        
        <section className="py-10 bg-gray-50">
          <div className="container px-4 mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Destinos populares</h2>
              <Button variant="ghost" className="text-familyxp-primary hover:text-familyxp-secondary hover:bg-familyxp-tertiary">
                Ver todo <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {destinations.map((destination) => (
                <DestinationCard key={destination.name} {...destination} />
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-10">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Explora por categorías</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Descubre experiencias únicas para toda la familia organizadas por tipos de actividad
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <CategoryCard key={category.title} {...category} />
              ))}
            </div>
          </div>
        </section>
        
        {!loading && blogPosts.length > 0 && (
          <section className="py-10 bg-gray-50">
            <div className="container px-4 mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Últimas del blog</h2>
                <Button variant="ghost" className="text-familyxp-primary hover:text-familyxp-secondary hover:bg-familyxp-tertiary">
                  Ver todo <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                  <BlogCard key={post.id} {...post} />
                ))}
              </div>
            </div>
          </section>
        )}
        
        <section className="py-16 bg-familyxp-primary text-white">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">¿Listo para vivir experiencias inolvidables?</h2>
            <p className="text-lg mb-8 max-w-xl mx-auto">
              Únete a nuestra comunidad y comienza a disfrutar de las mejores actividades para disfrutar en familia
            </p>
            <Button 
              onClick={handleSignUp} 
              className="bg-white text-familyxp-primary hover:bg-familyxp-tertiary">
              Crear cuenta
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
