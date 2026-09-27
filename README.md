# EchoBin

Returns processing app for retail store teams, built for a Walmart hackathon. Admins see where returns are piling up, workers get assigned returns with drop locations, and every item is tagged over NFC so each item can be tracked to where it needs to go.

## Features

- **Role-based access.** Admins get full system access and management. Workers get task management and operations.
- **Returns dashboard.** Overview of recent returns with quick filters (new, defective), search and AI insights on return patterns.
- **Task list.** Each worker sees assigned returns with item ID, current location and where to drop it, and moves them to completed.
- **NFC processing.** Scan a return and write its item and task details to an NFC tag in one step.
- **Reports.** Totals for returns, defective items and new items, with charts.

## Stack

React Native (Expo, Expo Router), TypeScript, Firebase Auth and Firestore, react-native-chart-kit, Reanimated.

## Run it

```bash
npm install
npx expo start
```

Point `hooks/firebaseConfig.ts` at your own Firebase project before signing in. NFC writing needs a physical device.
