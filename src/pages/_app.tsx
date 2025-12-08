import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // session contains access_token, user, etc.
        // you can save session to localStorage or update app state
        // For example:
        if (session) {
          // console.log("signed in", session);
        } else {
          // console.log("signed out");
        }
      }
    );

    // cleanup
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return <Component {...pageProps} />;
}
