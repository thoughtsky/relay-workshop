# Design system

> Before creating a new component, search `src/components/ui` for an existing one and
> reuse it. Adding a second button, badge or overlay is not acceptable.

## Direction

Calm, compact and credible. Warm off-white application background, white primary
surfaces, slate text, a single cobalt blue accent, subtle borders and minimal shadow.
No gradients, glass effects, oversized cards or decorative illustration.

## Tokens

All tokens live in `src/styles.css`, defined as CSS variables on `:root` and exposed to
Tailwind through `@theme inline`. Never write one-off colour values in a component.

| Token | Usage |
| --- | --- |
| `--background` | Warm off-white app background |
| `--surface` / `--surface-muted` | White panels and quiet fills |
| `--foreground` / `--muted-foreground` | Primary and secondary text |
| `--primary` | Cobalt accent: selection, focus ring, brand mark |
| `--accent` | Tinted hover and selected backgrounds |
| `--border` / `--input` | Neutral hairlines |
| `--status-*` | Status badge fills and text |
| `--radius` | Base radius (0.5rem); `rounded-sm`–`rounded-lg` derive from it |
| `--font-app-sans` | Inter, the single typeface |

Type: page headings are 22px semibold; body text sits at 12–13.5px. Bold text is used
sparingly. Controls are 8 units (32px) tall.

## Shared components (`src/components/ui`)

`Button` (including `size="icon"`), `Badge` (status and `muted` variants), `Input`,
`Select`, `Tabs`, `DropdownMenu`, `Tooltip`, `AlertDialog`, `EmptyState`.

`AlertDialog` is available for confirmation flows; reach for it before building a
custom modal.

## Application components

Feature components live in `src/components/feedback` and `src/components/layout` and
compose the shared primitives. They should not redefine colours, radii or spacing
scales of their own.
