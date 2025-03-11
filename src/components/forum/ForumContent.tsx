
import { Card } from "@/components/ui/card";
import ForumCategories, { ForumCategory } from "./ForumCategories";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { Comment } from "./types";

interface ForumContentProps {
  comments: Comment[];
  loading: boolean;
  selectedCategory: ForumCategory;
  onCategoryChange: (category: ForumCategory) => void;
  onCommentSubmitted: () => void;
  replyingToComment: string | null;
  setReplyingToComment: (commentId: string | null) => void;
}

const ForumContent = ({ 
  comments, 
  loading, 
  selectedCategory, 
  onCategoryChange, 
  onCommentSubmitted,
  replyingToComment,
  setReplyingToComment
}: ForumContentProps) => {
  return (
    <>
      <Card className="bg-white border-gray-200 p-4 mb-6 shadow-sm">
        <ForumCategories 
          selectedCategory={selectedCategory} 
          onCategoryChange={onCategoryChange} 
        />
      </Card>
      
      {replyingToComment === "new" && (
        <CommentForm 
          replyTo={null} 
          setReplyTo={() => setReplyingToComment(null)} 
          onCommentSubmitted={() => {
            onCommentSubmitted();
            setReplyingToComment(null);
          }}
          category={selectedCategory}
        />
      )}
      
      <CommentList 
        comments={comments} 
        loading={loading} 
        onReply={(comment) => {
          setReplyingToComment(comment.id);
        }}
        replyingToComment={replyingToComment}
        setReplyingToComment={setReplyingToComment}
        onCommentSubmitted={onCommentSubmitted}
        category={selectedCategory}
      />
    </>
  );
};

export default ForumContent;
