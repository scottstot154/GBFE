import "@/styles/globals.css";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Boutique",
  description: "Handcrafted collections",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <Providers>
          {/* Global UI */}
          <NavBar />

          {/* Page content */}
          <main className="flex-1">{children}</main>

          <Footer />

          {/* Toasts */}
          <Toaster position="bottom-center" />
        </Providers>
      </body>
    </html>
  );
}
