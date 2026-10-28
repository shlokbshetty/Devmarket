## Summary of Changes

<!-- Provide a concise description of what this Pull Request accomplishes and why it is needed. -->

## Related Issues

<!-- Link related issues using keywords, e.g., Closes #42, Fixes #19 -->
- Closes #

## Type of Change

Please check all boxes that apply to this Pull Request:

- [ ] `feat`: New marketplace feature, API route, or Capacitor Android capability
- [ ] `fix`: Bug fix across backend controllers, database adapter, or React UI
- [ ] `refactor`: Internal code improvement with no external behavior change
- [ ] `test`: Addition or expansion of Jest / Vitest / `fast-check` test suites
- [ ] `docs`: Documentation update (`README.md`, `docs/API.md`, `docs/ARCHITECTURE.md`, etc.)
- [ ] `chore` / `build`: Build script, dependency, or Capacitor configuration maintenance
- [ ] `BREAKING CHANGE`: Introduces a backward-incompatible API or schema change

## Target Component(s)

- [ ] **Client UI (`client/src/`)**: React 18 pages, components, `AuthContext`, or Tailwind CSS v4
- [ ] **Capacitor Android (`client/android/`, `nativeBridge.js`)**: Native Android build, haptics, status bar, or Google Sign-In
- [ ] **Express API & Middleware (`server/routes/`, `server/controllers/`, `server/middleware/`)**: REST endpoints, JWT auth, RBAC, or Multer APK upload
- [ ] **Database & Persistence (`server/config/db.js`, `initDb.js`, `server/models/`)**: SQLite (`better-sqlite3`), MySQL (`mysql2`), or Mongoose schemas
- [ ] **Documentation & Tooling (`docs/`, `setup.js`, `.github/`)**: Architecture diagrams, API docs, or repository templates

## Test Coverage & Verification

Please confirm how you verified these changes locally:

- [ ] **Backend Jest Suite (`npm test`)**: All 8 suites in `server/__tests__/` pass (`smoke`, `auth.middleware`, `user.upsert`, `role.promote`, `upload.validation`, `app.approval`, `download`, `client.api`)
- [ ] **Frontend Vitest Suite (`npm run test:client`)**: All JSDOM and property tests in `client/src/test/` pass
- [ ] **Production Web Build (`npm run build`)**: `vite build` completes with zero errors
- [ ] **Manual Verification**: Tested in browser (`http://localhost:5173`) and/or Capacitor Android APK

### Test Output / Screenshots (Optional)

<!-- Paste terminal test output or UI screenshots (Desktop Simulator / Android Device) here. -->

## Self-Review Checklist

- [ ] My commits follow the [Conventional Commits](https://www.conventionalcommits.org/) format (`type(scope): summary`).
- [ ] All SQL queries use parameterized `?` placeholders via `server/config/db.js` and normalize results across both `better-sqlite3` and `mysql2`.
- [ ] No secrets, `.env` files, `firebase-service-account.json`, `*.sqlite` databases, or test `.apk` binaries are staged in this PR.
- [ ] `client/capacitor.config.json` is in its clean production state (no hardcoded local LAN IP overrides from `capacitor.config.dev.json`).
- [ ] Relevant documentation (`docs/API.md`, `docs/ARCHITECTURE.md`, `README.md`) has been updated to reflect any endpoint or config changes.
