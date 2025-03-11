
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AvatarSelector } from "./AvatarSelector";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Comment } from "./types";
import { ForumCategory } from "./ForumCategories";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  content: z.string().min(5, {
    message: "El contenido debe tener al menos 5 caracteres.",
  }),
  title: z.string().optional(),
});

interface CommentFormProps {
  replyTo: Comment | null;
  setReplyTo: (comment: Comment | null) => void;
  onCommentSubmitted: () => void;
  category: ForumCategory;
}

const CommentForm = ({ replyTo, setReplyTo, onCommentSubmitted, category }: CommentFormProps) => {
  const { user } = useAuth();
  const [avatar, setAvatar] = useState(Math.floor(Math.random() * 20) + 1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTitleField, setShowTitleField] = useState(!replyTo);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      content: "",
      title: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      let finalContent = values.content;
      
      // If it's a new thread and has a title, format it as markdown
      if (showTitleField && values.title) {
        finalContent = `**${values.title}**\n\n${values.content}`;
      }
      
      const { error } = await supabase.from("comments").insert({
        content: finalContent,
        user_id: user?.id || null,
        parent_id: replyTo?.id || null,
        anonymous_name: !user ? values.name : null,
        anonymous_avatar: !user ? `avatar-${avatar}` : null,
        category: category,
      });

      if (error) throw error;

      form.reset();
      setReplyTo(null);
      onCommentSubmitted();
      toast.success(replyTo ? "Respuesta enviada correctamente" : "Tema creado correctamente");
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Error al enviar el comentario. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-white border-gray-200 shadow-sm mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold">
            {replyTo ? "Responder" : "Nuevo tema"}
          </CardTitle>
          {replyTo && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setReplyTo(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        {replyTo && (
          <div className="text-sm text-gray-500 mt-1">
            Respondiendo a: {replyTo.profiles?.first_name || "Usuario"}{" "}
            {replyTo.profiles?.last_name || ""}
          </div>
        )}
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {!user && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex space-x-4 items-start">
                          <AvatarSelector
                            selected={avatar}
                            onSelect={setAvatar}
                          />
                          <Input
                            placeholder="Tu nombre"
                            className="flex-1"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Title field for new threads */}
            {showTitleField && (
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Título del tema"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder={replyTo ? "Escribe tu respuesta aquí..." : "¿Qué quieres compartir con la comunidad?"}
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-familyxp-primary hover:bg-familyxp-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? "Enviando..." 
                : replyTo 
                  ? "Enviar respuesta" 
                  : "Crear tema"
              }
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default CommentForm;
