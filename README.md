
# Multi-Tenant Task Manager — Frontend

This repository contains the React + TypeScript frontend for the Multi-Tenant Task Manager application.

Summary
-------
The frontend provides the user interface for tenant-aware task management, authentication, and tenant-specific theming. It was bootstrapped with Create React App (TypeScript template).

Project layout (important files)
--------------------------------
- `src/` — application source code
  - `api/` — backend API helpers
  - `auth/` — authentication helpers and JWT handling
  - `components/` — shared UI components (e.g., `NavBar`)
  - `context/` — React contexts (AuthContext, TenantThemeContext)
  - `pages/` — page components (Login, Signup, Tasks, Admin, Unauthorized)
  - `routes/` — route guards (ProtectedRoute)
  - `themes/` — tenant theme definitions
  - `utils/` — tenant utilities

Prerequisites
-------------
- Node.js (LTS recommended, 16+)
- npm (or yarn)

Quick start
-----------
1. Install dependencies

	npm install

2. Start the development server

	npm start

	By default the app serves at http://localhost:3000

3. Build for production

	npm run build

4. Run tests

	npm test

Backend integration
-------------------
This frontend expects a backend API (the companion `MultiTenantTaskManagerBackend` project) to be running. The API base URL is configured in `src/api/api.ts` — update it if your backend runs on a non-standard host or port. Ensure CORS is configured on the backend to allow requests from the frontend origin (e.g., `http://localhost:3000`).

Tenant Themes
-------------
Each tenant gets their own unique theme and admin interface. Here are some examples:

### Tenant 1: Dark Professional Theme
![Dark Professional Theme](./images/Screenshot%20(177).png)
*Professional dark theme with modern UI elements*

### Tenant 2: Light Minimal Theme
![Light Minimal Theme](./images/Screenshot%20(178).png)
*Clean, minimal light theme focused on simplicity*

### Tenant 3: Modern Glass Theme
![Modern Glass Theme](./images/Screenshot%20(179).png)
*Modern glass-morphism design with subtle transparency*

Notes & tips
------------
- Tenant-specific themes are in `src/themes/` and applied via `TenantThemeContext`.
- Authentication is managed with JWTs; check `src/auth` and `src/context/AuthContext.tsx` for flow details.
- If you change API endpoints, update `src/api/api.ts`.

Contributing / local dev
------------------------
If you want to run both frontend and backend locally, start the backend (commonly on port 8080) and then run `npm start` from this folder. Use the app's signup/login flows to create tenants and users for testing.

License
-------
See the repository root for license details (if provided).
