# Wedding Planner

Static wedding planning site for GitHub Pages, with optional real-time sync through Firebase Firestore and file uploads through Firebase Storage.

## What It Does

- Tracks procurements by event day, including vendor, category, total price, amount paid, remaining balance, currency, and notes.
- Supports receipt and invoice attachments on procurement items.
- Tracks checklist status for each major event item using `None`, `Inquired`, `Partial`, and `Full`.
- Tracks editable schedules by event day.
- Rolls up budget totals directly from procurement records.
- Stores planner state locally by default.
- Supports optional real-time shared sync through Firebase Firestore.
- Supports `Export planner state` and `Import planner state` as a fallback.

## Realtime Sync Setup

1. Create a Firebase project.
2. Turn on Firestore.
3. Replace the placeholders in `firebase-config.js` with your Firebase web app config.
4. Create Firestore rules that allow your intended users to read and write the planner document.
5. Enable Firebase Storage as well if you want receipt and invoice uploads.
6. The app writes to the document path set in `window.WEDDING_SYNC_OPTIONS.documentPath`.

Without Firebase config, the site stays in local-only mode.

## Publishing

Because this is plain HTML/CSS/JS, you can publish it directly with GitHub Pages:

1. Push the contents of this folder to a GitHub repository.
2. In GitHub, enable Pages for the repository root or default branch.
3. Open the published site URL.
