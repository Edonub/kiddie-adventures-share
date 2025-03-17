
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlaceholderPage from "@/components/PlaceholderPage";

const PodcastPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PlaceholderPage 
          title="Podcast Familiar" 
          description="Episodios de nuestro podcast para familias"
        />
      </main>
      <Footer />
    </div>
  );
};

export default PodcastPage;
