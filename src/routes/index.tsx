import { createFileRoute } from "@tanstack/react-router";
import Inbox from "@/pages/Inbox";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Feedback inbox · Relay" },
      {
        name: "description",
        content: "Review and organise customer feedback from support, interviews, sales and surveys.",
      },
      { property: "og:title", content: "Feedback inbox · Relay" },
      {
        property: "og:description",
        content: "Review and organise customer feedback from support, interviews, sales and surveys.",
      },
    ],
  }),
  component: Inbox,
});
