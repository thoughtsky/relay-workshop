import { SearchX, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

interface InboxEmptyStateProps {
  filtered: boolean;
  onClearFilters: () => void;
}

export function InboxEmptyState({ filtered, onClearFilters }: InboxEmptyStateProps) {
  if (!filtered) {
    return (
      <EmptyState
        icon={<Inbox />}
        title="No feedback yet"
        description="Feedback from support, interviews, sales and surveys will appear here."
      />
    );
  }

  return (
    <EmptyState
      icon={<SearchX />}
      title="No matching feedback"
      description="Nothing matches this combination of search and filters. Try widening the filters."
      action={
        <Button variant="outline" size="sm" onClick={onClearFilters}>
          Clear filters
        </Button>
      }
    />
  );
}
