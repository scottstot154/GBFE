import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";
import GlobalBackNav from "@/components/navigation/GlobalBackNav";

export const metadata: Metadata = {
  metadataBase: new URL("https://gauriboutique.in"),
  title: {
    default: "Gauri Boutique",
    template: "%s | Gauri Boutique",
  },
  description: "Handcrafted collections inspired by Indian craftsmanship",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Gauri Boutique",
    title: "Gauri Boutique",
    description: "Handcrafted collections inspired by Indian craftsmanship",
  },
  twitter: {
    card: "summary",
    title: "Gauri Boutique",
    description: "Handcrafted collections inspired by Indian craftsmanship",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
          <main className="flex-1 w-full">
            <GlobalBackNav />
            {children}
          </main>

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
