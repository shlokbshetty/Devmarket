# DevMarket Product & Engineering Roadmap (`ROADMAP.md`)

This document outlines the short-term, medium-term, and long-term engineering milestones for **DevMarket**. For the overarching architectural philosophy driving these milestones, see [`VISION.md`](VISION.md).

---

## Current Baseline: `v1.0.0` (Completed)

- [x] **Hybrid Web & Capacitor 8 Android Runtime**: Single React 18 + Vite 6 + Tailwind CSS v4 codebase running on Web and Native Android (`SDK 36`) with haptics, dynamic status bar, and hardware back-button integration.
- [x] **Dual-Mode Authentication & RBAC**: Firebase Google OAuth 2.0 token exchange (`POST /api/auth/firebase`), direct credential auth (`POST /api/auth/credentials`), 1-tap offline mock mode, and 7-day HMAC-SHA256 JWT role guards (`user`, `developer`, `administrator`).
- [x] **Multipart APK Distribution & Moderation Pipeline**: 200 MB Multer upload engine (`POST /api/apps/upload`), staged `pending` -> `approved`/`rejected` moderation workflow, and byte-range static streaming (`GET /downloads/:filename`).
- [x] **Unified SQLite / MySQL Persistence**: Zero-config `better-sqlite3` local database with automatic schema migrations, demo seeding, and `mysql2/promise` pool compatibility.
- [x] **Automated Property-Based Testing**: 8 backend Jest + `fast-check` test suites and 3 frontend Vitest test suites.

---

## Phase 1: Binary Integrity, Security Scanning & Package Metadata (`v1.1.0` — Short-Term)

| Milestone | Target Component | Description | Status |
| :--- | :--- | :--- | :---: |
| **Automated APK Manifest Parser** | `server/controllers/appController.js` | Extract `package` name (`applicationId`), `versionCode`, `versionName`, `minSdkVersion`, required Android permissions, and app icon directly from the uploaded `.apk` binary (`AndroidManifest.xml`) during Multer ingestion. | Planned |
| **SHA-256 Checksum & Signature Verification** | `server/config/initDb.js`, `appController.js` | Compute and persist the `sha256_hash` and APK signing certificate fingerprint for every uploaded binary; display checksum badges on `AppDetailsPage.jsx`. | Planned |
| **Automated Malware & VirusTotal Scanning** | `server/services/scanner.js` | Asynchronous background worker that submits `pending` APKs to VirusTotal / ClamAV before enabling the **Approve** button in `AdminPanel.jsx`. | Planned |
| **Unified SQL Review Persistence** | `server/controllers/reviewController.js` | Migrate `POST /api/reviews` and `GET /api/apps/:id/reviews` from Mongoose schemas to the unified SQLite/MySQL `query(sql, params)` adapter so reviews work out-of-the-box in zero-setup SQLite mode. | Planned |

---

## Phase 2: Developer Telemetry, Versioning & Delta Distribution (`v1.2.0` — Medium-Term)

| Milestone | Target Component | Description | Status |
| :--- | :--- | :--- | :---: |
| **Multi-Version Release Channels** | `apps` & `app_versions` tables | Allow developers to publish multiple historical versions (`stable`, `beta`, `nightly`) under a single application listing with automatic rollback support. | Planned |
| **Developer Analytics & Download Telemetry** | `DevDashboard.jsx`, `server/routes/app.js` | Track daily download counts, unique device installs, Android OS version breakdown, and rating trends inside the Developer Dashboard. | Planned |
| **Resumable Chunked Uploads & S3/R2 Storage Adapter** | `server/config/storage.js` | Pluggable storage backend supporting AWS S3 / Cloudflare R2 / MinIO presigned multipart uploads alongside local `/uploads/apk/` disk storage for packages exceeding 200 MB. | Planned |
| **In-App Update Checker for Installed Packages** | `client/src/utils/nativeBridge.js` | Compare installed Android package versions on the user's device against the latest `approved` version on DevMarket and prompt 1-tap updates. | Planned |

---

## Phase 3: Federation, CI/CD Publishing & Ecosystem Expansion (`v2.0.0` — Long-Term)

| Milestone | Target Component | Description | Status |
| :--- | :--- | :--- | :---: |
| **Developer API Keys & GitHub Actions CLI Publisher** | `POST /api/ci/publish` | Scoped Personal Access Tokens (PATs) allowing developers to publish signed `.apk` artifacts directly from GitHub Actions or GitLab CI pipelines. | Future |
| **Binary Delta Patching (`bsdiff` / `zstd`)** | `server/workers/delta.js` | Generate binary diffs between consecutive APK versions so mobile clients download only changed byte blocks over metered connections. | Future |
| **Cryptographic Developer Verification Badges** | `Profile.jsx`, `AppDetailsPage.jsx` | Domain-verified developer identities (DNS TXT / `.well-known` proof) and reproducible build attestations. | Future |
| **Offline-First PWA & Peer-to-Peer LAN Caching** | `client/`, Service Worker | Enable local classroom/enterprise LAN nodes to cache and syndicate approved APK catalogs across air-gapped networks. | Future |
