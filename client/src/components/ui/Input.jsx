import { cn } from "@/utils/utils";

export function Input({ type = "text", className, ...props }) {
  return (
    <input
      type={type}
      className={cn(
        "px-4 py-2 rounded-xl bg-section text-muted border border-muted/30 focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}
