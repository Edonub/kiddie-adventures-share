
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlaceholderPage from "@/components/PlaceholderPage";

const SaludPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PlaceholderPage 
          title="Salud Familiar" 
          description="Recursos y contenido sobre salud para toda la familia"
        />
      </main>
      <Footer />
    </div>
  );
};

export default SaludPage;
