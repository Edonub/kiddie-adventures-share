import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/foro" element={<ForoPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/super-admin" element={<SuperAdminPage />} />
              <Route path="/crear-actividad" element={<CrearActividadPage />} />
              <Route path="/editar-actividad/:id" element={<CrearActividadPage />} />
              <Route path="/actividad/:id" element={<ActividadDetailPage />} />
              <Route path="/configuracion" element={<ConfiguracionPage />} />
              <Route path="/terminos" element={<TerminosPage />} />
              <Route path="/privacidad" element={<PrivacidadPage />} />
              <Route path="/contacto" element={<ContactoPage />} />
              <Route path="/centro-ayuda" element={<CentroAyudaPage />} />
              <Route path="/grupos" element={<GruposPage />} />
              <Route path="/forocoches" element={<ForoCochesPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
          <Sonner />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
