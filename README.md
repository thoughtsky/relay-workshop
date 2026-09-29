# Relay

Relay is a customer-feedback workspace for product managers and designers. It
collects feedback from support conversations, customer interviews, sales calls and
surveys into a single inbox where a team can search, filter by source, status and
topic, read the full message, update an item's triage status and remove items.

Data is seeded locally and held in memory; status changes and deletions are lost on
refresh. There is no backend, database, authentication or external API.

## Stack

- React 19 + TypeScript
- TanStack Start (file-based routing, Vite 7)
- Tailwind CSS v4 with shadcn/ui components on Radix
- Lucide icons

## Getting started

Requires Node.js and npm.

```sh
npm ci        # install dependencies (reproducible, from package-lock.json)
npm run dev   # run the app locally
npm run build # production build
```
