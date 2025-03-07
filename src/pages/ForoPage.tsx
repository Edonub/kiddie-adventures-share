
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, ThumbsUp, User, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Sample forum data
const forumCategories = ["Todos", "Actividades", "Consejos", "Experiencias", "Quedadas"];

const forumPosts = [
  {
    id: "1",
    title: "Recomendaciones para actividades en Madrid con niños de 5 años",
    content: "Hola a todos, estamos planeando pasar un fin de semana en Madrid con nuestros hijos de 5 años. ¿Alguien tiene buenas recomendaciones para actividades infantiles en la ciudad? Gracias por adelantado.",
    author: "María López",
    date: "15 de mayo, 2023",
    likes: 12,
    replies: 8,
    category: "Actividades",
    tags: ["Madrid", "5 años", "Fin de semana"]
  },
  {
    id: "2",
    title: "¿Cómo organizáis vuestras quedadas entre familias?",
    content: "Quisiera saber cómo organizáis las quedadas entre varias familias con niños. ¿Utilizáis alguna app especial? ¿Cómo gestionáis las diferentes edades? Compartid vuestras experiencias, por favor.",
    author: "Carlos Rodríguez",
    date: "3 de junio, 2023",
    likes: 20,
    replies: 15,
    category: "Quedadas",
    tags: ["Organización", "Grupos", "Planificación"]
  },
  {
    id: "3",
    title: "Consejos para viaje a la playa con bebés",
    content: "Este verano viajaremos a la playa con nuestro bebé de 10 meses. Es nuestra primera experiencia y estamos un poco nerviosos. ¿Qué consejos nos podéis dar? ¿Qué no puede faltar en la maleta?",
    author: "Laura Martín",
    date: "20 de junio, 2023",
    likes: 25,
    replies: 18,
    category: "Consejos",
    tags: ["Playa", "Bebés", "Viajes"]
  },
  {
    id: "4",
    title: "Experiencia en el taller de ciencia del Museo Nacional",
    content: "Este fin de semana llevamos a los niños al taller de ciencia del Museo Nacional y queremos compartir nuestra experiencia. Fue increíble ver cómo los niños disfrutaron experimentando. Recomendamos totalmente esta actividad.",
    author: "Pedro Sánchez",
    date: "10 de julio, 2023",
    likes: 15,
    replies: 5,
    category: "Experiencias",
    tags: ["Museo", "Ciencia", "Taller"]
  },
];

const ForumPostCard = ({ post }: { post: typeof forumPosts[0] }) => {
  return (
    <div className="border rounded-lg p-4 mb-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold text-familyxp-dark hover:text-familyxp-primary">
            {post.title}
          </h3>
          <div className="flex gap-2 mt-1">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <Badge className="bg-familyxp-tertiary text-familyxp-primary">
          {post.category}
        </Badge>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="bg-familyxp-tertiary text-familyxp-primary text-xs">
              <User size={12} />
            </AvatarFallback>
          </Avatar>
          <span>{post.author}</span>
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {post.date}
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <ThumbsUp size={14} />
            {post.likes}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare size={14} />
            {post.replies}
          </span>
        </div>
      </div>
    </div>
  );
};

const ForoPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredPosts = selectedCategory === "Todos" 
    ? forumPosts 
    : forumPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Foro de la comunidad</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conecta con otras familias, comparte experiencias y encuentra consejos útiles para disfrutar al máximo con los más pequeños
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Tabs defaultValue="populares">
                  <div className="flex justify-between items-center">
                    <TabsList>
                      <TabsTrigger value="populares">Populares</TabsTrigger>
                      <TabsTrigger value="recientes">Recientes</TabsTrigger>
                      <TabsTrigger value="sin_respuesta">Sin respuesta</TabsTrigger>
                    </TabsList>
                    
                    <Button className="bg-familyxp-primary">Crear tema</Button>
                  </div>
                  
                  <TabsContent value="populares">
                    <div className="mt-4">
                      {filteredPosts.map((post) => (
                        <ForumPostCard key={post.id} post={post} />
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="recientes">
                    <div className="mt-4 p-8 text-center text-gray-500">
                      <MessageSquare className="mx-auto mb-2" size={40} />
                      <p>¡Pronto habrá más temas!</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="sin_respuesta">
                    <div className="mt-4 p-8 text-center text-gray-500">
                      <MessageSquare className="mx-auto mb-2" size={40} />
                      <p>¡Pronto habrá más temas!</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg border p-4 mb-6">
                <h3 className="font-semibold mb-3">Buscar en el foro</h3>
                <Input placeholder="Palabra clave..." className="mb-3" />
                <Button className="w-full bg-familyxp-primary">Buscar</Button>
              </div>
              
              <div className="bg-white rounded-lg border p-4 mb-6">
                <h3 className="font-semibold mb-3">Categorías</h3>
                <div className="space-y-2">
                  {forumCategories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className={selectedCategory === category ? "bg-familyxp-primary" : ""}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg border p-4">
                <h3 className="font-semibold mb-3">Normas del foro</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                  <li>Sé respetuoso con todos los miembros</li>
                  <li>No compartas información personal</li>
                  <li>Evita el contenido inapropiado</li>
                  <li>Mantén tus publicaciones relacionadas con la temática</li>
                  <li>No promociones productos o servicios sin permiso</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForoPage;
