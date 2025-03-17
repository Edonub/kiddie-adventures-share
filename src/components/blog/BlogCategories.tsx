
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { BlogPost, blogCategories } from "./types";
import { useState } from "react";

interface BlogCategoriesProps {
  isLoading: boolean;
  recentPosts: BlogPost[];
  blogPosts: BlogPost[];
}

const BlogCategories = ({ isLoading, recentPosts, blogPosts }: BlogCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState("todos");

  // Filter posts by category
  const getPostsByCategory = (category: string) => {
    if (category === "todos") return recentPosts;
    return blogPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
  };

  // Check if a category has posts
  const categoryHasPosts = (category: string) => {
    if (category === "todos") return recentPosts.length > 0;
    return blogPosts.some(post => post.category.toLowerCase() === category.toLowerCase());
  };

  const handleCategoryChange = (category: string) => {
    if (categoryHasPosts(category)) {
      setSelectedCategory(category);
    }
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Explora nuestro contenido</h2>
        
        <Tabs value={selectedCategory} onValueChange={handleCategoryChange}>
          <TabsList className="mb-6 flex flex-wrap">
            {blogCategories.map((category) => {
              const hasContent = categoryHasPosts(category.toLowerCase());
              return (
                <TabsTrigger 
                  key={category} 
                  value={category.toLowerCase()}
                  disabled={!hasContent}
                  className={!hasContent ? "opacity-50 cursor-not-allowed" : ""}
                >
                  {category}
                </TabsTrigger>
              );
            })}
          </TabsList>
          
          {blogCategories.map((category) => (
            <TabsContent key={category} value={category.toLowerCase()} className="mt-2">
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="h-8 w-8 animate-spin text-familyxp-primary" />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getPostsByCategory(category.toLowerCase()).map((post) => (
                    <BlogCard 
                      key={post.id}
                      id={post.id}
                      title={post.title}
                      excerpt={post.excerpt}
                      category={post.category}
                      date={post.created_at}
                      author={post.author_name}
                      authorTitle={post.author_title}
                      image={post.image_url}
                      readTime={post.read_time}
                    />
                  ))}
                </div>
              )}
              
              {category.toLowerCase() === "todos" && (
                <div className="text-center mt-8">
                  <Button className="bg-familyxp-primary">Cargar más artículos</Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default BlogCategories;
