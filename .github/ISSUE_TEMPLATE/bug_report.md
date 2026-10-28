---
name: 🐛 Bug Report
about: Report a reproducible defect in the DevMarket Web UI, Express Backend API, or Capacitor Android App
title: "[BUG] <concise summary of the issue>"
labels: ["bug"]
assignees: []
---

## Bug Description

<!-- A clear and concise description of what the bug is and which user role (user, developer, administrator) is affected. -->

## Steps to Reproduce

1. Start the environment using `...` (e.g., `npm run dev` or install the Android APK)
2. Authenticate as `...` (e.g., `admin@devmarket.lan`, `developer@devmarket.lan`, or Google OAuth)
3. Navigate to `...` (e.g., `/dev`, `/admin`, `/app/1`, or call `POST /api/apps/upload`)
4. Perform action `...`
5. Observe error: `...`

## Expected Behavior

<!-- What should have happened according to the API contract or UI specification? -->

## Actual Behavior

<!-- What actually happened instead? Include HTTP status codes or UI error banners if applicable. -->

## Logs & Screenshots

<!-- Paste browser console logs (🔄 API Request / ❌ API Request failed), Express server logs, or Android Studio Logcat output below. Attach screenshots if visual. -->

```text
Paste terminal / console / Logcat output here
```

## Execution Environment

| Environment Property | Value |
| :--- | :--- |
| **Execution Target** | `[ ] Web Browser` / `[ ] Capacitor Android Physical Device` / `[ ] Android Studio Emulator` |
| **Operating System** | e.g., Windows 11 / macOS 15 / Ubuntu 24.04 / Android 15 (API 35) |
| **Node.js & npm Version** | e.g., `node v20.18.0`, `npm v10.8.2` |
| **Database Mode (`DB_TYPE`)** | `[ ] sqlite (better-sqlite3)` / `[ ] mysql (mysql2)` |
| **Auth Mode (`VITE_FIREBASE_API_KEY`)** | `[ ] mock-key (Dev Mode)` / `[ ] Real Firebase Google OAuth` / `[ ] Credential Login` |
| **Browser / WebView Version** | e.g., Chrome 131 / Android System WebView |

## Additional Context

<!-- Add any other context, such as whether `npm test` or `npm run test:client` also reproduces the failure. -->
