// components/GButton.tsx
import React, { ElementType, forwardRef } from "react";
import clsx from "clsx";

/**
 * Polymorphic GButton
 * - as?: render element (defaults to "button")
 * - loading?: show spinner and force disabled
 * - variant, size follow your existing API
 */

/* Variants & sizes */
type Variant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg";

export type BaseButtonProps = {
  variant?: Variant;
  size?: Size;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  className?: string;
};

/* Polymorphic prop helpers */
type AsProp<E extends ElementType> = { as?: E };
type PropsToOmit<E extends ElementType, P> = P &
  Omit<React.ComponentPropsWithoutRef<E>, keyof P>;

export type GButtonProps<E extends ElementType = "button"> = PropsToOmit<
  E,
  BaseButtonProps & AsProp<E>
>;

/* Tailwind classes for variants & sizes (kept your theme tokens) */
const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground rounded-full px-6 py-2.5 text-sm font-medium hover:bg-primary/90 transition",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-[color:var(--secondary)]/95 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--ring)]",
  outline:
    "bg-transparent text-primary border border-[color:var(--border)] hover:bg-[color:var(--primary)]/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--ring)]",
  ghost:
    "bg-transparent text-foreground hover:bg-[color:var(--muted)]/20 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--ring)]",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/95 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--ring)]",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

const baseClasses =
  "inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed select-none";

/* Small accessible spinner */
const Spinner = ({ className = "" }: { className?: string }) => (
  <svg
    className={clsx("animate-spin", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
    width="16"
    height="16"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

/**
 * Polymorphic ForwardRef component
 */
const GButtonInner = <E extends ElementType = "button">(
  {
    as,
    variant = "primary",
    size = "md",
    leftIcon,
    rightIcon,
    loading = false,
    className,
    children,
    ...rest
  }: GButtonProps<E>,
  ref: React.Ref<E>
) => {
  const Component = (as || "button") as ElementType;
  const isButton = Component === "button";

  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  // If loading, force disabled semantics
  const ariaDisabled =
    (rest as React.ButtonHTMLAttributes<HTMLButtonElement>).disabled || loading;

  // If rendering a non-button element, avoid passing `disabled` prop (use aria-disabled instead)
  let props: React.ComponentPropsWithoutRef<ElementType>;

  if (isButton) {
    // For button, include disabled and type
    props = {
      ref,
      className: classes,
      disabled: ariaDisabled,
      type:
        (rest as React.ButtonHTMLAttributes<HTMLButtonElement>).type ??
        "button",
      "aria-busy": loading ? true : undefined,
      ...rest,
    };
  } else {
    // For other elements, use aria-disabled
    props = {
      ref,
      className: classes,
      "aria-disabled": ariaDisabled ? true : undefined,
      "aria-busy": loading ? true : undefined,
      ...rest,
    };
  }

  return (
    <Component {...(props as React.ComponentPropsWithoutRef<E>)}>
      {loading ? (
        // center spinner + visually hidden text for screen readers
        <span className="inline-flex items-center gap-2">
          <Spinner className="text-current" />
          <span
            aria-hidden={!children}
            className={children ? "sr-only" : undefined}
          >
            {children}
          </span>
        </span>
      ) : (
        <>
          {leftIcon && (
            <span className="mr-2 inline-flex items-center">{leftIcon}</span>
          )}
          <span>{children}</span>
          {rightIcon && (
            <span className="ml-2 inline-flex items-center">{rightIcon}</span>
          )}
        </>
      )}
    </Component>
  );
};

const GButton = forwardRef(GButtonInner) as <E extends ElementType = "button">(
  props: GButtonProps<E> & { ref?: React.Ref<unknown> }
) => React.ReactElement | null;

export default GButton;
