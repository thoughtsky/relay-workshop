import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { FeedbackItem } from "@/types/feedback";
import { formatShortDate, statusVariant } from "@/components/feedback/feedback-format";

interface FeedbackListItemProps {
  item: FeedbackItem;
  selected: boolean;
  onSelect: (id: string) => void;
}

export function FeedbackListItem({ item, selected, onSelect }: FeedbackListItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      aria-current={selected}
      className={cn(
        "w-full cursor-pointer border-l-2 border-b border-b-border border-l-transparent px-4 py-3 text-left transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ring",
        selected && "border-l-primary bg-accent/60",
      )}
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="truncate text-[13px] font-medium text-foreground">
          {item.customerName}
        </span>
        <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
          {formatShortDate(item.date)}
        </span>
      </div>
      <p className="truncate text-[12px] text-muted-foreground">{item.company}</p>
      <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-relaxed text-foreground/85">
        {item.summary}
      </p>
      <div className="mt-2 flex items-center gap-1.5">
        <Badge variant={statusVariant(item.status)} className="px-1.5 py-0 text-[10.5px]">
          {item.status}
        </Badge>
        <Badge variant="muted" className="px-1.5 py-0 text-[10.5px]">
          {item.source}
        </Badge>
        <Badge variant="muted" className="px-1.5 py-0 text-[10.5px]">
          {item.topic}
        </Badge>
      </div>
    </button>
  );
}
