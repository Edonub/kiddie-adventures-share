
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlaceholderPage from "@/components/PlaceholderPage";

const EducacionPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PlaceholderPage 
          title="Educación" 
          description="Recursos educativos para niños y familias"
        />
      </main>
      <Footer />
    </div>
  );
};

export default EducacionPage;
