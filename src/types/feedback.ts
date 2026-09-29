export type FeedbackSource = "support" | "interview" | "sales" | "survey";

export type FeedbackStatus = "new" | "reviewed" | "planned" | "archived";

export type FeedbackTopic =
  | "onboarding"
  | "performance"
  | "integrations"
  | "reporting"
  | "billing"
  | "mobile";

export interface FeedbackItem {
  id: string;
  customerName: string;
  customerRole: string;
  company: string;
  source: FeedbackSource;
  topic: FeedbackTopic;
  status: FeedbackStatus;
  date: string;
  summary: string;
  message: string;
}

export const FEEDBACK_SOURCES: FeedbackSource[] = [
  "support",
  "interview",
  "sales",
  "survey",
];

export const FEEDBACK_STATUSES: FeedbackStatus[] = [
  "new",
  "reviewed",
  "planned",
  "archived",
];

export const FEEDBACK_TOPICS: FeedbackTopic[] = [
  "onboarding",
  "performance",
  "integrations",
  "reporting",
  "billing",
  "mobile",
];
