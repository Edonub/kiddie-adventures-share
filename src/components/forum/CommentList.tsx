
import CommentItem from "./CommentItem";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

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

interface CommentListProps {
  comments: Comment[];
  loading: boolean;
  onReply: (comment: Comment) => void;
}

const CommentList = ({ comments, loading, onReply }: CommentListProps) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200" />
                <div className="h-5 w-32 bg-gray-200 rounded" />
              </div>
              <div className="mt-4">
                <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <AlertCircle className="h-10 w-10 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-600 mb-1">No hay comentarios aún</p>
          <p className="text-gray-500 text-center">
            ¡Sé el primero en compartir algo con la comunidad!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onReply={onReply} />
      ))}
    </div>
  );
};

export default CommentList;
