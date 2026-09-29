# Relay — product context

Relay is a customer-feedback workspace used by product managers and designers to keep
track of what customers are telling their teams.

## Who uses it

- **Product managers** deciding what to build next and justifying those decisions.
- **Designers and researchers** looking for recurring themes across conversations.

Feedback arrives from several channels — support conversations, customer interviews,
sales calls and surveys — and would otherwise sit in separate tools.

## The feedback inbox

The inbox is the working surface of the product. It lets a team:

- see everything that has come in, in one scrollable list;
- narrow the list by search, source, status and topic;
- read the full message with the customer, role, company and date alongside it;
- change an item's status as it moves through triage;
- remove items that are not useful.

Statuses (`new`, `reviewed`, `planned`, `archived`) describe how far an item has moved
through triage and can be changed from the detail panel. Status changes are handled by
the local in-memory service and reset when the browser is refreshed. Source and topic
are read-only metadata. Topics group items into product areas so themes can be spotted.

Data is seeded locally and held in memory; a browser refresh restores the seeded
state.
