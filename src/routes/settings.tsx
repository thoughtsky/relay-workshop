import { createFileRoute } from "@tanstack/react-router";
import { Settings2 } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings · Relay" },
      { name: "description", content: "Workspace, member and channel settings for Relay." },
      { property: "og:title", content: "Settings · Relay" },
      {
        property: "og:description",
        content: "Workspace, member and channel settings for Relay.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="flex h-screen min-w-0 flex-1 flex-col bg-background">
      <header className="border-b border-border bg-surface px-5 py-4">
        <h1 className="text-[22px] font-semibold tracking-tight text-foreground">Settings</h1>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Manage your workspace, members and connected channels.
        </p>
      </header>
      <div className="flex-1">
        <EmptyState
          icon={<Settings2 />}
          title="Settings are not available yet"
          description="Workspace configuration will move here in a later release."
        />
      </div>
    </div>
  );
}
