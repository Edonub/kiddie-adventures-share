
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, ThumbsUp, User, Calendar, Flag, Clock, Eye, ArrowUp, Reply, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Enhanced forum data
const forumCategories = ["Todos", "Actividades", "Consejos", "Experiencias", "Quedadas"];

const forumPosts = [
  {
    id: "1",
    title: "Recomendaciones para actividades en Madrid con niños de 5 años",
    content: "Hola a todos, estamos planeando pasar un fin de semana en Madrid con nuestros hijos de 5 años. ¿Alguien tiene buenas recomendaciones para actividades infantiles en la ciudad? Gracias por adelantado.",
    author: "María López",
    authorStatus: "Miembro",
    date: "15 de mayo, 2023",
    time: "14:35",
    likes: 12,
    replies: 8,
    views: 156,
    category: "Actividades",
    tags: ["Madrid", "5 años", "Fin de semana"],
    isSticky: false
  },
  {
    id: "2",
    title: "¿Cómo organizáis vuestras quedadas entre familias?",
    content: "Quisiera saber cómo organizáis las quedadas entre varias familias con niños. ¿Utilizáis alguna app especial? ¿Cómo gestionáis las diferentes edades? Compartid vuestras experiencias, por favor.",
    author: "Carlos Rodríguez",
    authorStatus: "Miembro activo",
    date: "3 de junio, 2023",
    time: "10:22",
    likes: 20,
    replies: 15,
    views: 342,
    category: "Quedadas",
    tags: ["Organización", "Grupos", "Planificación"],
    isSticky: false
  },
  {
    id: "3",
    title: "Consejos para viaje a la playa con bebés",
    content: "Este verano viajaremos a la playa con nuestro bebé de 10 meses. Es nuestra primera experiencia y estamos un poco nerviosos. ¿Qué consejos nos podéis dar? ¿Qué no puede faltar en la maleta?",
    author: "Laura Martín",
    authorStatus: "Miembro veterano",
    date: "20 de junio, 2023",
    time: "18:45",
    likes: 25,
    replies: 18,
    views: 421,
    category: "Consejos",
    tags: ["Playa", "Bebés", "Viajes"],
    isSticky: true
  },
  {
    id: "4",
    title: "Experiencia en el taller de ciencia del Museo Nacional",
    content: "Este fin de semana llevamos a los niños al taller de ciencia del Museo Nacional y queremos compartir nuestra experiencia. Fue increíble ver cómo los niños disfrutaron experimentando. Recomendamos totalmente esta actividad.",
    author: "Pedro Sánchez",
    authorStatus: "Miembro nuevo",
    date: "10 de julio, 2023",
    time: "12:15",
    likes: 15,
    replies: 5,
    views: 187,
    category: "Experiencias",
    tags: ["Museo", "Ciencia", "Taller"],
    isSticky: false
  },
  {
    id: "5",
    title: "[OFICIAL] Normas del foro Familea - Leer antes de postear",
    content: "Bienvenidos al foro oficial de Familea. Este es un espacio de respeto y colaboración para compartir experiencias sobre actividades familiares. Por favor, lee las normas antes de participar.",
    author: "Admin Familea",
    authorStatus: "Administrador",
    date: "1 de enero, 2023",
    time: "00:01",
    likes: 56,
    replies: 2,
    views: 1543,
    category: "Todos",
    tags: ["Normas", "Oficial", "Importante"],
    isSticky: true
  },
];

// New thread row component with a more "forocoches" style
const ForumThreadRow = ({ post }: { post: typeof forumPosts[0] }) => {
  return (
    <div className={`border-b px-2 py-3 grid grid-cols-12 gap-2 hover:bg-gray-50 ${post.isSticky ? "bg-gray-50 border-l-4 border-l-familyxp-primary" : ""}`}>
      <div className="col-span-7 sm:col-span-8">
        <div className="flex items-start gap-2">
          {post.isSticky && (
            <ArrowUp className="h-4 w-4 flex-shrink-0 text-familyxp-primary" />
          )}
          <div>
            <h3 className="text-base font-semibold text-familyxp-dark hover:text-familyxp-primary">
              {post.title}
            </h3>
            <div className="flex flex-wrap gap-1 mt-1">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="col-span-2 sm:col-span-1 text-xs text-gray-500 text-center hidden sm:block">
        <div className="flex flex-col items-center">
          <Eye size={14} className="mb-1" />
          <span>{post.views}</span>
        </div>
      </div>
      
      <div className="col-span-2 sm:col-span-1 text-xs text-gray-500 text-center">
        <div className="flex flex-col items-center">
          <MessageSquare size={14} className="mb-1" />
          <span>{post.replies}</span>
        </div>
      </div>
      
      <div className="col-span-3 sm:col-span-2 text-xs text-gray-500 hidden sm:block">
        <div className="flex flex-col">
          <span className="font-medium">{post.author}</span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {post.time}
          </span>
        </div>
      </div>
    </div>
  );
};

const ForoPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filteredPosts = selectedCategory === "Todos" 
    ? forumPosts 
    : forumPosts.filter(post => post.category === selectedCategory);

  // Sort posts to show sticky ones at the top
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isSticky && !b.isSticky) return -1;
    if (!a.isSticky && b.isSticky) return 1;
    return 0;
  });

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 py-4">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="bg-white rounded-lg border mb-4 p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h1 className="text-xl font-bold text-familyxp-dark">Foro Familea</h1>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {isSearchOpen ? (
                  <div className="flex items-center w-full">
                    <Input placeholder="Buscar en el foro..." className="rounded-r-none" />
                    <Button className="bg-familyxp-primary rounded-l-none">
                      <Search size={18} />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button variant="outline" size="sm" onClick={() => setIsSearchOpen(true)}>
                      <Search size={16} className="mr-2" /> Buscar
                    </Button>
                    <Button className="bg-familyxp-primary" size="sm">
                      <MessageSquare size={16} className="mr-2" /> Nuevo tema
                    </Button>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {forumCategories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer ${selectedCategory === category ? "bg-familyxp-primary" : ""}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>

            <Tabs defaultValue="populares" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="populares">Populares</TabsTrigger>
                <TabsTrigger value="recientes">Recientes</TabsTrigger>
                <TabsTrigger value="sin_respuesta">Sin respuesta</TabsTrigger>
              </TabsList>
              
              <TabsContent value="populares" className="border rounded-md">
                <div className="border-b px-2 py-2 grid grid-cols-12 gap-2 bg-gray-100 text-xs font-medium">
                  <div className="col-span-7 sm:col-span-8">Tema</div>
                  <div className="col-span-2 sm:col-span-1 text-center hidden sm:block">Vistas</div>
                  <div className="col-span-2 sm:col-span-1 text-center">Resp.</div>
                  <div className="col-span-3 sm:col-span-2 hidden sm:block">Último mensaje</div>
                </div>
                
                {sortedPosts.map((post) => (
                  <ForumThreadRow key={post.id} post={post} />
                ))}
              </TabsContent>
              
              <TabsContent value="recientes">
                <Card>
                  <CardContent className="p-8 text-center text-gray-500">
                    <MessageSquare className="mx-auto mb-2" size={40} />
                    <p>Los temas recientes aparecerán aquí.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="sin_respuesta">
                <Card>
                  <CardContent className="p-8 text-center text-gray-500">
                    <MessageSquare className="mx-auto mb-2" size={40} />
                    <p>Los temas sin respuesta aparecerán aquí.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3">
              <Card className="mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Estadísticas del foro</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-500">Temas</p>
                      <p className="text-xl font-bold">128</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Mensajes</p>
                      <p className="text-xl font-bold">1,542</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Usuarios</p>
                      <p className="text-xl font-bold">276</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Último usuario</p>
                      <p className="text-base font-medium">AnaPérez84</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Usuarios en línea (12)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Avatar className="h-8 w-8 bg-familyxp-tertiary cursor-pointer">
                      <AvatarFallback className="text-familyxp-primary text-xs">ML</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-8 w-8 bg-familyxp-tertiary cursor-pointer">
                      <AvatarFallback className="text-familyxp-primary text-xs">CR</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-8 w-8 bg-familyxp-tertiary cursor-pointer">
                      <AvatarFallback className="text-familyxp-primary text-xs">JG</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-8 w-8 bg-familyxp-tertiary cursor-pointer">
                      <AvatarFallback className="text-familyxp-primary text-xs">AP</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-8 w-8 bg-familyxp-tertiary cursor-pointer">
                      <AvatarFallback className="text-familyxp-primary text-xs">PT</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-8 w-8 bg-familyxp-tertiary cursor-pointer">
                      <AvatarFallback className="text-familyxp-primary text-xs">RM</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-500 self-center">y 6 más...</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Reglas del foro</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>Sé respetuoso con todos los miembros</li>
                    <li>No compartas información personal de menores</li>
                    <li>Evita el contenido inapropiado</li>
                    <li>Utiliza las etiquetas adecuadas</li>
                    <li>No promociones comerciales sin permiso</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Leyenda</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <ArrowUp size={16} className="text-familyxp-primary" />
                      <span>Tema fijado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flag size={16} className="text-amber-500" />
                      <span>Tema importante</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare size={16} className="text-green-500" />
                      <span>Nuevo mensaje</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Reply size={16} />
                      <span>Has participado</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForoPage;
