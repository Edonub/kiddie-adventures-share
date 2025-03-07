
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reply } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

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

  return (
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
              {comment.profiles?.first_name || "Usuario"}{" "}
              {comment.profiles?.last_name || ""}
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
          onClick={() => onReply(comment)}
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
                    {reply.profiles?.first_name || "Usuario"}{" "}
                    {reply.profiles?.last_name || ""}
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
  );
};

export default CommentItem;
