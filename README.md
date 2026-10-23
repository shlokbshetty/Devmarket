# DevMarket Enterprise Platform

[![Node.js](https://img.shields.io/badge/Node.js-18.x%20%7C%2020.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.18.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Capacitor](https://img.shields.io/badge/Capacitor-Android-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)](https://capacitorjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-Better--SQLite3-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://sqlite.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)](package.json)

> **Enterprise mobile distribution and moderation engine providing end-to-end APK package verification, lifecycle-governed role management, and cross-platform native delivery.**

---

## Architecture & Data Flow Diagram

```mermaid
graph TD
    subgraph ClientLayer ["Client Presentation Layer"]
        WA["Web Client (React 18 + Vite)"]
        MA["Android Native Wrapper (Capacitor)"]
    end

    subgraph GatewayAuth ["Ingress & Identity Layer"]
        CORS["Express Ingress & CORS Shield"]
        FB["Firebase Authentication SDK"]
        MW["JWT Token Verification & RBAC Middleware"]
    end

    subgraph ServiceLayer ["Core Service Orchestration"]
        AuthSvc["Identity & User Provisioning Service"]
        UploadSvc["Multipart APK Intake & MIME Parser (Multer)"]
        CatalogSvc["Application Discovery & Filter Pipeline"]
        AdminSvc["Moderation & Role Governance Pipeline"]
    end

    subgraph PersistenceLayer ["Storage & Data Tier"]
        DB[("Embedded SQLite / MySQL Persistence")]
        FS[("Atomic Local Blob Storage (/uploads/apk)")]
    end

    WA -->|HTTPS / API Requests| CORS
    MA -->|HTTPS / API Requests| CORS
    WA -.->|ID Token Handshake| FB
    MA -.->|OAuth Native Auth| FB
    FB -->|Verified Identity| MW
    CORS --> MW

    MW -->|Auth Routes| AuthSvc
    MW -->|Role: Developer| UploadSvc
    MW -->|Public Access| CatalogSvc
    MW -->|Role: Admin| AdminSvc

    AuthSvc --> DB
    UploadSvc -->|Binary Package (.apk)| FS
    UploadSvc -->|Metadata Indexing| DB
    CatalogSvc --> DB
    AdminSvc --> DB
    CatalogSvc -->|Stream Package| FS
```

---

## Core Features

- **Asynchronous Package Ingestion & Validation**: Streaming multipart file parser enforcing strict 200MB boundaries and MIME-type integrity checks (`application/vnd.android.package-archive`) to prevent unauthorized binaries.
- **Dual-Tier Identity Architecture**: Hybrid Firebase Admin SDK and standard HMAC-SHA256 JWT validation supporting Google OAuth federated tokens alongside encrypted credential fallback.
- **Granular Role-Based Access Governance (RBAC)**: Enforces privilege boundaries across User, Developer, and Administrator personas with token revocation and promotion workflows.
- **Audit-Controlled Moderation Pipeline**: Staged lifecycle transitions (`pending` &rarr; `approved` / `rejected`) safeguarding mobile consumers against unverified distribution payloads.
- **High-Throughput Binary Streaming**: Byte-range static file delivery server configured with forced `Content-Disposition: attachment` headers for cross-subnet LAN downloads.
- **Hybrid Native Compilation**: Pre-configured Capacitor runtime container enabling instantaneous parity across standard desktop browsers and physical Android hardware.

---

## Tech Stack Directory

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, TailwindCSS, Lucide React, Capacitor Android Bridge |
| **Backend** | Node.js (v18+), Express.js, Multer Streaming Engine |
| **Database & State Tier** | SQLite (`better-sqlite3`), Mongoose/MySQL compatibility drivers, React Context API |
| **DevOps & Verification** | Jest, Supertest, Fast-Check (Property-Based Testing), Memfs Virtualization, Concurrently |

---

## Quickstart & Verification

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **Package Manager**: `npm v9+` or `yarn`
- **Android SDK / Android Studio** (Optional, for native mobile builds)

### Environment Configuration
Copy `.env.example` to `.env` in the project root:

```env
# Server Runtime
PORT=3000
LAN_IP=127.0.0.1
NODE_ENV=development

# Authentication
JWT_SECRET=enterprise_devmarket_production_jwt_secret_token
FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-service-account.json

# Client Bridge
VITE_API_BASE_URL=http://localhost:3000/api
```

### Installation & Execution
```bash
# 1. Install root dependencies and bootstrap SQLite schema
npm run setup

# 2. Run automated validation suite (Jest + Fast-Check property tests)
npm test

# 3. Launch concurrent full-stack development environment
npm run dev
```

---

## API & Route Specification

| HTTP Method | Route | Authorization | Request Body / Params | Expected Response | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/firebase` | Public | `{ idToken: string }` | `200 OK` + `{ token, user }` | Exchange Firebase ID token for backend JWT |
| `POST` | `/api/auth/credentials` | Public | `{ username, password }` | `200 OK` + `{ token, user }` | Authenticate system credentials |
| `GET` | `/api/auth/me` | Bearer Token | Header: `Authorization` | `200 OK` + User Object | Retrieve authenticated session claims |
| `GET` | `/api/apps` | Public | Query: `category`, `search` | `200 OK` + `App[]` | Paginated index of approved applications |
| `GET` | `/api/apps/:id` | Public | Route: `id` | `200 OK` + `App` | Retrieve detailed application metadata |
| `POST` | `/api/apps/upload` | Developer | Form-Data: `file` (APK), `name`, `desc` | `201 Created` + `AppRecord` | Multipart APK package ingestion |
| `GET` | `/api/admin/apps/pending` | Administrator | None | `200 OK` + `PendingApp[]` | Retrieve submissions awaiting moderation |
| `PUT` | `/api/admin/apps/:id/approve` | Administrator | Route: `id` | `200 OK` + `{ success: true }` | Transition app status to `approved` |
| `PUT` | `/api/admin/apps/:id/reject` | Administrator | Route: `id` | `200 OK` + `{ success: true }` | Transition app status to `rejected` |
| `PUT` | `/api/admin/users/:uid/promote`| Administrator | Route: `uid` | `200 OK` + `{ success: true }` | Elevate user to Developer role |
