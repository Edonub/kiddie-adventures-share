
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ForumCategory } from "@/components/forum/ForumCategories";
import ForumHeader from "@/components/forum/ForumHeader";
import ForumContent from "@/components/forum/ForumContent";
import { useForumData } from "@/hooks/use-forum-data";

const ForoPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<ForumCategory>("general");
  const { comments, loading, showSampleData, fetchComments } = useForumData(selectedCategory);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      
      <main className="flex-1 py-10">
        <div className="container px-4 mx-auto max-w-4xl">
          <ForumHeader showSampleData={showSampleData} />
          <ForumContent 
            comments={comments}
            loading={loading}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onCommentSubmitted={fetchComments}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForoPage;
