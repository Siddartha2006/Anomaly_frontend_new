# Rebuild Architecture Overview

## High-level structure

- `frontend/`: Vite + React + Tailwind SPA with route-based pages and reusable UI components.
- `backend/`: Express API split into route/controller/service/model/middleware layers.
- `shared/`: Utility functions consumed by frontend or backend.
- `docs/`: Architecture and maintenance notes.

## Why this structure

1. Clear boundaries between UI and API concerns.
2. Modular backend to support future domain growth.
3. Shared utilities reduce duplicated logic.
4. Components/hooks/services improve frontend maintainability.

## Quality improvements delivered

- Introduced loading and error states on async views.
- Added responsive design system via Tailwind.
- Added semantic metadata in `frontend/index.html` to improve SEO.
- Removed obsolete CRA files and legacy page-specific CSS sprawl.
