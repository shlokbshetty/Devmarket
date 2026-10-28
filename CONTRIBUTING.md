# Contributing to DevMarket

Thank you for your interest in contributing to **DevMarket**! Whether you are fixing a bug, adding a marketplace feature, improving Capacitor Android native integrations, or refining documentation, this guide outlines our engineering standards and workflow.

---

## 1. Code of Conduct

Participation in the DevMarket project is governed by our [Code of Conduct](.github/CODE_OF_CONDUCT.md) (Contributor Covenant v2.1). Please review and uphold these standards in all issues, pull requests, and discussions.

---

## 2. Getting Started

1. **Fork & Clone** the repository:
   ```bash
   git clone https://github.com/<your-username>/Devmarket.git
   cd Devmarket
   ```
2. **Bootstrap the Workspace**:
   ```bash
   npm run setup
   ```
3. **Verify Baseline Tests**:
   ```bash
   npm run test:all
   ```
   Ensure all backend Jest tests (`npm test`) and frontend Vitest tests (`npm run test:client`) pass before starting your changes.

For deep-dive instructions on configuring Firebase credentials, SQLite/MySQL databases, and Capacitor Android builds, consult [`DEVELOPMENT.md`](DEVELOPMENT.md).

---

## 3. Branching Conventions

Always create a feature or bugfix branch off `main`. Branch names must use one of the following prefixes followed by a concise `kebab-case` slug:

| Prefix | Purpose | Example Branch Name |
| :--- | :--- | :--- |
| `feat/` | New marketplace features, UI screens, or API endpoints | `feat/apk-sha256-checksum-badge` |
| `fix/` | Bug fixes across backend controllers, SQL queries, or React views | `fix/mobile-redirect-token-retry` |
| `chore/` | Dependency upgrades, build scripts, or Capacitor config maintenance | `chore/upgrade-capacitor-android-8` |
| `docs/` | Documentation updates (`README.md`, `docs/API.md`, `docs/ARCHITECTURE.md`) | `docs/update-upload-curl-examples` |
| `test/` | Adding or expanding Jest / Vitest / `fast-check` property test suites | `test/admin-reject-idempotency` |
| `refactor/` | Internal code restructuring with zero external behavior change | `refactor/normalize-db-row-helpers` |

---

## 4. Commit Message Guidelines (Conventional Commits)

DevMarket strictly follows the [Conventional Commits v1.0.0](https://www.conventionalcommits.org/) specification:

```text
<type>(<optional-scope>): <concise imperative summary>

[optional body explaining the "why" and architectural trade-offs]

[optional footer(s): Closes #123, BREAKING CHANGE: ...]
```

### Allowed Commit Types & Scopes
- **Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`
- **Common Scopes**:
  - `server`: Express bootstrap, CORS, static `/downloads`
  - `auth`: `authController.js`, `authMiddleware.js`, `AuthContext.jsx`
  - `apps`: `appController.js`, Multer APK upload, catalog/search
  - `admin`: `adminController.js`, `AdminPanel.jsx`, moderation & promotion
  - `reviews`: `reviewController.js`, `Review.js` model
  - `db`: `server/config/db.js`, `initDb.js`, SQLite/MySQL queries
  - `client`: React pages, components, Tailwind CSS v4 styling
  - `android`: Capacitor Android project, `nativeBridge.js`, `capacitor.config.json`

### Examples
```text
feat(apps): add version filter to GET /api/apps/search
fix(android): ensure Capacitor production config is restored before build
test(auth): add fast-check property test for expired JWT rejection
docs(api): document multipart form fields for POST /api/apps/upload
```

---

## 5. Code Style & Architectural Standards

### 5.1 Backend (`server/`)
- **Module System**: CommonJS (`require` / `module.exports`).
- **Database Compatibility**: Every SQL query in `server/controllers/` and `server/config/initDb.js` **must** use `?` positional parameter placeholders via `query(sql, params)` from `server/config/db.js` and handle both `better-sqlite3` and `mysql2` return shapes using `selectRows()`, `insertId()`, or `affectedRows()`.
- **Response Contract**: Always return `{ success: true, ... }` for `2xx` responses and `{ success: false, message: '...' }` for `4xx`/`5xx` responses.
- **Security**: Never interpolate user input directly into SQL strings. Enforce `verifyToken` and appropriate role guards (`requireDeveloper`, `requireAdmin`) at the route declaration level in `server/routes/`.

### 5.2 Frontend & Mobile (`client/`)
- **Module System**: ES Modules (`import` / `export`) with React 18 functional components and Hooks.
- **API Communication**: Route all backend HTTP requests through [`client/src/api/client.js`](client/src/api/client.js) (`apiGet`, `apiPost`, `apiPut`, `apiDelete`, `apiUpload`) so Bearer tokens are injected consistently.
- **Capacitor Safety**: Always guard native plugin invocations (`StatusBar`, `Haptics`, `App`, `GoogleSignIn`) using `Capacitor.isNativePlatform()` or the helpers in [`client/src/utils/nativeBridge.js`](client/src/utils/nativeBridge.js) so web browser builds never throw runtime errors.
- **Capacitor Config Hygiene**: Never commit development LAN IP overrides from `client/capacitor.config.dev.json` into `client/capacitor.config.json`. Run `git checkout client/capacitor.config.json` (or `npm run android:prod`) before staging commits.

---

## 6. Pre-Commit Test Verification

Before opening a Pull Request, run the full verification checklist locally:

```bash
# 1. Run all backend Jest unit, integration, and fast-check property suites
npm test

# 2. Run all frontend Vitest + React Testing Library suites
npm run test:client

# 3. Verify production frontend bundle compiles cleanly without warnings/errors
npm run build
```

If your change modifies API routes, controllers, or database schemas, add or update the corresponding test suite in `server/__tests__/` and update [`docs/API.md`](docs/API.md) and [`API.md`](API.md).

---

## 7. Pull Request Lifecycle

1. Push your branch to your fork and open a Pull Request against `main`.
2. Complete every section of the [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md).
3. Link any related issues using `Closes #<issue-number>`.
4. Ensure all automated tests (`npm run test:all`) and production build checks (`npm run build`) pass.
5. Address maintainer review feedback via additional commits on your branch (squash-merge is used upon approval).
