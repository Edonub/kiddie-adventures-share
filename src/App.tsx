
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
import CrearActividadPage from "./pages/CrearActividadPage";
import ActividadDetailPage from "./pages/ActividadDetailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explorar" element={<ExplorarPage />} />
            <Route path="/foro" element={<ForoPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/crear-actividad" element={<CrearActividadPage />} />
            <Route path="/actividad/:id" element={<ActividadDetailPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
