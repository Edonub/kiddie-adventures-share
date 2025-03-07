
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import ExplorarPage from "./pages/ExplorarPage";
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
import ComoFuncionaPage from "./pages/ComoFuncionaPage";
import GruposPage from "./pages/GruposPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Ensure App is declared as a function component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/explorar" element={<ExplorarPage />} />
              <Route path="/foro" element={<ForoPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/super-admin" element={<SuperAdminPage />} />
              <Route path="/crear-actividad" element={<CrearActividadPage />} />
              <Route path="/actividad/:id" element={<ActividadDetailPage />} />
              
              {/* Nuevas rutas para el footer */}
              <Route path="/terminos" element={<TerminosPage />} />
              <Route path="/privacidad" element={<PrivacidadPage />} />
              <Route path="/contacto" element={<ContactoPage />} />
              <Route path="/centro-ayuda" element={<CentroAyudaPage />} />
              <Route path="/como-funciona" element={<ComoFuncionaPage />} />
              <Route path="/grupos" element={<GruposPage />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
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
