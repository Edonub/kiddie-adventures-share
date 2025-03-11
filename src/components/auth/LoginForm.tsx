
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  loginError: string;
  setLoginError: (error: string) => void;
}

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  setLoading,
  loginError,
  setLoginError
}: LoginFormProps) => {
  
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");

    try {
      console.log("Attempting sign in with:", email);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast.success("Inicio de sesión exitoso!");
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error.message);
      
      if (error.message.includes("Email not confirmed")) {
        setLoginError("Tu email no ha sido verificado. Por favor, revisa tu bandeja de entrada y confirma tu email.");
        
        // Reenviar email de verificación
        const { error: resendError } = await supabase.auth.resend({
          type: 'signup',
          email,
        });
        
        if (!resendError) {
          toast.info("Hemos reenviado el email de verificación a tu correo.");
        }
      } else {
        setLoginError(error.message || "Error al iniciar sesión");
        toast.error(error.message || "Error al iniciar sesión");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast.error("Por favor, introduce tu email para restablecer la contraseña");
      return;
    }
    
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`,
      });
      
      if (error) throw error;
      toast.success("Se ha enviado un email para restablecer tu contraseña");
    } catch (error: any) {
      toast.error(error.message || "Error al enviar el email de recuperación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <Input 
          id="login-email" 
          type="email" 
          placeholder="correo@ejemplo.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="login-password">Contraseña</Label>
        <Input 
          id="login-password" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
      </Button>
      <div className="text-center">
        <button 
          type="button" 
          onClick={handleResetPassword} 
          className="text-sm text-blue-500 hover:underline"
          disabled={loading}
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
