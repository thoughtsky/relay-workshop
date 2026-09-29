import { Link } from "@tanstack/react-router";
import { ChevronsUpDown, Check, Inbox, LineChart, Settings, LogOut, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Inbox", icon: Inbox },
  { to: "/insights", label: "Insights", icon: LineChart },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

const workspaces = ["Relay Product", "Relay Research", "Acme Pilot"];

export function AppSidebar() {
  return (
    <aside className="flex w-[220px] shrink-0 flex-col border-r border-border bg-surface-muted">
      <div className="p-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full cursor-pointer items-center gap-2 rounded-md border border-border bg-surface px-2 py-1.5 text-left transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-primary text-[11px] font-semibold text-primary-foreground">
              R
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-medium text-foreground">Relay</span>
              <span className="block truncate text-[11px] text-muted-foreground">
                Relay Product
              </span>
            </span>
            <ChevronsUpDown className="size-3.5 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[204px]">
            <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
              Workspaces
            </DropdownMenuLabel>
            {workspaces.map((workspace, index) => (
              <DropdownMenuItem key={workspace} className="text-[13px]">
                <span className="flex-1">{workspace}</span>
                {index === 0 ? <Check className="size-3.5 text-primary" /> : null}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 px-2">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: item.to === "/" }}
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
            )}
            activeProps={{ className: "bg-accent text-accent-foreground font-medium" }}
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold text-secondary-foreground">
              JL
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] text-foreground">Jordan Lee</span>
              <span className="block truncate text-[11px] text-muted-foreground">
                Product manager
              </span>
            </span>
            <ChevronsUpDown className="size-3.5 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="top" className="w-[204px]">
            <DropdownMenuItem className="text-[13px]">
              <UserRound className="size-3.5" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-[13px]">
              <Settings className="size-3.5" /> Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-[13px]">
              <LogOut className="size-3.5" /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
