
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reply, ThumbsUp, Flag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";

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

interface CommentItemProps {
  comment: Comment;
  onReply: (comment: Comment) => void;
}

const CommentItem = ({ comment, onReply }: CommentItemProps) => {
  const [likes, setLikes] = useState(Math.floor(Math.random() * 10)); // Just for demo

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: es,
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

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <Card key={comment.id} id={comment.id} className="bg-white border-gray-200 text-gray-900 shadow-sm">
      <CardHeader className="pb-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Avatar className="border-2 border-familyxp-primary">
            {comment.profiles?.avatar_url ? (
              <img src={comment.profiles.avatar_url} alt="Avatar" />
            ) : (
              <AvatarFallback className="bg-gray-100 text-gray-600">{getInitials(comment)}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="font-medium text-gray-900">
              {comment.profiles?.first_name || "Usuario"}{" "}
              {comment.profiles?.last_name || ""}
            </p>
            <p className="text-xs text-gray-500">
              {formatDate(comment.created_at)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3 pt-4">
        <p className="whitespace-pre-line text-gray-700">{comment.content}</p>
      </CardContent>
      <CardFooter className="flex gap-4 pt-0 text-sm text-gray-500 border-t border-gray-100 py-3">
        <Button
          variant="ghost"
          size="sm"
          className="p-0 h-auto hover:text-familyxp-primary hover:bg-transparent"
          onClick={() => onReply(comment)}
        >
          <Reply size={16} className="mr-1" /> Responder
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="p-0 h-auto hover:text-familyxp-primary hover:bg-transparent"
          onClick={handleLike}
        >
          <ThumbsUp size={16} className="mr-1" /> {likes}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="p-0 h-auto hover:text-familyxp-primary hover:bg-transparent ml-auto"
        >
          <Flag size={16} className="mr-1" /> Reportar
        </Button>
      </CardFooter>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-6 pl-6 pr-4 pb-4 border-l-2 border-gray-100 bg-gray-50">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-8 w-8 border-2 border-familyxp-primary">
                  {reply.profiles?.avatar_url ? (
                    <img src={reply.profiles.avatar_url} alt="Avatar" />
                  ) : (
                    <AvatarFallback className="bg-gray-100 text-gray-600">{getInitials(reply)}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="font-medium text-sm text-gray-900">
                    {reply.profiles?.first_name || "Usuario"}{" "}
                    {reply.profiles?.last_name || ""}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(reply.created_at)}
                  </p>
                </div>
              </div>
              <p className="text-sm ml-10 whitespace-pre-line text-gray-600">{reply.content}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default CommentItem;
