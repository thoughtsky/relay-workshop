import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { FEEDBACK_SOURCES, FEEDBACK_STATUSES, FEEDBACK_TOPICS } from "@/types/feedback";

export interface FilterState {
  query: string;
  source: string;
  status: string;
  topic: string;
}

interface FeedbackFiltersProps {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  resultCount: number;
}

const labelise = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export function FeedbackFilters({ filters, onChange, resultCount }: FeedbackFiltersProps) {
  const hasFilters =
    filters.query !== "" ||
    filters.source !== "all" ||
    filters.status !== "all" ||
    filters.topic !== "all";

  return (
    <div className="flex flex-col gap-2 border-b border-border bg-surface px-4 py-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={filters.query}
          onChange={(event) => onChange({ ...filters, query: event.target.value })}
          placeholder="Search customer, company or feedback"
          className="h-8 pl-8 text-[13px]"
          aria-label="Search feedback"
        />
      </div>

      <div className="flex items-center gap-2">
        {(
          [
            { key: "source", options: FEEDBACK_SOURCES, label: "Source", all: "All sources" },
            { key: "status", options: FEEDBACK_STATUSES, label: "Status", all: "All statuses" },
            { key: "topic", options: FEEDBACK_TOPICS, label: "Topic", all: "All topics" },
          ] as const
        ).map((filter) => (
          <Select
            key={filter.key}
            value={filters[filter.key]}
            onValueChange={(value) => onChange({ ...filters, [filter.key]: value })}
          >
            <SelectTrigger className="h-8 flex-1 text-[12px]" aria-label={filter.label}>
              <SelectValue placeholder={filter.all} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-[13px]">
                {filter.all}
              </SelectItem>

              {filter.options.map((option) => (
                <SelectItem key={option} value={option} className="text-[13px]">
                  {labelise(option)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}

        {hasFilters ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 shrink-0"
                aria-label="Clear filters"
                onClick={() => onChange({ query: "", source: "all", status: "all", topic: "all" })}
              >
                <X />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Clear filters</TooltipContent>
          </Tooltip>
        ) : null}
      </div>

      <p className="text-[11px] text-muted-foreground">
        {resultCount} {resultCount === 1 ? "item" : "items"}
      </p>
    </div>
  );
}
