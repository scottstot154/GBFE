import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-[color:var(--border)] mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold text-foreground">Boutique</h3>
            <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
              Handcrafted, ethically sourced dresses designed for comfort,
              elegance, and everyday beauty.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Shop
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-foreground/70 hover:text-foreground transition"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-foreground/70 hover:text-foreground transition"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-foreground/70 hover:text-foreground transition"
                >
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Support
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-foreground/70 hover:text-foreground transition"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-foreground/70 hover:text-foreground transition"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-foreground/70 hover:text-foreground transition"
                >
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Follow Us
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="text-foreground/70">Instagram</li>
              <li className="text-foreground/70">Facebook</li>
              <li className="text-foreground/70">Pinterest</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[color:var(--border)] text-sm text-foreground/60 flex flex-col sm:flex-row justify-between gap-4">
          <span>
            © {new Date().getFullYear()} Boutique. All rights reserved.
          </span>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-foreground transition">
              Privacy
            </Link>
            <Link href="/" className="hover:text-foreground transition">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
