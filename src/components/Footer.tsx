import Link from "next/link";
import React from "react";
import { footerConfig } from "@/config/footer";
import { SiInstagram, SiPinterest } from "react-icons/si";

const Footer: React.FC = () => {
  const { brand, shopLinks, supportLinks, socialLinks, legalLinks } =
    footerConfig;

  return (
    <footer className="mt-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* TOP GRID */}
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4">
          {/* BRAND */}
          <div className="space-y-3">
            <h3 className="text-base font-medium tracking-tight">
              {brand.name}
            </h3>
            <p className="text-sm leading-relaxed text-foreground/65">
              {brand.description}
            </p>
          </div>

          {/* SHOP */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-foreground/80">
              Shop
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {shopLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-foreground/60 hover:text-foreground transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-foreground/80">
              Support
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {supportLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-foreground/60 hover:text-foreground transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-foreground/80">
              Follow
            </h4>
            <div className="mt-4 flex items-center gap-4">
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-foreground/60 hover:text-primary transition"
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
                  className="text-foreground/60 hover:text-primary transition"
                >
                  <SiPinterest className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 flex flex-col gap-4 border-t border-border/60 pt-6 text-sm text-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </span>

          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.id}
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
