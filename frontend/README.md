# HelpingHands — Service Day Dashboard (Frontend)

Angular front-end application built for the BIT210 Group Assignment case study.
Employees can browse and register for NGO Service Day activities; Administrators
can manage activities, monitor participation, broadcast notifications and
generate reports — all client-side, backed by mock JSON data.

## 1. Prerequisites

- Node.js 18 LTS or newer (Node 20/22 recommended)
- npm 9+
- Angular CLI: `npm install -g @angular/cli`

## 2. Installation

```bash
cd frontend
npm install
```

## 3. Run the development server

```bash
npm start
```

Then open **http://localhost:4200** in your browser. The app reloads
automatically when you edit source files.

## 4. Demo accounts

| Role     | Email                        | Password    |
|----------|-------------------------------|-------------|
| Employee | aarav.sharma@company.com      | password123 |
| Admin    | sita.adhikari@company.com     | admin123    |

(Click "Employee" / "Admin" on the login screen to auto-fill these.)

## 5. Project structure

```
src/
 ├─ assets/data/         Mock JSON "backend" (activities, employees, ngos, registrations, notifications)
 ├─ app/
 │   ├─ models/          TypeScript interfaces (Model layer of MVC)
 │   ├─ services/        Angular services — HttpClient + RxJS async data layer (Controller layer)
 │   ├─ core/guards/     Route guards (role-based access control)
 │   ├─ shared/          Reusable UI components (navbar, sidebar, cards, spinner, dialog)
 │   └─ pages/           Views (home, auth, employee/*, admin/*)          (View layer)
```

## 6. How mock async data works

There is no real backend. `ActivityService`, `RegistrationService`,
`NotificationService`, and `AuthService` load JSON once via `HttpClient.get()`
from `src/assets/data/`, then keep an in-memory + `localStorage`-backed
"database" for the session. All create/update/delete/register/cancel/check-in
operations return RxJS `Observable`s with a simulated network delay, so the UI
updates **without a page reload** — satisfying the assignment's asynchronous
data handling requirement. Slot availability and the registration cut-off
window are recalculated live in `ActivityService.computeStatus()`.

To reset all demo data back to the original JSON, clear your browser's
localStorage for this site (or open DevTools → Application → Local Storage →
delete the `hh_*` keys).

## 7. Building for production

```bash
npm run build
```

Output is written to `dist/helpinghands-frontend`.
