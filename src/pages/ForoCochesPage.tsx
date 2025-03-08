
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { MessageSquare, Plus } from "lucide-react";
import { toast } from "sonner";

// Types for our forum data
interface ForumPost {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
  category: string;
  replies: ForumReply[];
}

interface ForumReply {
  id: string;
  author: string;
  date: string;
  content: string;
}

// Sample data generator for initial forum content
const generateSampleData = (): ForumPost[] => {
  const authors = [
    "User123", "ForeroX", "AmigoViajero", "PlazaForero", 
    "Aventurero99", "MrForo", "PaseanteDeMadrid", "ViajeroLoco", 
    "FamiliaFeliz", "PadreModerno", "MamaViajera"
  ];
  
  const getRandomAuthor = () => authors[Math.floor(Math.random() * authors.length)];
  const getRandomDate = () => "08/03/2025";
  
  return [
    // General category
    {
      id: "1",
      title: "Bienvenidos al nuevo foro",
      author: "Admin",
      date: getRandomDate(),
      content: "Hola a todos los foreros. Este es el nuevo foro de nuestra web. Esperamos que os guste y participéis activamente. A darle caña!",
      category: "General",
      replies: [
        {
          id: "1-1",
          author: getRandomAuthor(),
          date: getRandomDate(),
          content: "Por fin un foro decente! Ya era hora, a ver si esto se anima."
        },
        {
          id: "1-2",
          author: getRandomAuthor(),
          date: getRandomDate(),
          content: "Yo llevo años esperando algo así. Saludos desde Valencia!"
        }
      ]
    },
    {
      id: "2",
      title: "Reglas del sitio",
      author: "Admin",
      date: getRandomDate(),
      content: "Prohibido insultar, prohibido spam, prohibido contenido ilegal. Todo lo demás está permitido. A disfrutar del foro!",
      category: "General",
      replies: [
        {
          id: "2-1",
          author: getRandomAuthor(),
          date: getRandomDate(),
          content: "Menos mal que hay reglas, en otros foros es una jungla."
        }
      ]
    },
    {
      id: "3",
      title: "Charla libre",
      author: getRandomAuthor(),
      date: getRandomDate(),
      content: "Abro hilo para hablar de lo que sea. ¿Qué tal el día? ¿Algún plan para el finde? Venga, animaos!",
      category: "General",
      replies: [
        {
          id: "3-1",
          author: getRandomAuthor(),
          date: getRandomDate(),
          content: "Yo me voy a la playa este finde, a ver si no llueve como siempre."
        }
      ]
    },
    
    // Viajes category
    {
      id: "4",
      title: "Mejor destino 2025",
      author: getRandomAuthor(),
      date: getRandomDate(),
      content: "Venga, que alguien me diga un sitio guapo para irme de viaje, que estoy harto de mi pueblo. A ver si hay suerte.",
      category: "Viajes",
      replies: [
        {
          id: "4-1",
          author: getRandomAuthor(),
          date: getRandomDate(),
          content: "Prueba Sevilla, tio. Es la ostia y se come mejor que en ningún lado."
        },
        {
          id: "4-2",
          author: getRandomAuthor(),
          date: getRandomDate(),
          content: "Nah, mejor quédate en casa, jaja. Todo está carísimo ahora mismo."
        }
      ]
    },
    {
      id: "5",
      title: "Trucos para viajar barato",
      author: getRandomAuthor(),
      date: getRandomDate(),
      content: "¿Alguien tiene trucos para viajar sin dejarse el sueldo? Estoy mirando destinos y me da algo ver los precios.",
      category: "Viajes",
      replies: [
        {
          id: "5-1",
          author: getRandomAuthor(),
          date: getRandomDate(),
          content: "Yo siempre uso Skyscanner y busco vuelos en modo incógnito. Funciona de lujo."
        }
      ]
    },
    {
      id: "6",
      title: "Sevilla es la ostia",
      author: getRandomAuthor(),
      date: getRandomDate(),
      content: "Acabo de volver de Sevilla y os lo digo: es la ostia. Esas calles, la comida, el ambiente... Volvería mañana mismo.",
      category: "Viajes",
      replies: [
        {
          id: "6-1",
          author: getRandomAuthor(),
          date: getRandomDate(),
          content: "Yo fui el año pasado y no me gustó tanto. Hacía un calor que te mueres."
        },
        {
          id: "6-2",
          author: getRandomAuthor(),
          date: getRandomDate(),
          content: "Es que no hay que ir en agosto, jaja. En primavera es perfecta."
        }
      ]
    },
    {
      id: "7",
      title: "Rutas épicas",
      author: getRandomAuthor(),
      date: getRandomDate(),
      content: "Estoy planeando hacer una ruta por el norte. ¿Alguna recomendación de sitios que no me pueda perder? Graciñas.",
      category: "Viajes",
      replies: [
        {
          id: "7-1",
          author: getRandomAuthor(),
          date: getRandomDate(),
          content: "La costa de Asturias es BRUTAL. No te la pierdas por nada del mundo."
        }
      ]
    },
    
    // Alojamientos category
    {
      id: "8",
      title: "Cabañas baratas",
      author: getRandomAuthor(),
      date: getRandomDate(),
      content: "Busco cabañas en el monte que no cuesten un riñón. Para ir con la parienta un finde. ¿Alguna recomendación?",
      category: "Alojamientos",
      replies: [
        {
          id: "8-1",
          author: getRandomAuthor(),
          date: getRandomDate(),
          content: "Mira en Airbnb en la zona de Gredos. Hay chollos si reservas con tiempo."
        }
      ]
    },
    {
      id: "9",
      title: "Mansiones de lujo",
      author: getRandomAuthor(),
      date: getRandomDate(),
      content: "Si ganamos la primitiva, ¿qué mansión alquilaríais para una fiesta? Yo me pido una con piscina infinity y helipuerto.",
      category: "Alojamientos",
      replies: [
        {
          id: "9-1",
          author: getRandomAuthor(),
          date: getRandomDate(),
          content: "Yo me iría a una de esas de Ibiza con DJ privado y mayordomos. YOLO."
        },
        {
          id: "9-2",
          author: getRandomAuthor(),
          date: getRandomDate(),
          content: "Sí, claro, y luego a despertar de la siesta... 😂"
        }
      ]
    },
    {
      id: "10",
      title: "Casas Domo, alguien las probó?",
      author: getRandomAuthor(),
      date: getRandomDate(),
      content: "He visto esas casas con forma de iglú que parecen del futuro. ¿Alguien se ha alojado en una? ¿Merecen la pena?",
      category: "Alojamientos",
      replies: [
        {
          id: "10-1",
          author: getRandomAuthor(),
          date: getRandomDate(),
          content: "Yo estuve en una el año pasado. Están guapas para la foto de Instagram y poco más."
        }
      ]
    },
    {
      id: "11",
      title: "Hoteles cutres",
      author: getRandomAuthor(),
      date: getRandomDate(),
      content: "Recopilatorio de hoteles a evitar. Empiezo yo: Hotel Las Dunas en Torremolinos, una pesadilla con patas.",
      category: "Alojamientos",
      replies: [
        {
          id: "11-1",
          author: getRandomAuthor(),
          date: getRandomDate(),
          content: "El Hostal del Mar en Benidorm. Cucarachas de mascota y bonus track de moho en la ducha."
        }
      ]
    },
    
    // Offtopic category
    {
      id: "12",
      title: "Memes random",
      author: getRandomAuthor(),
      date: getRandomDate(),
      content: "Hilo para compartir memes. Que sean buenos o ban. Empiezo yo con un clásico: el de 'no sé Rick, parece falso'.",
      category: "Offtopic",
      replies: [
        {
          id: "12-1",
          author: getRandomAuthor(),
          date: getRandomDate(),
          content: "Ese meme ya está más quemado que la comida de mi suegra, jajaja."
        }
      ]
    },
    {
      id: "13",
      title: "Debatamos algo",
      author: getRandomAuthor(),
      date: getRandomDate(),
      content: "¿Tortilla con o sin cebolla? Yo soy team con cebolla y no acepto discusión. Cambiar mi opinión: imposible.",
      category: "Offtopic",
      replies: [
        {
          id: "13-1",
          author: getRandomAuthor(),
          date: getRandomDate(),
          content: "SIN CEBOLLA. La tortilla es sagrada y la cebolla la arruina. Venid de uno en uno."
        },
        {
          id: "13-2",
          author: getRandomAuthor(),
          date: getRandomDate(),
          content: "Yo la hago mitad y mitad para no pelearme con mi pareja. Diplomacia patria."
        }
      ]
    },
    
    // Humor category
    {
      id: "14",
      title: "Chistes malos",
      author: getRandomAuthor(),
      date: getRandomDate(),
      content: "¿Qué hace un perro con un taladro? Taladrando. Si os habéis reído, sois parte del problema.",
      category: "Humor",
      replies: [
        {
          id: "14-1",
          author: getRandomAuthor(),
          date: getRandomDate(),
          content: "¿Sabéis por qué los de Lepe ponen una escalera en el mar? Para subir la marea 🤣"
        }
      ]
    },
    {
      id: "15",
      title: "Fails de viaje",
      author: getRandomAuthor(),
      date: getRandomDate(),
      content: "Contad vuestros fails viajeros. Yo empiezo: me dormí en el tren y acabé en Francia cuando iba a Valencia. Premio a la estupidez.",
      category: "Humor",
      replies: [
        {
          id: "15-1",
          author: getRandomAuthor(),
          date: getRandomDate(),
          content: "Yo reservé un hotel para las vacaciones y me equivoqué de mes. Llegamos y no había reserva. Cara de tontos nivel: experto."
        },
        {
          id: "15-2",
          author: getRandomAuthor(),
          date: getRandomDate(),
          content: "Me fui a Canarias y me llevé ropa de esquiar porque no miré el tiempo. 30 grados y yo con plumífero."
        }
      ]
    }
  ];
};

