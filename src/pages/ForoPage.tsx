
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { MessageSquare, ThumbsUp, Reply, Share, AlertCircle } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { useNavigate } from "react-router-dom";

// Creamos un tipo para los comentarios
type Comment = {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  parent_id: string | null;
  profiles?: {
    first_name: string;
    last_name: string;
    avatar_url: string;
  };
  replies?: Comment[];
};

const ForoPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<Comment | null>(null);

  useEffect(() => {
    fetchComments();
  }, []);

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

      setComments(commentsWithReplies);
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Error al cargar los comentarios del foro");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Debes iniciar sesión para comentar");
      navigate("/auth");
      return;
    }
    
    if (!newComment.trim()) {
      toast.error("El comentario no puede estar vacío");
      return;
    }
    
    try {
      const commentData = {
        content: newComment.trim(),
        user_id: user.id,
        parent_id: replyTo ? replyTo.id : null
      };
      
      const { error } = await supabase
        .from("comments")
        .insert(commentData);
        
      if (error) throw error;
      
      toast.success(replyTo ? "Respuesta enviada" : "Comentario publicado");
      setNewComment("");
      setReplyTo(null);
      fetchComments();
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Error al publicar el comentario");
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { 
        addSuffix: true,
        locale: es
      });
    } catch (e) {
      return "fecha desconocida";
    }
  };

  const getInitials = (comment: Comment) => {
    if (!comment.profiles) return "?";
    
    const firstName = comment.profiles.first_name || "";
    const lastName = comment.profiles.last_name || "";
    
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "?";
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-10 bg-gray-50">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Foro de Familea</h1>
            <p className="text-gray-600">
              Comparte tus preguntas, sugerencias y experiencias con la comunidad de Familea.
            </p>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Escribe un comentario</CardTitle>
              <CardDescription>
                Comparte tus experiencias o pregunta sobre actividades en familia
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmitComment}>
              <CardContent>
                {replyTo && (
                  <div className="mb-4 p-3 bg-gray-100 rounded-lg flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-500">Respondiendo a:</span>
                      <p className="text-sm font-medium">
                        {replyTo.profiles?.first_name || "Usuario"}: {replyTo.content.substring(0, 100)}
                        {replyTo.content.length > 100 ? "..." : ""}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setReplyTo(null)}
                    >
                      Cancelar
                    </Button>
                  </div>
                )}
                <Textarea
                  placeholder={
                    replyTo 
                      ? `Escribe tu respuesta a ${replyTo.profiles?.first_name || "este comentario"}...` 
                      : "¿Qué quieres compartir o preguntar a la comunidad?"
                  }
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[120px]"
                />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={!newComment.trim()}>
                  {replyTo ? "Responder" : "Publicar comentario"}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <div className="space-y-6">
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200" />
                        <div className="h-5 w-32 bg-gray-200 rounded" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                      <div className="h-4 w-3/4 bg-gray-200 rounded" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : comments.length > 0 ? (
              <>
                {comments.map((comment) => (
                  <Card key={comment.id} id={comment.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          {comment.profiles?.avatar_url ? (
                            <img src={comment.profiles.avatar_url} alt="Avatar" />
                          ) : (
                            <AvatarFallback>{getInitials(comment)}</AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {comment.profiles?.first_name || "Usuario"} {comment.profiles?.last_name || ""}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDate(comment.created_at)}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="whitespace-pre-line">{comment.content}</p>
                    </CardContent>
                    <CardFooter className="flex gap-4 pt-0 text-sm text-gray-500">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-0 h-auto"
                        onClick={() => setReplyTo(comment)}
                      >
                        <Reply size={16} className="mr-1" /> Responder
                      </Button>
                    </CardFooter>
                    
                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-6 pl-6 pr-4 pb-4 border-l-2 border-gray-100">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="mt-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Avatar className="h-8 w-8">
                                {reply.profiles?.avatar_url ? (
                                  <img src={reply.profiles.avatar_url} alt="Avatar" />
                                ) : (
                                  <AvatarFallback>{getInitials(reply)}</AvatarFallback>
                                )}
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">
                                  {reply.profiles?.first_name || "Usuario"} {reply.profiles?.last_name || ""}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {formatDate(reply.created_at)}
                                </p>
                              </div>
                            </div>
                            <p className="text-sm ml-10 whitespace-pre-line">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
              </>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <AlertCircle className="h-10 w-10 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-600 mb-1">No hay comentarios aún</p>
                  <p className="text-gray-500 text-center">
                    ¡Sé el primero en compartir algo con la comunidad!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForoPage;
