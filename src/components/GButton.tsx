// components/Button.tsx
import React from "react";
import type { JSX } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  as?: keyof JSX.IntrinsicElements;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

/**
 * Tailwind-based Button with theme variants.
 * - Uses `fill`/solid styles for primary/secondary/danger
 * - Outline and ghost are transparent/outlined
 * - Sizes control padding and font-size
 */
const variantClasses: Record<Variant, string> = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500",
  secondary:
    "bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50 focus-visible:ring-indigo-300",
  outline:
    "bg-transparent text-indigo-700 border border-indigo-300 hover:bg-indigo-50 focus-visible:ring-indigo-300",
  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-sm px-3 py-1.5",
  md: "text-sm px-4 py-2",
  lg: "text-base px-5 py-3",
};

const baseClasses =
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const GButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      children,
      leftIcon,
      rightIcon,
      disabled,
      ...rest
    },
    ref
  ) => {
    const classes = clsx(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    return (
      <button ref={ref} className={classes} disabled={disabled} {...rest}>
        {leftIcon && (
          <span className="mr-2 inline-flex items-center">{leftIcon}</span>
        )}
        <span>{children}</span>
        {rightIcon && (
          <span className="ml-2 inline-flex items-center">{rightIcon}</span>
        )}
      </button>
    );
  }
);

GButton.displayName = "Button";

export default GButton;
