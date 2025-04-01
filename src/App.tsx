
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import BottomNavigation from "./components/navigation/BottomNavigation";
import Index from "./pages/Index";
import ForoPage from "./pages/ForoPage";
import BlogPage from "./pages/BlogPage";
import AuthPage from "./pages/AuthPage";
import AdminPage from "./pages/AdminPage";
import SuperAdminPage from "./pages/SuperAdminPage";
import CrearActividadPage from "./pages/CrearActividadPage";
import ActividadDetailPage from "./pages/ActividadDetailPage";
import TerminosPage from "./pages/TerminosPage";
import PrivacidadPage from "./pages/PrivacidadPage";
import ContactoPage from "./pages/ContactoPage";
import CentroAyudaPage from "./pages/CentroAyudaPage";
import GruposPage from "./pages/GruposPage";
import ForoCochesPage from "./pages/ForoCochesPage";
import ConfiguracionPage from "./pages/configuracion/ConfiguracionPage";
import NotFound from "./pages/NotFound";
import ExplorarPage from "./pages/ExplorarPage";
import PlanesPage from "./pages/PlanesPage";
import CategoriasPage from "./pages/CategoriasPage";
import BuscarPage from "./pages/BuscarPage";
import SaludPage from "./pages/SaludPage";
import EducacionPage from "./pages/EducacionPage";
import PodcastPage from "./pages/PodcastPage";
import AyudasPage from "./pages/AyudasPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/planes" replace />} />
              <Route path="/foro" element={<ForoPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/super-admin" element={<SuperAdminPage />} />
              <Route path="/crear-actividad" element={<CrearActividadPage />} />
              <Route path="/editar-actividad/:id" element={<CrearActividadPage />} />
              <Route path="/actividad/:id" element={<ActividadDetailPage />} />
              <Route path="/configuracion" element={<ConfiguracionPage />} />
              <Route path="/configuracion/cuenta" element={<ConfiguracionPage />} />
              <Route path="/configuracion/posts" element={<ConfiguracionPage />} />
              <Route path="/terminos" element={<TerminosPage />} />
              <Route path="/privacidad" element={<PrivacidadPage />} />
              <Route path="/contacto" element={<ContactoPage />} />
              <Route path="/centro-ayuda" element={<CentroAyudaPage />} />
              <Route path="/grupos" element={<GruposPage />} />
              <Route path="/forocoches" element={<ForoCochesPage />} />
              <Route path="/explorar" element={<ExplorarPage />} />
              <Route path="/planes" element={<PlanesPage />} />
              <Route path="/categorias" element={<CategoriasPage />} />
              <Route path="/buscar" element={<BuscarPage />} />
              <Route path="/salud" element={<SaludPage />} />
              <Route path="/educacion" element={<EducacionPage />} />
              <Route path="/podcast" element={<PodcastPage />} />
              <Route path="/ayudas" element={<AyudasPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BottomNavigation />
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
