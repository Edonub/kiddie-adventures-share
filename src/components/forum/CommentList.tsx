
import { useState } from "react";
import CommentItem from "./CommentItem";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Comment } from "./types";
import CommentForm from "./CommentForm";
import { ForumCategory } from "./ForumCategories";

interface CommentListProps {
  comments: Comment[];
  loading: boolean;
  onReply: (comment: Comment) => void;
  replyingToComment: string | null;
  setReplyingToComment: (commentId: string | null) => void;
  onCommentSubmitted: () => void;
  category: ForumCategory;
}

const CommentList = ({ 
  comments, 
  loading, 
  onReply, 
  replyingToComment,
  setReplyingToComment,
  onCommentSubmitted,
  category
}: CommentListProps) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse bg-gray-50 border-gray-200">
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
      <Card className="bg-white border-gray-200">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <AlertCircle className="h-10 w-10 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-700 mb-1">No hay temas aún</p>
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
        <div key={comment.id}>
          <CommentItem 
            comment={comment} 
            onReply={onReply} 
            isThread={true}
          />
          
          {replyingToComment === comment.id && (
            <div className="mt-4 mb-6 pl-4 border-l-2 border-familyxp-primary/20">
              <CommentForm 
                replyTo={comment} 
                setReplyTo={() => setReplyingToComment(null)} 
                onCommentSubmitted={() => {
                  onCommentSubmitted();
                  setReplyingToComment(null);
                }}
                category={category}
              />
            </div>
          )}
          
          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-2 space-y-3 pl-6 border-l-2 border-gray-100">
              {comment.replies.map((reply) => (
                <CommentItem 
                  key={reply.id} 
                  comment={reply} 
                  onReply={onReply} 
                  isReply={true}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
