"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavBar: React.FC = () => {
  const pathname = usePathname();

  const linkBase = "px-3 py-2 rounded-md text-sm font-medium transition-colors";

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-card border-b border-[color:var(--border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-semibold text-primary tracking-wide"
          >
            Boutique
          </Link>

          {/* Nav Items */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className={`
                ${linkBase} 
                ${
                  isActive("/")
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground"
                }
              `}
            >
              Home
            </Link>

            <Link
              href="/login"
              className={`
                ${linkBase}
                ${
                  isActive("/login")
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground"
                }
              `}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
