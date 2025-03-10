
import { useState } from "react";
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
}

const ForumContent = ({ 
  comments, 
  loading, 
  selectedCategory, 
  onCategoryChange, 
  onCommentSubmitted 
}: ForumContentProps) => {
  const [replyTo, setReplyTo] = useState<Comment | null>(null);

  return (
    <>
      <Card className="bg-white border-gray-200 p-4 mb-6 shadow-sm">
        <ForumCategories 
          selectedCategory={selectedCategory} 
          onCategoryChange={onCategoryChange} 
        />
      </Card>
      
      <CommentForm 
        replyTo={replyTo} 
        setReplyTo={setReplyTo} 
        onCommentSubmitted={onCommentSubmitted}
        category={selectedCategory}
      />
      
      <CommentList 
        comments={comments} 
        loading={loading} 
        onReply={setReplyTo} 
      />
    </>
  );
};

export default ForumContent;
