import { toast } from "sonner";

// Safe error message extractor to prevent React rendering object crashes
export const getErrorMessage = (err: any): string => {
  const raw = err?.data?.message ?? err?.message;

  if (Array.isArray(raw)) {
    return raw
      .map((item) => (typeof item === "object" ? item.message : item))
      .filter(Boolean)
      .join(", ");
  }

  if (typeof raw === "object" && raw !== null) {
    return raw.message || JSON.stringify(raw);
  }

  toast.error(raw)
  return raw || "Something went wrong";
};