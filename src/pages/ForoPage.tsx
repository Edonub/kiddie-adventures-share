
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ForumCategory } from "@/components/forum/ForumCategories";
import ForumHeader from "@/components/forum/ForumHeader";
import ForumContent from "@/components/forum/ForumContent";
import { useForumData } from "@/hooks/use-forum-data";
import { TabsContent } from "@/components/ui/tabs";
import CreatePostDialog from "@/components/forum/CreatePostDialog";

const ForoPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<ForumCategory>("general");
  const { comments, loading, showSampleData, fetchComments } = useForumData(selectedCategory);
  const [replyingToComment, setReplyingToComment] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      
      <main className="flex-1 py-10">
        <div className="container px-4 mx-auto max-w-4xl">
          <ForumHeader showSampleData={showSampleData} />
          
          {/* New Thread button */}
          <div className="mt-4 mb-6">
            <CreatePostDialog 
              activeCategory={selectedCategory} 
              onPostCreated={fetchComments} 
            />
          </div>
          
          <ForumContent 
            comments={comments}
            loading={loading}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onCommentSubmitted={fetchComments}
            replyingToComment={replyingToComment}
            setReplyingToComment={setReplyingToComment}
          />
          
          {/* Tab content similar to ForoCoches */}
          <TabsContent value={selectedCategory} className="mt-6">
            {!loading && comments.length === 0 && (
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <p className="text-gray-500">No hay hilos en esta categoría. ¡Sé el primero en crear uno!</p>
              </div>
            )}
          </TabsContent>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForoPage;
