
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reply, ThumbsUp, Flag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";
import { Comment } from "./types";
import ReactMarkdown from "react-markdown";

interface CommentItemProps {
  comment: Comment;
  onReply: (comment: Comment) => void;
  isThread?: boolean;
  isReply?: boolean;
}

const CommentItem = ({ comment, onReply, isThread = false, isReply = false }: CommentItemProps) => {
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

  // Extract title from content for thread posts
  const getContentParts = () => {
    if (!isThread || !comment.content.includes("**")) {
      return { title: null, content: comment.content };
    }

    const parts = comment.content.split("\n\n");
    const title = parts[0].replace(/\*\*/g, "");
    const content = parts.slice(1).join("\n\n");
    
    return { title, content };
  };

  const { title, content } = getContentParts();

  return (
    <Card 
      key={comment.id} 
      id={comment.id} 
      className={`bg-white border-gray-200 text-gray-900 shadow-sm ${isReply ? "mt-3" : ""}`}
    >
      <CardHeader className={`pb-3 border-b border-gray-100 ${isThread ? "bg-gray-50" : ""}`}>
        <div className="flex items-center gap-3">
          <Avatar className="border-2 border-familyxp-primary">
            {comment.profiles?.avatar_url ? (
              <AvatarImage src={comment.profiles.avatar_url} alt="Avatar" />
            ) : (
              <AvatarFallback className="bg-gray-100 text-gray-600">{getInitials(comment)}</AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1">
            {title && isThread ? (
              <p className="font-bold text-lg text-gray-900">{title}</p>
            ) : null}
            <div className="flex items-center justify-between">
              <p className="font-medium text-gray-900">
                {comment.profiles?.first_name || "Usuario"}{" "}
                {comment.profiles?.last_name || ""}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(comment.created_at)}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3 pt-4">
        <div className="whitespace-pre-line text-gray-700">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
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
    </Card>
  );
};

export default CommentItem;
