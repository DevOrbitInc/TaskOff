import { cn } from "@/utils/utils";

export function TextArea({ className, rows = 3, ...props }) {
  return (
    <textarea
      rows={rows}
      className={cn(
        "px-4 py-2 rounded-xl bg-section text-muted border border-muted/30 focus:outline-none resize-y",
        className,
      )}
      {...props}
    />
  );
}
