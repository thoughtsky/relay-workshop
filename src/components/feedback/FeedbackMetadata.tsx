import { Badge } from "@/components/ui/badge";
import type { FeedbackItem } from "@/types/feedback";
import { formatLongDate, statusVariant } from "@/components/feedback/feedback-format";

interface FeedbackMetadataProps {
  item: FeedbackItem;
  showStatus?: boolean;
}

export function FeedbackMetadata({ item, showStatus = true }: FeedbackMetadataProps) {
  const rows: { label: string; value: React.ReactNode }[] = [
    ...(showStatus
      ? [
          {
            label: "Status",
            value: (
              <Badge variant={statusVariant(item.status)} className="px-1.5 py-0 text-[11px]">
                {item.status}
              </Badge>
            ),
          },
        ]
      : []),
    {
      label: "Source",
      value: (
        <Badge variant="muted" className="px-1.5 py-0 text-[11px]">
          {item.source}
        </Badge>
      ),
    },
    {
      label: "Topic",
      value: (
        <Badge variant="muted" className="px-1.5 py-0 text-[11px]">
          {item.topic}
        </Badge>
      ),
    },
    { label: "Received", value: formatLongDate(item.date) },
    { label: "Reference", value: item.id },
  ];

  return (
    <dl className="grid grid-cols-[110px_1fr] gap-y-2 border-t border-border pt-4 text-[12.5px]">
      {rows.map((row) => (
        <div key={row.label} className="contents">
          <dt className="text-muted-foreground">{row.label}</dt>
          <dd className="text-foreground">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
