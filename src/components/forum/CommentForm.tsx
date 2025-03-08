
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ForumCategory } from "@/components/forum/ForumCategories";

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
};

interface CommentFormProps {
  replyTo: Comment | null;
  setReplyTo: (comment: Comment | null) => void;
  onCommentSubmitted: () => void;
  category?: ForumCategory;
}

const CommentForm = ({ replyTo, setReplyTo, onCommentSubmitted, category = "general" }: CommentFormProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");

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
        parent_id: replyTo ? replyTo.id : null,
        // We'll add a metadata column for category in future if needed
      };
      
      const { error } = await supabase
        .from("comments")
        .insert(commentData);
        
      if (error) throw error;
      
      toast.success(replyTo ? "Respuesta enviada" : "Comentario publicado");
      setNewComment("");
      setReplyTo(null);
      onCommentSubmitted();
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Error al publicar el comentario");
    }
  };

  return (
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
  );
};

export default CommentForm;
