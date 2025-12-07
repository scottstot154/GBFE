import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const NavBar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-semibold text-indigo-600">
              Boutique
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                router.pathname === "/" ? "text-indigo-700" : "text-gray-700"
              }`}
            >
              Home
            </Link>
            <Link
              href="/login"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                router.pathname === "/login"
                  ? "text-indigo-700"
                  : "text-gray-700"
              }`}
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
