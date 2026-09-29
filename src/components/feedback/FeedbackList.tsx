import { FeedbackListItem } from "@/components/feedback/FeedbackListItem";
import { InboxEmptyState } from "@/components/feedback/InboxEmptyState";
import type { FeedbackItem } from "@/types/feedback";

interface FeedbackListProps {
  items: FeedbackItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onClearFilters: () => void;
  filtered: boolean;
}

export function FeedbackList({
  items,
  selectedId,
  onSelect,
  onClearFilters,
  filtered,
}: FeedbackListProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      {items.length === 0 ? (
        <InboxEmptyState filtered={filtered} onClearFilters={onClearFilters} />
      ) : (
        items.map((item) => (
          <FeedbackListItem
            key={item.id}
            item={item}
            selected={item.id === selectedId}
            onSelect={onSelect}
          />
        ))
      )}
    </div>
  );
}
