import { cn } from "@/utils/utils";

export function FieldGroup({ children, className, ...props }) {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      {children}
    </div>
  );
}

export function Field({
  children,
  className,
  orientation = "vertical",
  ...props
}) {
  return (
    <div
      className={cn(
        "flex gap-2 w-full *:w-full",
        orientation === "horizontal"
          ? "flex-row items-center justify-between"
          : "flex-col",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function FieldLabel({ children, className, ...props }) {
  return (
    <label
      className={cn(
        "text-sm font-semibold leading-none text-ink select-none",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}

export function FieldDescription({ children, className, ...props }) {
  return (
    <p
      className={cn(
        "text-sm text-muted leading-normal inline-flex items-center gap-1 tracking-wide",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
