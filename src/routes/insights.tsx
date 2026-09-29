import { createFileRoute } from "@tanstack/react-router";
import { LineChart } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights · Relay" },
      {
        name: "description",
        content: "Themes and trends across customer feedback collected in Relay.",
      },
      { property: "og:title", content: "Insights · Relay" },
      {
        property: "og:description",
        content: "Themes and trends across customer feedback collected in Relay.",
      },
    ],
  }),
  component: Insights,
});

function Insights() {
  return (
    <div className="flex h-screen min-w-0 flex-1 flex-col bg-background">
      <header className="border-b border-border bg-surface px-5 py-4">
        <h1 className="text-[22px] font-semibold tracking-tight text-foreground">Insights</h1>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Themes and trends across your customer feedback.
        </p>
      </header>
      <div className="flex-1">
        <EmptyState
          icon={<LineChart />}
          title="Insights are not available yet"
          description="Once enough feedback is tagged, recurring themes will be summarised here."
        />
      </div>
    </div>
  );
}
