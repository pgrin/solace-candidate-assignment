# Advocate Table UI

## Components

### AdvocateTable

- Displays advocates in a table-style layout using `div`s.
- Includes headers and supports sorting.

### Search

- Search bar with a reset button.
- Uses a 0.5s debounce before calling the API.

### Pagination

- Allows users to navigate between pages.

---

## Decisions Made

- Mostly user client components, as API calls are required instead of server actions.
- Query string is used to track search, sort, and page — useful for bookmarking and sharing.
- Pagination limits the data loaded on the client and reduces backend load.

---

## If I Had More Time

- Build a generic table component.
- Build a generic sortable header component.
- Editable table page sizing (currently hard coded to 4 items per page)

---

## Extra

- Added sorting as a helpful feature for users.
