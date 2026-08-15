/* eslint-disable react-refresh/only-export-components */
import { cva } from "class-variance-authority";

export const buttonVariance = cva(
  "inline-flex items-center justify-center font-medium text-base rounded-full transition-all focus:outline-none leading-none",
  {
    variants: {
      variant: {
        primary:
          "shadow-xl shadow-signal/20 text-white bg-signal hover:bg-signal/80",
        secondary: "bg-white text-ink border border-section",
        danger: "bg-danger text-white hover:bg-danger/80",
        "ghost-danger": "text-danger bg-paper border border-danger-soft",
      },
      size: {
        sm: "px-4 py-2.5",
        md: "px-6 py-4",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
    },
  },
);

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) {
  return (
    <button className={buttonVariance({ variant, size, className })} {...props}>
      {children}
    </button>
  );
}
