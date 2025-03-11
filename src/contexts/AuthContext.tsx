
import { createContext, useContext, useEffect, useState } from "react";
import { Session, User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Export the User type so it can be imported by other components
export type User = SupabaseUser;

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
    console.log("AuthProvider mounted");
    
    const setData = async () => {
      try {
        console.log("Checking initial session");
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Initial session:", session?.user?.email || "No session");
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check if user is admin
        if (session?.user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('email, is_admin')
            .eq('id', session.user.id)
            .single();
            
          if (error) {
            console.error("Error fetching profile:", error);
          } else if (data && data.is_admin) {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        console.error("Error in auth context setup:", error);
      } finally {
        setLoading(false);
      }
    };

    setData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      
      try {
        // Check admin status on auth state change
        if (session?.user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('email, is_admin')
            .eq('id', session.user.id)
            .single();
            
          if (error) {
            console.error("Error fetching profile on auth change:", error);
            setIsAdmin(false);
          } else if (data && data.is_admin) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      console.log("Unsubscribing from auth state changes");
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      console.log("Attempting to sign out");
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error in signOut:", error);
        throw error;
      }
      
      // Explicitly clear the local state
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      
      console.log("Sign out successful");
      toast.success("Has cerrado sesión correctamente");
    } catch (error: any) {
      console.error("Error signing out:", error);
      toast.error("Error al cerrar sesión");
    }
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

  console.log("AuthProvider rendering with user:", user?.email || "No user");
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
