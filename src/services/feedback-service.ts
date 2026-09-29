import { seedFeedback } from "@/data/feedback";
import type { FeedbackItem, FeedbackStatus } from "@/types/feedback";

/**
 * Local, in-memory service boundary for feedback.
 * Supports loading items, updating an item's status and deleting items.
 * There is no persistence: a browser refresh restores the seeded data.
 */
let items: FeedbackItem[] = [...seedFeedback];

export const feedbackService = {
  listFeedback(): FeedbackItem[] {
    return [...items];
  },

  getFeedback(id: string): FeedbackItem | undefined {
    return items.find((item) => item.id === id);
  },

  updateFeedbackStatus(id: string, status: FeedbackStatus): FeedbackItem[] {
    items = items.map((item) => (item.id === id ? { ...item, status } : item));
    return [...items];
  },

  deleteFeedback(id: string): FeedbackItem[] {
    items = items.filter((item) => item.id !== id);
    return [...items];
  },
};
