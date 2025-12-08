// src/hooks/useUser.ts
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function init() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!mounted) return;
      setUser(session?.user ?? null);
      setLoading(false);
    }

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading, isLoggedIn: !!user };
}
