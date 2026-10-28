# DevMarket Architectural Vision (`VISION.md`)

**DevMarket** is built on a clear conviction: distributing, testing, and discovering independent Android software should be fast, transparent, self-hostable, and native-first—without sacrificing rigorous moderation or security.

---

## 1. Core Philosophical Pillars

### 1.1 Zero-Friction Local & LAN Sovereignty
Traditional mobile app stores require complex cloud infrastructure, proprietary build pipelines, and multi-day review cycles just to distribute an internal or indie Android build to a team of testers. DevMarket is architected so that any developer, university lab, or enterprise team can clone the repository, run `npm run setup && npm run dev`, and immediately operate a fully functional, LAN-accessible Android app marketplace backed by an embedded SQLite database (`devmarket.sqlite`) and local filesystem storage (`uploads/apk/`)—while retaining seamless upward scalability to MySQL connection pools when deploying to the cloud.

### 1.2 Web Agility Meets Native Hardware Fidelity
Mobile users expect tactile responsiveness, native gesture handling, and system-level visual harmony. Rather than maintaining separate web and native codebases, DevMarket unifies **React 18**, **Vite 6**, **Tailwind CSS v4**, and **Capacitor 8**:
- On **desktop browsers**, developers and administrators can preview the exact mobile experience inside an interactive smartphone simulator frame (`Layout.jsx`).
- On **physical Android devices**, the same bundle runs edge-to-edge (`viewport-fit=cover`) with native haptic feedback (`@capacitor/haptics`), dynamic dark/light status bar synchronization (`@capacitor/status-bar`), hardware back-button navigation (`@capacitor/app`), and direct APK package installation (`REQUEST_INSTALL_PACKAGES`).

### 1.3 Defense-in-Depth Moderation & Explicit Trust Boundaries
An open or self-hosted package marketplace must never become a vector for unverified binaries. DevMarket enforces strict trust boundaries at every layer:
1. **Identity Separation**: End users authenticate via federated Google OAuth 2.0 (`POST /api/auth/firebase`), while privileged roles (`developer`, `administrator`) are governed by explicit role-based access control (`requireDeveloper`, `requireAdmin`) and auditable user promotion (`PUT /api/admin/users/:uid/promote`).
2. **Binary Validation & Quarantine**: Uploaded files must pass Multer MIME/extension checks and size limits before being quarantined in `status = 'pending'`. No binary is ever exposed to public catalog or search endpoints until an administrator explicitly approves it.
3. **Property-Verified Correctness**: Critical invariants—such as JWT verification, idempotent user upserts, role promotion permissions, and upload validation—are continuously verified using randomized property-based tests (`fast-check` + Jest + Vitest).

---

## 2. Long-Term Architectural Direction

```text
+-----------------------------------------------------------------------------------+
|                        DEV-TO-DEVICE DISTRIBUTION CONTINUUM                       |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [Developer IDE / CI Pipeline]                                                    |
|         │                                                                         |
|         ▼  (Multipart Upload / CLI Token)                                         |
|  [DevMarket Ingestion Engine] ──► Manifest Extraction & SHA-256 Attestation       |
|         │                                                                         |
|         ▼  (Quarantine: status = 'pending')                                       |
|  [Automated Security & Admin Moderation Gate]                                     |
|         │                                                                         |
|         ▼  (Approved Catalog: SQLite / MySQL + Local / S3 Object Storage)         |
|  [Capacitor Android Client] ──► Native Package Installer & Delta Auto-Updater     |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

As DevMarket evolves from `v1.0` toward `v2.0` (detailed in [`ROADMAP.md`](ROADMAP.md)), our architectural focus centers on three strategic horizons:

1. **Automated Binary Intelligence**: Transitioning moderation from manual inspection to automated static/dynamic analysis—automatically parsing `AndroidManifest.xml` permissions, verifying cryptographic APK signatures (`apksigner` v2/v3), and surfacing SHA-256 provenance directly to end users.
2. **CI/CD Native Publishing**: Allowing developers to push signed release candidates straight from GitHub Actions to their DevMarket instance via scoped API tokens, turning DevMarket into a turnkey self-hosted alternative to Firebase App Distribution and Google Play Internal Tracks.
3. **Edge & LAN Syndicate Caching**: Empowering organizations with constrained internet connectivity (universities, hackathons, field operations) to run local DevMarket nodes that serve 200 MB+ Android packages at gigabit local Wi-Fi speeds with zero external bandwidth overhead.
