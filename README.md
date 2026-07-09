# HelpingHands — Service Day Dashboard

Angular front-end web application for a corporate **Service Day Dashboard**, built for the BIT210 Group Assignment case study. Employees can browse and register for NGO-run Service Day activities; Administrators can create and manage activities, monitor participation, broadcast notifications, and generate reports — all client-side, backed by mock JSON data.

> **Scope note:** per the assignment brief this is a **client-side only** project — a real backend is explicitly not required. `backend/mock-data/` is kept only as the canonical copy of the mock JSON referenced in the case study's folder structure. The Angular app itself reads identical data from `frontend/src/assets/data/` through `HttpClient`.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Running the App](#running-the-app)
7. [Demo Accounts](#demo-accounts)
8. [Available Scripts](#available-scripts)
9. [How the Mock Async Backend Works](#how-the-mock-async-backend-works)
10. [Resetting Demo Data](#resetting-demo-data)
11. [Building for Production](#building-for-production)
12. [Architecture Notes (MVC Mapping)](#architecture-notes-mvc-mapping)
13. [Troubleshooting](#troubleshooting)
14. [License](#license)

---

## Features

**Employee**
- Browse Service Day activities with search and filtering
- View activity details and register in real time (no page reload)
- View "My Registrations" and cancel a registration
- QR code check-in on the day of the activity
- Profile page

**Administrator**
- Dashboard with participation summary stats
- Full activity CRUD (create, edit, delete, manage)
- View participants per activity
- Broadcast notifications to all employees or a single employee
- Generate participation reports with CSV export
- Generate real, scannable QR codes for check-in

**Cross-cutting**
- Role-based authentication and route guarding (Employee vs Admin)
- Live slot-availability and registration cut-off logic
- Fully asynchronous data layer (HttpClient + RxJS), no page reloads on any mutation
- Responsive, semantic HTML5/CSS with Flexbox layout

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 17 (CLI workspace, NgModule-based) |
| Language | TypeScript 5.4 |
| Reactive data | RxJS 7 (`BehaviorSubject`, `Observable`, `switchMap`, `combineLatest`) |
| HTTP | Angular `HttpClient` against static mock JSON |
| Styling | Hand-written CSS3 (custom properties / design tokens, Flexbox, media queries) |
| QR codes | [`qrcode`](https://www.npmjs.com/package/qrcode) npm package |
| Persistence | `localStorage` (simulates a backend across page refreshes) |
| Tooling | Angular CLI, npm |

---

## Project Structure

```
HelpingHands/
├── README.md                          ← you are here
├── backend/
│   ├── README.md                      Notes on the mock-data reference folder
│   └── mock-data/                     Canonical copy of the JSON "database"
│       ├── activities.json
│       ├── employees.json
│       ├── ngos.json
│       ├── notifications.json
│       └── registrations.json
└── frontend/                          The actual Angular application
    ├── README.md
    ├── angular.json                   Angular CLI workspace config
    ├── package.json / package-lock.json
    ├── tsconfig.json / tsconfig.app.json
    └── src/
        ├── index.html
        ├── main.ts                    Bootstraps AppModule
        ├── styles.css                 Global styles + design tokens
        ├── assets/data/                Mock JSON consumed via HttpClient
        │   ├── activities.json
        │   ├── employees.json
        │   ├── ngos.json
        │   ├── notifications.json
        │   └── registrations.json
        └── app/
            ├── app.module.ts           Root module
            ├── app-routing.module.ts   Root routes + lazy-loaded feature modules
            ├── app.component.*         Root shell component
            │
            ├── core/
            │   └── guards/
            │       └── auth.guard.ts   Role-based route protection
            │
            ├── models/                 TypeScript interfaces — MVC "Model" layer
            │   ├── activity.model.ts
            │   ├── employee.model.ts
            │   ├── ngo.model.ts
            │   ├── notification.model.ts
            │   ├── registration.model.ts
            │   └── report.model.ts
            │
            ├── services/                Business logic + async data layer — MVC "Controller" layer
            │   ├── activity.service.ts       CRUD, slot/cutoff status logic
            │   ├── auth.service.ts           Login, session, role checks
            │   ├── notification.service.ts   Broadcast + per-user notifications
            │   ├── registration.service.ts   Register / cancel / check-in
            │   └── report.service.ts         Dashboard + participation reports
            │
            ├── shared/                  Reusable presentational components
            │   ├── shared.module.ts
            │   ├── navbar/
            │   ├── sidebar/
            │   ├── footer/
            │   ├── activity-card/
            │   ├── stats-card/
            │   ├── spinner/
            │   └── confirmation-dialog/
            │
            └── pages/                   Feature/route views — MVC "View" layer
                ├── home/                 Public landing page
                ├── auth/
                │   └── login/
                ├── employee/             Lazy-loaded EmployeeModule
                │   ├── employee.module.ts
                │   ├── employee-routing.module.ts
                │   ├── employee-layout.component.*
                │   ├── dashboard/
                │   ├── activity-list/
                │   ├── activity-details/
                │   ├── my-registrations/
                │   ├── profile/
                │   └── qr-checkin/
                └── admin/                Lazy-loaded AdminModule
                    ├── admin.module.ts
                    ├── admin-routing.module.ts
                    ├── admin-layout.component.*
                    ├── dashboard/
                    ├── manage-activities/
                    ├── add-activity/
                    ├── edit-activity/
                    ├── participants/
                    ├── notifications/
                    ├── reports/
                    └── qr-generator/
```

---

## Prerequisites

Make sure the following are installed before you start:

| Tool | Minimum version | Check with |
|---|---|---|
| [Node.js](https://nodejs.org/) | 18 LTS (20/22 recommended) | `node -v` |
| npm | 9+ (bundled with Node) | `npm -v` |
| Angular CLI | 17.x | `ng version` |

Install the Angular CLI globally if you don't already have it:

```bash
npm install -g @angular/cli
```

---

## Installation

1. Clone or unzip the project, then move into the frontend workspace (this is the only folder with installable dependencies):

   ```bash
   cd HelpingHands/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   This installs Angular 17, RxJS, the `qrcode` package, and all dev tooling listed in `package.json`.

---

## Running the App

Start the local development server:

```bash
npm start
```

This runs `ng serve` under the hood. Once compiled, open your browser at:

```
http://localhost:4200
```

The app live-reloads automatically whenever you edit a source file.

---

## Demo Accounts

Use these credentials on the login screen (or click the **Employee** / **Admin** quick-fill buttons):

| Role | Email | Password |
|---|---|---|
| Employee | `aarav.sharma@company.com` | `password123` |
| Admin | `sita.adhikari@company.com` | `admin123` |

---

## Available Scripts

Run these from inside `frontend/`:

| Command | Description |
|---|---|
| `npm start` | Runs `ng serve` — starts the dev server on port 4200 |
| `npm run build` | Production build, output to `dist/helpinghands-frontend` |
| `npm run watch` | Development build in watch mode |
| `npm test` | Runs unit tests via `ng test` |

---

## How the Mock Async Backend Works

There is no real backend server. Instead:

1. On first use, each domain service (`ActivityService`, `AuthService`, `RegistrationService`, `NotificationService`) fetches its JSON file once from `src/assets/data/` using Angular's `HttpClient.get()`, with a simulated network delay (`delay(...)` from RxJS).
2. The data is cached in an in-memory `BehaviorSubject` and mirrored to `localStorage`, acting as a "database" for the session.
3. All mutating operations — create, update, delete, register, cancel, check-in, slot adjustment — are implemented as `Observable`-returning service methods that update the cached state and persist it, then push the new value to every subscribed component.
4. Because components subscribe reactively (via the `async` pipe or `.subscribe()`), the UI updates instantly wherever that data appears — **without any page reload**.
5. `ActivityService.computeStatus()` recalculates an activity's status (`open` / `full` / `closed`) live from its remaining slot count and its per-activity registration cut-off window (`registrationCutoffHours` before the start time).

This satisfies the assignment's requirement for asynchronous, non-blocking data handling using Angular services and `HttpClient`.

---

## Resetting Demo Data

Because state is persisted to `localStorage`, changes you make (registrations, new activities, notifications, etc.) survive page refreshes. To reset everything back to the original mock JSON:

- Open DevTools → **Application** tab → **Local Storage** → your site origin, and delete all keys prefixed `hh_` (e.g. `hh_activities`, `hh_registrations`, `hh_session_user`, `hh_notifications`), **or**
- Call `ActivityService.resetMockData()` from the browser console / a temporary button during development.

---

## Building for Production

```bash
cd frontend
npm run build
```

The optimized, production-ready output is written to:

```
frontend/dist/helpinghands-frontend/
```

Deploy the contents of that folder to any static file host (e.g. Netlify, GitHub Pages, an S3 bucket, or an Nginx server).

---

## Architecture Notes (MVC Mapping)

| MVC Role | Angular Concept | Location |
|---|---|---|
| **Model** | TypeScript interfaces describing data shape | `src/app/models/` |
| **Controller** | Injectable services holding state + business logic | `src/app/services/` |
| **View** | Components bound to templates, presentation only | `src/app/pages/`, `src/app/shared/` |

Modularity:
- `SharedModule` — cross-cutting, reusable presentational components (navbar, sidebar, footer, cards, spinner, confirmation dialog), imported wherever needed.
- `EmployeeModule` / `AdminModule` — lazy-loaded feature modules, each with its own routing module, so the admin bundle isn't downloaded by employees and vice versa.
- `AuthGuard` — guards both feature module routes based on the logged-in user's role.

---

## Troubleshooting

| Problem | Likely cause / fix |
|---|---|
| `ng: command not found` | Angular CLI isn't installed globally — run `npm install -g @angular/cli` |
| Blank page / stale data after pulling new mock JSON | Old data is cached in `localStorage` — clear the `hh_*` keys (see [Resetting Demo Data](#resetting-demo-data)) |
| `npm install` fails on Node version errors | Switch to Node 18 LTS or newer (use `nvm install 18` if you use nvm) |
| Port 4200 already in use | Run `ng serve --port 4300` (or any free port) |
| Login fails with correct-looking credentials | Credentials are case-sensitive on the password field; double-check `src/assets/data/employees.json` if you've edited it |

---


## License

This project was developed for academic purposes as part of the BIT210 Group Assignment. Not licensed for external distribution.
