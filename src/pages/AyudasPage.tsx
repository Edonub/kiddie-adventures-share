
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlaceholderPage from "@/components/PlaceholderPage";

const AyudasPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PlaceholderPage 
          title="Ayudas Familiares" 
          description="Información sobre ayudas y subvenciones para familias"
        />
      </main>
      <Footer />
    </div>
  );
};

export default AyudasPage;
