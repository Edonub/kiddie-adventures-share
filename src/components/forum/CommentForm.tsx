
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ForumCategory } from "@/components/forum/ForumCategories";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AvatarSelector from "@/components/forum/AvatarSelector";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);

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
      // If user has selected a new avatar, update their profile
      if (selectedAvatar) {
        const { error: profileError } = await supabase
          .from("profiles")
          .update({ avatar_url: selectedAvatar })
          .eq("id", user.id);
          
        if (profileError) throw profileError;
      }
      
      // Now add the comment
      const commentData = {
        content: newComment.trim(),
        user_id: user.id,
        parent_id: replyTo ? replyTo.id : null,
        // Use metadata for category if needed in the future
        // We could add a metadata column in the future
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

  const handleAvatarSelected = (avatarUrl: string) => {
    setSelectedAvatar(avatarUrl);
    setIsAvatarDialogOpen(false);
  };

  return (
    <Card className="mb-8 bg-white border-gray-200">
      <CardHeader className="border-b border-gray-100">
        <CardTitle>Escribe un comentario</CardTitle>
        <CardDescription>
          Comparte tus experiencias o pregunta sobre actividades en familia
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmitComment}>
        <CardContent className="pt-6">
          {replyTo && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg flex justify-between items-center border border-gray-200">
              <div>
                <span className="text-sm text-gray-500">Respondiendo a:</span>
                <p className="text-sm font-medium text-gray-700">
                  {replyTo.profiles?.first_name || "Usuario"}: {replyTo.content.substring(0, 100)}
                  {replyTo.content.length > 100 ? "..." : ""}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setReplyTo(null)}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
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
            className="min-h-[120px] bg-white border-gray-200 placeholder:text-gray-400"
          />
          
          <div className="mt-4 flex items-center gap-3">
            <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  type="button"
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2 border-gray-200 hover:bg-familyxp-light hover:text-familyxp-primary hover:border-familyxp-primary"
                >
                  {selectedAvatar ? (
                    <>
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={selectedAvatar} alt="Selected avatar" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      Cambiar avatar
                    </>
                  ) : (
                    <>Elegir avatar</>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Selecciona un avatar</DialogTitle>
                </DialogHeader>
                <AvatarSelector onSelect={handleAvatarSelected} selectedAvatar={selectedAvatar || undefined} />
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t border-gray-100 pt-4">
          <Button 
            type="submit" 
            disabled={!newComment.trim()}
            className="bg-familyxp-primary hover:bg-familyxp-primary/90 text-white"
          >
            {replyTo ? "Responder" : "Publicar comentario"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CommentForm;
