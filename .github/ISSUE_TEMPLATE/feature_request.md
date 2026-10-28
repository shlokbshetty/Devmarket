---
name: ✨ Feature Request
about: Propose a new capability, API endpoint, or native Android integration for DevMarket
title: "[FEAT] <concise feature title>"
labels: ["enhancement"]
assignees: []
---

## Problem Statement

<!-- Describe the user, developer, or administrator pain point this feature solves. Example: "As a developer uploading an APK, I want automatic AndroidManifest.xml version extraction so I don't have to type the version string manually." -->

## Proposed Solution

<!-- Provide a clear technical description of how the feature should work across the UI, API, and/or database schema. -->

## Target Component(s)

Select all architectural layers impacted by this proposal:

- [ ] **Client UI (`client/src/pages/`, `client/src/components/`)**: Catalog discovery, search, ratings, or theme design
- [ ] **Developer Dashboard (`DevDashboard.jsx`, `POST /api/apps/upload`)**: APK package ingestion, metadata, or analytics
- [ ] **Admin Panel (`AdminPanel.jsx`, `/api/admin/*`)**: Moderation workflow, binary scanning, or user role management
- [ ] **Express API & Persistence (`server/`)**: New REST endpoints, SQLite/MySQL schema migrations, or authentication flows
- [ ] **Capacitor Android Runtime (`client/android/`, `nativeBridge.js`)**: Native plugins, haptics, package installation, or offline support

## API / Schema Impact (If Applicable)

<!-- If this feature introduces or modifies REST endpoints or database tables (`users`, `apps`, `reviews`), sketch the proposed contract here: -->

```json
{
  "endpoint": "POST /api/apps/...",
  "request": {},
  "response": { "success": true }
}
```

## Alternatives Considered

<!-- Describe any alternative approaches or workarounds you considered and why the proposed solution is preferable. -->

## Additional Context & References

<!-- Link any related issues, roadmap items in ROADMAP.md, or mockups/wireframes. -->
