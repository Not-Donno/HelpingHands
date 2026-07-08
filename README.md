# HelpingHands — Service Day Dashboard

BIT210 Group Assignment — Angular front-end web application for a Service Day
Dashboard, built against the shared case study. Employees browse and register
for NGO-run Service Day activities; Administrators manage activities, monitor
participation, broadcast notifications, and generate reports.

**Scope note:** per the assignment brief, this is a **client-side only**
project — a real backend is explicitly not required. `backend/mock-data/` is
kept only as the canonical copy of the mock JSON referenced in the case
study's folder structure; the Angular app actually reads its data from
`frontend/src/assets/data/` (identical files) through `HttpClient`, and the
Angular services simulate create/update/delete calls with RxJS delays so nothing
requires a page reload.

## Quick start

```bash
cd frontend
npm install
npm start
```

Open http://localhost:4200. See `frontend/README.md` for demo login accounts,
full folder-by-folder explanation, and the MVC design mapping (Models /
Services-as-Controllers / Pages-as-Views) needed for your project report.

## What's implemented

- **Auth** — mock login against `employees.json`, role-based routing guard (`AuthGuard`), session persisted in `localStorage`.
- **Employee side** — dashboard, activity list with search/filter, activity details + register, my registrations + cancel, profile, QR check-in.
- **Admin side** — dashboard, manage activities (CRUD), participants list per activity, notification broadcast, participation reports with CSV export, QR code generator (real scannable QR via the `qrcode` package).
- **Async data & business rules** — `ActivityService.computeStatus()` recalculates `open` / `full` / `closed` from slot counts and the per-activity registration cutoff window; all mutations return `Observable`s with simulated latency and update the UI reactively.
- **Modular Angular structure** — lazy-loaded `EmployeeModule` and `AdminModule`, shared `SharedModule` for reusable UI, one service per domain, strict TypeScript, verified with `ng build`.


