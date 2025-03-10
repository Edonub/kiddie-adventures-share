import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import CommentForm from "@/components/forum/CommentForm";
import CommentList from "@/components/forum/CommentList";
import { Comment } from "@/components/forum/types";
import ForumCategories, { ForumCategory } from "@/components/forum/ForumCategories";
import { Card } from "@/components/ui/card";

// Sample comments data with categories
const sampleComments: (Comment & { category?: ForumCategory })[] = [
  {
    id: "sample-1",
    content: "¡Hola a todos! ¿Alguien tiene recomendaciones de actividades para hacer con niños de 5 años en Madrid este fin de semana?",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    user_id: "sample-user-1",
    parent_id: null,
    category: "general",
    profiles: {
      first_name: "María",
      last_name: "García",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
    },
    replies: [
      {
        id: "sample-1-reply-1",
        content: "¡Hola María! Te recomiendo el Parque de Atracciones, tienen una zona infantil genial y los fines de semana hacen actividades especiales para los más pequeños.",
        created_at: new Date(Date.now() - 86400000 * 1.5).toISOString(), // 1.5 days ago
        user_id: "sample-user-2",
        parent_id: "sample-1",
        profiles: {
          first_name: "Carlos",
          last_name: "Rodríguez",
          avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos"
        }
      },
      {
        id: "sample-1-reply-2",
        content: "El Museo Nacional de Ciencias Naturales tiene talleres para niños los sábados por la mañana. Mi hijo de 6 años los disfruta muchísimo.",
        created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        user_id: "sample-user-3",
        parent_id: "sample-1",
        profiles: {
          first_name: "Ana",
          last_name: "Martínez",
          avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana"
        }
      }
    ]
  },
  {
    id: "sample-2",
    content: "Estamos planeando un viaje familiar a la costa para el verano. ¿Alguien tiene experiencia con destinos child-friendly en la costa mediterránea?",
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    user_id: "sample-user-4",
    parent_id: null,
    category: "viajes",
    profiles: {
      first_name: "Javier",
      last_name: "López",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Javier"
    },
    replies: [
      {
        id: "sample-2-reply-1",
        content: "Peñíscola es genial para familias. Tiene playas tranquilas, un bonito casco antiguo y muchas actividades para niños.",
        created_at: new Date(Date.now() - 86400000 * 2.5).toISOString(), // 2.5 days ago
        user_id: "sample-user-5",
        parent_id: "sample-2",
        profiles: {
          first_name: "Laura",
          last_name: "Fernández",
          avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laura"
        }
      }
    ]
  },
  {
    id: "sample-3",
    content: "¿Qué opináis de las clases de natación para bebés? ¿Merecen la pena? Mi hija tiene 10 meses y estoy pensando en apuntarla.",
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
    user_id: "sample-user-6",
    parent_id: null,
    category: "general",
    profiles: {
      first_name: "Elena",
      last_name: "Sánchez",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena"
    },
    replies: []
  },
  {
    id: "sample-4",
    content: "¿Alguien conoce algún hotel con habitaciones familiares en Barcelona? Necesitamos espacio para 2 adultos y 3 niños.",
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(), // 4 days ago
    user_id: "sample-user-7",
    parent_id: null,
    category: "alojamientos",
    profiles: {
      first_name: "Miguel",
      last_name: "González",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel"
    },
    replies: []
  },
  {
    id: "sample-5",
    content: "¿Cuál ha sido el mayor desastre que habéis tenido viajando con niños? Yo olvidé el osito de peluche de mi hijo y fue un drama total 😂",
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    user_id: "sample-user-8",
    parent_id: null,
    category: "humor",
    profiles: {
      first_name: "Paula",
      last_name: "Martín",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Paula"
    },
    replies: [
      {
        id: "sample-5-reply-1",
        content: "¡Jajaja! Una vez mi hija de 4 años le dijo al camarero que su comida estaba asquerosa. ¡Quería morirme de vergüenza!",
        created_at: new Date(Date.now() - 86400000 * 4.5).toISOString(), // 4.5 days ago
        user_id: "sample-user-9",
        parent_id: "sample-5",
        profiles: {
          first_name: "Diego",
          last_name: "Pérez",
          avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diego"
        }
      }
    ]
  },
  {
    id: "sample-6",
    content: "¿Creéis que es mejor Netflix o Disney+ para niños pequeños? Estoy pensando en suscribirme a uno.",
    created_at: new Date(Date.now() - 86400000 * 6).toISOString(), // 6 days ago
    user_id: "sample-user-10",
    parent_id: null,
    category: "offtopic",
    profiles: {
      first_name: "Lucía",
      last_name: "Jiménez",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucia"
    },
    replies: []
  }
];

const ForoPage = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const [showSampleData, setShowSampleData] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ForumCategory>("general");

  useEffect(() => {
    fetchComments();
  }, [selectedCategory]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      // Fetch top-level comments
      const { data, error } = await supabase
        .from("comments")
        .select(`
          id, 
          content, 
          created_at, 
          user_id, 
          parent_id,
          profiles:user_id(first_name, last_name, avatar_url)
        `)
        .is("parent_id", null)
        .is("activity_id", null)
        .is("post_id", null)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Fetch replies for each comment
      const commentsWithReplies = await Promise.all(
        data.map(async (comment) => {
          const { data: replies, error: repliesError } = await supabase
            .from("comments")
            .select(`
              id, 
              content, 
              created_at, 
              user_id, 
              parent_id,
              profiles:user_id(first_name, last_name, avatar_url)
            `)
            .eq("parent_id", comment.id)
            .order("created_at", { ascending: true });

          if (repliesError) throw repliesError;

          return {
            ...comment,
            replies: replies || []
          };
        })
      );

      if (commentsWithReplies.length === 0) {
        setShowSampleData(true);
        // Filter sample comments by selected category
        const filteredComments = sampleComments.filter(comment => 
          comment.category === selectedCategory
        );
        setComments(filteredComments);
      } else {
        setShowSampleData(false);
        setComments(commentsWithReplies);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Error al cargar los comentarios del foro");
      
      // Show filtered sample data if there was an error
      setShowSampleData(true);
      const filteredComments = sampleComments.filter(comment => 
        comment.category === selectedCategory
      );
      setComments(filteredComments);
    } finally {
      setLoading(false);
    }
  };

  // Update comment form to include category
  const handleCommentSubmitted = () => {
    fetchComments();
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      
      <main className="flex-1 py-10">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Foro de Familea</h1>
            <p className="text-gray-600">
              Comparte tus preguntas, sugerencias y experiencias con la comunidad de Familea.
            </p>
            {showSampleData && (
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-700 text-sm">
                  <strong>Nota:</strong> Estás viendo contenido de ejemplo. Los comentarios que añadas se guardarán en la base de datos.
                </p>
              </div>
            )}
          </div>
          
          <Card className="bg-white border-gray-200 p-4 mb-6 shadow-sm">
            <ForumCategories 
              selectedCategory={selectedCategory} 
              onCategoryChange={setSelectedCategory} 
            />
          </Card>
          
          <CommentForm 
            replyTo={replyTo} 
            setReplyTo={setReplyTo} 
            onCommentSubmitted={handleCommentSubmitted}
            category={selectedCategory}
          />
          
          <CommentList 
            comments={comments} 
            loading={loading} 
            onReply={setReplyTo} 
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForoPage;
