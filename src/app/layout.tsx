import "@/styles/globals.css";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Boutique",
  description: "Handcrafted collections inspired by Indian craftsmanship",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-sans">
      <body
        className="
          min-h-screen 
          flex 
          flex-col 
          bg-background 
          text-foreground 
          antialiased
        "
      >
        <Providers>
          {/* NAVBAR */}
          <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
            <NavBar />
          </header>

          {/* PAGE CONTENT */}
          <main className="flex-1 w-full">{children}</main>

          {/* FOOTER */}
          <Footer />

          {/* GLOBAL TOASTS */}
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: "hsl(var(--card))",
                color: "hsl(var(--foreground))",
                borderRadius: "12px",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
