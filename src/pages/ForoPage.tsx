
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import CommentForm from "@/components/forum/CommentForm";
import CommentList from "@/components/forum/CommentList";
import { Comment } from "@/components/forum/types";

const ForoPage = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
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
          
          <CommentForm 
            replyTo={replyTo} 
            setReplyTo={setReplyTo} 
            onCommentSubmitted={fetchComments} 
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
