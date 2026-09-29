# Architecture

This workshop repository represents **the frontend codebase only**. It runs entirely in
the browser after installing dependencies: there is no backend, database,
authentication or external API.

## Layout

```
src/
  components/
    ui/        shared primitives (shadcn/ui on Radix)
    feedback/  inbox feature components
    layout/    application chrome (sidebar)
  data/        seeded feedback data
  services/    frontend service boundary
  types/       domain types
  pages/       screen composition
  routes/      route definitions
```

## Service boundary

`src/services/feedback-service.ts` is a fixed boundary. Components never import seeded
data directly; they call the service. It currently exposes:

- `listFeedback()`
- `getFeedback(id)`
- `updateFeedbackStatus(id, status)`
- `deleteFeedback(id)`

The implementation is local and in memory. Deleting an item or changing its status
affects the running session only — a browser refresh restores the seeded data. There is
no local-storage or other browser-storage persistence. Source and topic are read-only.

## Scope

Backend contracts, persistence and database changes are **outside the scope of frontend
contributions**. Work in this repository changes the interface and the local service
implementation; it does not define or assume server behaviour.
