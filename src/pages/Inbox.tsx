import { useMemo, useState } from "react";
import { InboxHeader } from "@/components/feedback/InboxHeader";
import { FeedbackFilters, type FilterState } from "@/components/feedback/FeedbackFilters";
import { FeedbackList } from "@/components/feedback/FeedbackList";
import { FeedbackDetail } from "@/components/feedback/FeedbackDetail";
import { feedbackService } from "@/services/feedback-service";
import type { FeedbackItem, FeedbackStatus } from "@/types/feedback";

const emptyFilters: FilterState = { query: "", source: "all", status: "all", topic: "all" };

function matches(item: FeedbackItem, filters: FilterState) {
  const query = filters.query.trim().toLowerCase();
  const matchesQuery =
    query === "" ||
    [item.customerName, item.company, item.summary, item.message]
      .join(" ")
      .toLowerCase()
      .includes(query);

  return (
    matchesQuery &&
    (filters.source === "all" || item.source === filters.source) &&
    (filters.status === "all" || item.status === filters.status) &&
    (filters.topic === "all" || item.topic === filters.topic)
  );
}

export default function Inbox() {
  const [items, setItems] = useState<FeedbackItem[]>(() => feedbackService.listFeedback());
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [selectedId, setSelectedId] = useState<string | null>(items[0]?.id ?? null);

  const visibleItems = useMemo(
    () => items.filter((item) => matches(item, filters)),
    [items, filters],
  );

  const selectedItem =
    visibleItems.find((item) => item.id === selectedId) ?? visibleItems[0] ?? null;

  const isFiltered =
    filters.query !== "" ||
    filters.source !== "all" ||
    filters.status !== "all" ||
    filters.topic !== "all";

  function handleDelete(id: string) {
    const remaining = feedbackService.deleteFeedback(id);
    const nextVisible = remaining.filter((item) => matches(item, filters));
    setItems(remaining);
    setSelectedId(nextVisible[0]?.id ?? null);
  }

  function handleStatusChange(id: string, status: FeedbackStatus) {
    const updated = feedbackService.updateFeedbackStatus(id, status);
    const nextVisible = updated.filter((item) => matches(item, filters));
    setItems(updated);
    setSelectedId(
      nextVisible.some((item) => item.id === id) ? id : (nextVisible[0]?.id ?? null),
    );
  }

  return (
    <div className="flex h-screen min-w-0 flex-1 flex-col bg-background">
      <InboxHeader
        total={items.length}
        newCount={items.filter((item) => item.status === "new").length}
        plannedCount={items.filter((item) => item.status === "planned").length}
      />
      <div className="flex min-h-0 flex-1">
        <section className="flex w-[400px] shrink-0 flex-col border-r border-border bg-surface">
          <FeedbackFilters
            filters={filters}
            onChange={setFilters}
            resultCount={visibleItems.length}
          />
          <FeedbackList
            items={visibleItems}
            selectedId={selectedItem?.id ?? null}
            onSelect={setSelectedId}
            onClearFilters={() => setFilters(emptyFilters)}
            filtered={isFiltered}
          />
        </section>
        <section className="min-w-0 flex-1 bg-surface">
          <FeedbackDetail
            item={selectedItem}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        </section>
      </div>
    </div>
  );
}
