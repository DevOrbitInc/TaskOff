/* eslint-disable react-refresh/only-export-components */
import { cva } from "class-variance-authority";

export const labelVariance = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0 text-sm font-semibold",
  {
    variants: {
      variant: {
        todo: "bg-muted/5 text-muted",
        "in-progress": "text-amber-600 bg-amber-soft",
        "in-review": "bg-signal/5 text-signal",
        done: "text-green-600 bg-green-soft",
      },
    },
    defaultVariants: {
      variant: "todo",
    },
  },
);

export const dotVariance = cva("rounded-full size-1.5 shrink-0", {
  variants: {
    variant: {
      todo: "bg-muted",
      "in-progress": "bg-amber-600",
      "in-review": "bg-signal",
      done: "bg-green-600",
    },
  },
  defaultVariants: {
    variant: "todo",
  },
});

export default function Label({
  children,
  variant = "todo",
  className,
  ...props
}) {
  return (
    <span className={labelVariance({ variant, className })} {...props}>
      <span className={dotVariance({ variant })} aria-hidden="true" />
      {children}
    </span>
  );
}
