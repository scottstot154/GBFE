import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />

      {/* Page content */}
      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
