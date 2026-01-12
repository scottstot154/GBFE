import Link from "next/link";
import React from "react";
import { footerConfig } from "@/config/footer";
import { SiInstagram, SiPinterest } from "react-icons/si";

const Footer: React.FC = () => {
  const { brand, shopLinks, supportLinks, socialLinks, legalLinks } =
    footerConfig;

  return (
    <footer className="bg-card border-t border-[color:var(--border)] mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* BRAND */}
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {brand.name}
            </h3>
            <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
              {brand.description}
            </p>
          </div>

          {/* SHOP */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide">
              Shop
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground/70 hover:text-foreground transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide">
              Support
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground/70 hover:text-foreground transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide">
              Follow Us
            </h4>
            <div className="mt-3 flex gap-4">
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-foreground/70 hover:text-primary transition"
                >
                  <SiInstagram className="w-5 h-5" />
                </a>
              )}

              {socialLinks.pinterest && (
                <a
                  href={socialLinks.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pinterest"
                  className="text-foreground/70 hover:text-primary transition"
                >
                  <SiPinterest className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-10 pt-6 border-t border-[color:var(--border)] text-sm text-foreground/60 flex flex-col sm:flex-row justify-between gap-4">
          <span>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </span>

          <div className="flex gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-foreground transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
