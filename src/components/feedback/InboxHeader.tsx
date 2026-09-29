interface InboxHeaderProps {
  total: number;
  newCount: number;
  plannedCount: number;
}

export function InboxHeader({ total, newCount, plannedCount }: InboxHeaderProps) {
  const stats = [
    { label: "Total", value: total },
    { label: "New", value: newCount },
    { label: "Planned", value: plannedCount },
  ];

  return (
    <header className="flex items-start justify-between gap-6 border-b border-border bg-surface px-5 py-4">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-foreground">Feedback inbox</h1>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Review and organise feedback from across your customer channels.
        </p>
      </div>
      <dl className="flex shrink-0 items-center gap-5 pt-1">
        {stats.map((stat) => (
          <div key={stat.label} className="text-right">
            <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">
              {stat.label}
            </dt>
            <dd className="text-[15px] font-medium tabular-nums text-foreground">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
