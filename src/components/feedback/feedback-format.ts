import type { FeedbackStatus } from "@/types/feedback";

export function formatShortDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function formatLongDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function statusVariant(
  status: FeedbackStatus,
): "new" | "reviewed" | "planned" | "archived" {
  return status;
}
