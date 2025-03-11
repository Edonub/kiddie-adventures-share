
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface RegisterFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  name: string;
  setName: (name: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setLoginError: (error: string) => void;
  setVerificationSent: (sent: boolean) => void;
}

const RegisterForm = ({
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  loading,
  setLoading,
  setLoginError,
  setVerificationSent
}: RegisterFormProps) => {
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");

    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: name,
          },
          emailRedirectTo: `${window.location.origin}/auth`,
        },
      });

      if (error) throw error;
      
      setVerificationSent(true);
      toast.success("Se ha enviado un email de verificación a tu correo. Por favor, confírmalo para continuar.");
    } catch (error: any) {
      console.error("Error al registrarse:", error.message);
      setLoginError(error.message || "Error al registrarse");
      toast.error(error.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="register-name">Nombre</Label>
        <Input 
          id="register-name"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="register-email">Email</Label>
        <Input 
          id="register-email" 
          type="email" 
          placeholder="correo@ejemplo.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="register-password">Contraseña</Label>
        <Input 
          id="register-password" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Registrando..." : "Registrarse"}
      </Button>
    </form>
  );
};

export default RegisterForm;
