
import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  loading: boolean;
  makeAdmin: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      
      // Check if user is admin
      if (session?.user) {
        const { data } = await supabase
          .from('profiles')
          .select('email, is_admin')
          .eq('id', session.user.id)
          .single();
          
        if (data && data.is_admin) {
          setIsAdmin(true);
        }
      }
      
      setLoading(false);
    };

    setData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // Check admin status on auth state change
      if (session?.user) {
        const { data } = await supabase
          .from('profiles')
          .select('email, is_admin')
          .eq('id', session.user.id)
          .single();
          
        if (data && data.is_admin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // Function to make a user admin
  const makeAdmin = async (email: string) => {
    try {
      // First get the user's ID from the profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();

      if (profileError) {
        throw new Error('Usuario no encontrado');
      }

      // Update the profile to mark as admin
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ is_admin: true })
        .eq('id', profile.id);

      if (updateError) {
        throw new Error('Error al actualizar permisos');
      }

      toast.success(`${email} ahora tiene permisos de administrador`);
      
      // If the current user is being made admin, update local state
      if (user?.email === email) {
        setIsAdmin(true);
      }
    } catch (error: any) {
      toast.error(error.message || 'Error al asignar permisos de administrador');
    }
  };

  const value = {
    session,
    user,
    signOut,
    isAdmin,
    loading,
    makeAdmin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