const ForoCochesPage = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [activeCategory, setActiveCategory] = useState("General");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [replyingToPost, setReplyingToPost] = useState<string | null>(null);
  const [isNewPostDialogOpen, setIsNewPostDialogOpen] = useState(false);
  
  // Load posts from localStorage or generate sample data on initial render
  useEffect(() => {
    const savedPosts = localStorage.getItem("forochochesPosts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      const sampleData = generateSampleData();
      setPosts(sampleData);
      localStorage.setItem("forochochesPosts", JSON.stringify(sampleData));
    }
  }, []);
  
  // Save posts to localStorage whenever they change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem("forochochesPosts", JSON.stringify(posts));
    }
  }, [posts]);
  
  // Filter posts by active category
  const filteredPosts = posts.filter(post => post.category === activeCategory);
  
  // Handle submitting a new post
  const handleNewPost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast.error("El título y contenido son obligatorios");
      return;
    }
    
    if (newPostTitle.length > 50) {
      toast.error("El título no puede superar los 50 caracteres");
      return;
    }
    
    const newPost: ForumPost = {
      id: Date.now().toString(),
      title: newPostTitle.trim(),
      author: "TúMismo", // Could be dynamic if we had authentication
      date: "08/03/2025", // Fixed date as per requirements
      content: newPostContent.trim(),
      category: activeCategory,
      replies: []
    };
    
    setPosts([newPost, ...posts]);
    setNewPostTitle("");
    setNewPostContent("");
    setIsNewPostDialogOpen(false);
    toast.success("Hilo creado correctamente");
  };
  
  // Handle submitting a reply to a post
  const handleReply = (postId: string) => {
    if (!replyContent.trim()) {
      toast.error("El contenido de la respuesta no puede estar vacío");
      return;
    }
    
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          replies: [
            ...post.replies,
            {
              id: `${postId}-${post.replies.length + 1}`,
              author: "TúMismo", // Could be dynamic if we had authentication
              date: "08/03/2025", // Fixed date as per requirements
              content: replyContent.trim()
            }
          ]
        };
      }
      return post;
    });
    
    setPosts(updatedPosts);
    setReplyContent("");
    setReplyingToPost(null);
    toast.success("Respuesta enviada correctamente");
  };
  
  // Get initials for avatar
  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };
  
  return (
    <div className="flex min-h-screen flex-col bg-[#333] text-white">
      <Navbar />
      
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">ForoCoches</h1>
            <p className="text-gray-300">
              El foro más random de la web. Comparte, pregunta y participa.
            </p>
          </div>
          
          {/* Categories tabs */}
          <Tabs defaultValue="General" value={activeCategory} onValueChange={setActiveCategory} className="mb-6">
            <TabsList className="grid grid-cols-5 md:w-auto w-full bg-[#444]">
              <TabsTrigger value="General" className="data-[state=active]:bg-[#ff4d4d] data-[state=active]:text-white">
                General
              </TabsTrigger>
              <TabsTrigger value="Viajes" className="data-[state=active]:bg-[#ff4d4d] data-[state=active]:text-white">
                Viajes
              </TabsTrigger>
              <TabsTrigger value="Alojamientos" className="data-[state=active]:bg-[#ff4d4d] data-[state=active]:text-white">
                Alojamientos
              </TabsTrigger>
              <TabsTrigger value="Offtopic" className="data-[state=active]:bg-[#ff4d4d] data-[state=active]:text-white">
                Offtopic
              </TabsTrigger>
              <TabsTrigger value="Humor" className="data-[state=active]:bg-[#ff4d4d] data-[state=active]:text-white">
                Humor
              </TabsTrigger>
            </TabsList>
            
            {/* New Thread button */}
            <div className="mt-4 mb-6">
              <Dialog open={isNewPostDialogOpen} onOpenChange={setIsNewPostDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#ff4d4d] hover:bg-[#e63939] text-white">
                    <Plus className="mr-2 h-4 w-4" /> Nuevo Hilo
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#444] text-white border-[#555]">
                  <DialogHeader>
                    <DialogTitle>Crear nuevo hilo</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium mb-1">
                        Título (máx. 50 caracteres)
                      </label>
                      <Input
                        id="title"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        maxLength={50}
                        placeholder="Escribe un título llamativo"
                        className="bg-[#333] border-[#555] text-white"
                      />
                      <div className="text-xs text-right mt-1">
                        {newPostTitle.length}/50
                      </div>
                    </div>
                    <div>
                      <label htmlFor="content" className="block text-sm font-medium mb-1">
                        Contenido
                      </label>
                      <Textarea
                        id="content"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="¿Qué quieres compartir?"
                        className="min-h-[100px] bg-[#333] border-[#555] text-white"
                      />
                    </div>
                    <Button 
                      onClick={handleNewPost} 
                      className="w-full bg-[#ff4d4d] hover:bg-[#e63939] text-white"
                    >
                      Crear Hilo
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Content for each tab */}
            <TabsContent value={activeCategory} className="space-y-4">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <Card key={post.id} className="bg-[#444] border-[#555] overflow-hidden">
                    <CardHeader className="pb-3 bg-[#3a3a3a]">
                      <CardTitle className="text-xl">
                        {post.title}
                      </CardTitle>
                      <div className="flex items-center text-sm text-gray-300 mt-1">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarFallback className="bg-[#ff4d4d] text-[10px]">
                            {getInitials(post.author)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{post.author}</span>
                        <span className="mx-2">•</span>
                        <span>{post.date}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="whitespace-pre-line mb-4">{post.content}</p>
                      
                      {/* Replies */}
                      {post.replies.length > 0 && (
                        <div className="mt-6 space-y-4 pt-4 border-t border-[#555]">
                          <h4 className="text-sm font-medium text-gray-300 mb-2">
                            Respuestas ({post.replies.length})
                          </h4>
                          {post.replies.map((reply) => (
                            <div key={reply.id} className="bg-[#3a3a3a] p-3 rounded-md">
                              <div className="flex items-center text-sm text-gray-300 mb-2">
                                <Avatar className="h-6 w-6 mr-2">
                                  <AvatarFallback className="bg-[#666] text-[10px]">
                                    {getInitials(reply.author)}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{reply.author}</span>
                                <span className="mx-2">•</span>
                                <span>{reply.date}</span>
                              </div>
                              <p className="text-sm whitespace-pre-line">{reply.content}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Reply form */}
                      {replyingToPost === post.id ? (
                        <div className="mt-4 pt-4 border-t border-[#555]">
                          <label htmlFor={`reply-${post.id}`} className="block text-sm font-medium mb-2">
                            Tu respuesta
                          </label>
                          <Textarea
                            id={`reply-${post.id}`}
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Escribe tu respuesta..."
                            className="min-h-[80px] bg-[#333] border-[#555] text-white mb-2"
                          />
                          <div className="flex space-x-2">
                            <Button 
                              onClick={() => handleReply(post.id)} 
                              className="bg-[#ff4d4d] hover:bg-[#e63939] text-white"
                            >
                              Enviar
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => setReplyingToPost(null)}
                              className="border-[#555] text-white hover:bg-[#555]"
                            >
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button 
                          onClick={() => setReplyingToPost(post.id)} 
                          variant="outline"
                          className="mt-4 border-[#555] text-white hover:bg-[#555]"
                        >
                          <MessageSquare className="mr-2 h-4 w-4" /> Responder
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="bg-[#444] border-[#555]">
                  <CardContent className="pt-6 pb-6 text-center">
                    <p>No hay hilos en esta categoría. ¡Sé el primero en crear uno!</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForoCochesPage;
