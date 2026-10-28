# DevMarket — Hybrid Android & Web Developer App Marketplace

[![Build & Test](https://img.shields.io/badge/Build_%26_Tests-57_Passing-10B981?style=for-the-badge&logo=githubactions&logoColor=white)](DEVELOPMENT.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge)](LICENSE)
[![React 18.3](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Express 4.18](https://img.shields.io/badge/Express-4.18.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![SQLite / MySQL](https://img.shields.io/badge/SQLite-Better--SQLite3_13.x-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://sqlite.org/)
[![Firebase Auth](https://img.shields.io/badge/Firebase-Auth_%26_Admin_12.x-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Capacitor 8](https://img.shields.io/badge/Capacitor-Android_8.3-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)](https://capacitorjs.com/)

**DevMarket** is a full-stack mobile application marketplace and Android package distribution platform engineered with React 18, Vite 6, Tailwind CSS v4, Capacitor 8, and an Express.js backend backed by a dual-dialect SQLite/MySQL persistence layer. Designed for both browser-based desktop simulation and native Android execution, DevMarket enables developers to upload `.apk` binaries (up to 200 MB), administrators to moderate submissions and manage user roles (`user`, `developer`, `administrator`), and end users to discover, search, review, and stream Android packages directly onto their devices with native haptic feedback, dynamic status bar theming, and hardware back-button integration.

---

## System Architecture Overview

![System Architecture Overview](docs/assets/system-overview.svg)

DevMarket separates concerns across five cohesive architectural tiers:

1. **Client Presentation & Capacitor Hybrid Runtime (`client/`)**: A React 18 Single-Page Application bundled via Vite 6 and styled with Tailwind CSS v4. When compiled for Android via `@capacitor/android`, it bridges into native device APIs (`@capacitor/haptics`, `@capacitor/status-bar`, `@capacitor/app`, and `@capawesome/capacitor-google-sign-in`).
2. **API Gateway & Middleware Pipeline (`server/index.js`, `server/middleware/`)**: An Express 4 server handling LAN-aware CORS preflight (`204`), HMAC-SHA256 JWT session verification (`verifyToken`), role-based access guards (`requireDeveloper`, `requireAdmin`), and `multer` multipart binary validation.
3. **Business Logic & Controllers (`server/controllers/`)**: Dedicated domain handlers (`authController`, `appController`, `adminController`, `reviewController`) orchestrating token exchange, APK ingestion, catalog queries, and moderation workflows.
4. **Data & Persistence Layer (`server/config/db.js`, `server/models/`, `uploads/apk/`)**: A unified promise-based SQL adapter supporting zero-configuration `better-sqlite3` (`devmarket.sqlite`) alongside `mysql2/promise` connection pooling, paired with Mongoose schema definitions (`User`, `App`, `Review`) and local filesystem attachment streaming (`/downloads/:filename`).
5. **External Identity Services (`server/config/firebase.js`, `client/src/config/firebase.js`)**: Firebase Client Authentication (Google OAuth 2.0 popup/redirect flows plus offline `mock-key` development mode) verified server-side via Firebase Admin SDK (`admin.auth().verifyIdToken`).

For a comprehensive breakdown of component internals, database schemas, and end-to-end sequence flows, refer to the **[System Architecture Documentation](docs/ARCHITECTURE.md)** (also mirrored at [ARCHITECTURE.md](ARCHITECTURE.md)).

---

## Key Capabilities & Role Matrix

| Role | Identifier | Authentication Method | Permitted Operations |
| :--- | :--- | :--- | :--- |
| **User** | `user` | Google OAuth 2.0 (Firebase ID Token) or `mock-key` prompt (`user@devmarket.lan`) | Browse approved catalog, search & filter by category, view screenshots & ratings, submit reviews, download & install `.apk` packages |
| **Developer** | `developer` | Credential Login (`POST /api/auth/credentials`), Admin Promotion, or `developer@devmarket.lan` | All `user` capabilities + upload `.apk` binaries (`POST /api/apps/upload`) up to 200 MB with metadata (`name`, `description`, `category`, `version`) |
| **Administrator** | `administrator` | Credential Login (`POST /api/auth/credentials`), `DEMO_ADMIN_EMAIL` rule, or `admin@devmarket.lan` | All `developer` capabilities + inspect pending queue (`GET /api/admin/apps/pending`), approve/reject apps, view all users, promote users to `developer` |

---

## Prerequisites

Ensure the following tools are installed on your workstation before initializing the project:

- **Node.js**: `v18.x`, `v20.x`, `v22.x`, or `v24.x` (LTS recommended)
- **npm**: `v9.x` or newer
- **Git**: For version control and Capacitor config switching
- **Android Studio & JDK 17** *(Optional)*: Required only when compiling or debugging the native Android APK via Gradle (`AGP 8.9.1`, `compileSdk 36`, `minSdk 23`)
- **MySQL 8.0+** *(Optional)*: Only needed if running with `DB_TYPE=mysql`; set `DB_TYPE=sqlite` for zero-setup embedded persistence

---

## Step-by-Step Local Setup

### 1. Automated Bootstrap (`npm run setup`)

The repository includes an interactive setup utility ([`setup.js`](setup.js)) that generates a default `.env` file (configured for SQLite and development mock auth), provisions the `uploads/apk/` storage directory, and installs both root (server) and `client/` npm dependencies:

```bash
git clone <repository-url>
cd Devmarket
npm run setup
```

### 2. Manual Environment Configuration

If you prefer manual configuration or need to customize LAN IP addresses, Firebase credentials, or Admin/Developer login secrets, copy the example environment templates:

```bash
cp .env.example .env
cp client/.env.example client/.env
```

Update `.env` and `client/.env` according to the configuration mapping tables below.

### 3. Start the Full-Stack Development Environment

Run both the Express backend (with `nodemon` auto-reload) and the Vite React frontend concurrently:

```bash
npm run dev
```

- **Frontend Web UI**: `http://localhost:5173`
- **Backend API & Static APK Server**: `http://localhost:3000` (or the port specified in `PORT`)

On startup, `server/index.js` automatically runs `initDb()` and `seedDemoData()`, creating the `users` and `apps` tables, running non-destructive column migrations, creating a placeholder `uploads/apk/demo-app.apk`, and seeding 4 approved demo apps (*SynthCode Pro*, *Void Runner*, *GuardRail AI*, and *Prism Design*).

---

## Build, Run & Test Commands

### Root Workspace Scripts (`package.json`)

| Command | Execution Target | Description |
| :--- | :--- | :--- |
| `npm run setup` | `node setup.js` | Bootstraps `.env`, creates `uploads/apk/`, and installs root + client dependencies |
| `npm run dev` | `concurrently` | Runs `npm run dev:server` and `npm run dev:client` in parallel |
| `npm run dev:server` | `nodemon server/index.js` | Starts the Express backend server with hot-reload |
| `npm run dev:client` | `cd client && npm run dev` | Starts the Vite dev server on `http://localhost:5173` with `/api` proxy |
| `npm run build` | `client/` | Installs client packages and compiles the production bundle into `client/dist/` |
| `npm start` | `node server/index.js` | Starts the production Express server (serves both `/api/*`, `/downloads/*`, and `client/dist`) |
| `npm test` | `jest server/__tests__` | Executes all 8 backend unit, integration, and `fast-check` property test suites |
| `npm run test:client` | `cd client && npm test` | Runs frontend Vitest + React Testing Library suites in headless mode |
| `npm run test:all` | Root + Client | Sequentially runs `npm test` (backend) and `npm run test:client` (frontend) |
| `npm run android:dev` | Capacitor Android | Copies `capacitor.config.dev.json`, builds client, and runs `npx cap sync android` for LAN live-reload |
| `npm run android:prod` | Capacitor Android | Restores production `capacitor.config.json`, builds client, and copies assets via `npx cap copy android` |
| `npm run android:open` | Android Studio | Launches the native Android project (`client/android`) in Android Studio |
| `npm run clean` | Workspace | Removes `node_modules`, `client/node_modules`, `client/dist`, `uploads/*.apk`, and `*.sqlite` |
| `npm run reset` | Workspace | Executes `npm run clean` followed by `npm run setup` |

### Client Workspace Scripts (`client/package.json`)

| Command | Working Directory | Description |
| :--- | :--- | :--- |
| `npm run dev` | `client/` | Launches Vite 6 development server with HMR |
| `npm run build` | `client/` | Compiles optimized production assets to `client/dist/` |
| `npm run preview` | `client/` | Locally previews the compiled `client/dist/` production build |
| `npm test` | `client/` | Runs `vitest --run` (single-pass JSDOM test execution) |
| `npm run test:watch` | `client/` | Runs `vitest` in interactive watch mode |
| `npm run test:ui` | `client/` | Launches the browser-based `@vitest/ui` dashboard |

---

## Configuration Mapping Tables

### Root Server Configuration (`.env.example` & Runtime Variables)

| Variable | Default / Example | Required | Description |
| :--- | :--- | :---: | :--- |
| `PORT` | `3000` | No | TCP port on which the Express server listens (`0.0.0.0`) |
| `LAN_IP` | `192.168.1.100` | Yes (Mobile) | Host machine's local network IP used to construct `downloadUrl` and `apkUrl` links for physical Android devices |
| `JWT_SECRET` | `your_random_secret_here` | **Yes** | Secret key used by `jsonwebtoken` to sign and verify 7-day HMAC-SHA256 bearer tokens |
| `DEMO_ADMIN_EMAIL` | `admin.demo@gmail.com` / `admin@devmarket.lan` | Yes | Email address automatically granted the `administrator` role during database seeding and Firebase login |
| `FIREBASE_SERVICE_ACCOUNT_PATH` | `./firebase-service-account.json` | **Yes** | Relative or absolute path to the Firebase Admin SDK service account JSON credential file |
| `DB_TYPE` | `mysql` (or `sqlite`) | Yes | Database engine selector: `sqlite` uses `better-sqlite3` zero-config file; `mysql` uses `mysql2/promise` pool |
| `DB_PATH` | `./devmarket.sqlite` | If `sqlite` | File path for the SQLite database when `DB_TYPE=sqlite` |
| `DB_HOST` | `localhost` | If `mysql` | MySQL server hostname or IP address |
| `DB_USER` | `devmarket_user` | If `mysql` | MySQL authentication username |
| `DB_PASSWORD` | `your_password_here` | If `mysql` | MySQL authentication password |
| `DB_NAME` | `devmarket` | If `mysql` | Target MySQL schema/database name |
| `CORS_ORIGIN` | `*` (when blank) | No | Allowed CORS origin(s); leave blank or `*` to allow mobile WebViews and LAN clients |
| `ADMIN_USERNAME` | `admin` | For Cred Auth | Administrator username validated by `POST /api/auth/credentials` |
| `ADMIN_PASSWORD` | `admin123` | For Cred Auth | Administrator password validated by `POST /api/auth/credentials` |
| `DEVELOPER_USERNAME` | `developer` | For Cred Auth | Developer username validated by `POST /api/auth/credentials` |
| `DEVELOPER_PASSWORD` | `dev123` | For Cred Auth | Developer password validated by `POST /api/auth/credentials` |
| `VITE_API_BASE_URL` | `http://192.168.0.103:3000/api` | No | Fallback API base URL when running Vite from the root environment |

### Client Frontend Configuration (`client/.env.example`)

| Variable | Default / Example | Required | Description |
| :--- | :--- | :---: | :--- |
| `VITE_FIREBASE_API_KEY` | `your_firebase_api_key` (or `mock-key`) | **Yes** | Firebase Web API key. Set to `mock-key` to enable offline 1-tap test account selection without Google OAuth |
| `VITE_FIREBASE_AUTH_DOMAIN` | `your_project.firebaseapp.com` | Yes (Real Auth) | Firebase project authentication domain for OAuth popup/redirect flows |
| `VITE_FIREBASE_PROJECT_ID` | `your_project_id` | Yes (Real Auth) | Unique Firebase project identifier |
| `VITE_FIREBASE_APP_ID` | `your_firebase_app_id` | Yes (Real Auth) | Firebase web application ID |
| `VITE_API_BASE_URL` | `/api` | **Yes** | Base URL for backend API calls. Use `/api` for local web dev (proxied by Vite) or `http://<LAN_IP>:<PORT>/api` for Android APK builds |

---

## Documentation Index

- **[Architecture & Data Flows](docs/ARCHITECTURE.md)** ([Root Mirror](ARCHITECTURE.md)) — Detailed component breakdown, schema definitions, and sequence flows
- **[REST API Reference](docs/API.md)** ([Root Mirror](API.md)) — Complete endpoint specifications, `curl` examples, request/response payloads, and status codes
- **[Developer Guide](DEVELOPMENT.md)** — Deep-dive environment setup, database migrations, Jest/Vitest testing, and Capacitor Android debugging
- **[Contributing Guidelines](CONTRIBUTING.md)** — Branching strategy, Conventional Commits, code style, and pull request workflow
- **[Security Policy](SECURITY.md)** — Vulnerability reporting, RBAC architecture, binary upload guards, and SQL injection mitigation
- **[Support & FAQ](SUPPORT.md)** — Troubleshooting common Firebase, Multer, SQLite, and Android Emulator (`10.0.2.2`) issues
- **[Roadmap](ROADMAP.md) & [Vision](VISION.md)** — Short-term engineering milestones and long-term architectural direction
- **[Changelog](CHANGELOG.md)** — Release history adhering to Keep a Changelog v1.1.0 and Semantic Versioning

---

## License

Distributed under the **MIT License**.
