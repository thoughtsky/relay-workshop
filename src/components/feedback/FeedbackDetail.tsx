import { MessagesSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FeedbackMetadata } from "@/components/feedback/FeedbackMetadata";
import { FEEDBACK_STATUSES, type FeedbackItem, type FeedbackStatus } from "@/types/feedback";

interface FeedbackDetailProps {
  item: FeedbackItem | null;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: FeedbackStatus) => void;
}

const labelise = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export function FeedbackDetail({ item, onDelete, onStatusChange }: FeedbackDetailProps) {
  if (!item) {
    return (
      <EmptyState
        icon={<MessagesSquare />}
        title="No feedback selected"
        description="Select an item from the list to read the full message and its details."
      />
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-4">
        <div className="min-w-0">
          <h2 className="truncate text-[17px] font-semibold tracking-tight text-foreground">
            {item.summary}
          </h2>
          <p className="mt-1 text-[12.5px] text-muted-foreground">
            {item.customerName} · {item.customerRole} · {item.company}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Select
            value={item.status}
            onValueChange={(value) => onStatusChange(item.id, value as FeedbackStatus)}
          >
            <SelectTrigger className="h-8 w-[120px] text-[12px]" aria-label="Feedback status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FEEDBACK_STATUSES.map((status) => (
                <SelectItem key={status} value={status} className="text-[13px]">
                  {labelise(status)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                aria-label="Delete feedback"
                onClick={() => onDelete(item.id)}
              >
                <Trash2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete feedback</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
        <section className="max-w-2xl">
          <h3 className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Customer feedback
          </h3>
          <p className="mt-3 whitespace-pre-line text-[13.5px] leading-7 text-foreground/90">
            {item.message}
          </p>
        </section>

        <section className="mt-8 max-w-md">
          <h3 className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Details
          </h3>
          <div className="mt-3">
            <FeedbackMetadata item={item} showStatus={false} />
          </div>
        </section>
      </div>
    </div>
  );
}
