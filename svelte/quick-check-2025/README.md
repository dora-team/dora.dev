# DORA Quick Check 2025 (Experimental)

This folder contains the updated DORA Quick Check implementation for 2025. It is a Single Page Application (SPA) built with [Svelte 5](https://svelte.dev) and [TypeScript](https://www.typescriptlang.org/).

## Overview

The Quick Check allows users to measure their software delivery performance across five key metrics, compare their results against DORA benchmarks, and identify prioritization capabilities through a data-driven questionnaire.

## Features (2025)
*   **Deployment Rework Rate**: A new metric integrated into the performance calculation.
*   **Multi-step/Single-page Hybrid**: Embedded mode shows all questions on one page, while Kiosk mode remains multi-step.
*   **Versioned Benchmarks**: Supports 2024 and 2025 benchmark data via an internal API.
*   **TypeScript**: Fully typed for better maintainability.

## Architecture & Integration

-   **Framework**: Svelte 5 (utilizing runes like `$state`, `$derived`, and `$effect`).
-   **Integration**: The application is embedded into the Hugo site via `/hugo/content/experimental/quick-check/_index.md`.
-   **Assets**: When built, the application generates `quickcheck-2025.js` and `quickcheck-2025.css` which are copied to the Hugo content directory.

## Development

### Prerequisites
*   Node.js and npm

### Local Development
1.  Navigate to this folder: `cd svelte/quick-check-2025`
2.  Install dependencies: `npm install`
3.  Run the dev server: `npm run dev`

### Building for Hugo
To build the SPA and copy it to the experimental Hugo content directory, run the following from the project root:
```bash
bash svelte/quick-check-2025/build-quick-check.sh
```
This script compiles the assets and places them in `hugo/public/experimental/quick-check/`.

---

## Extending the Application

The "What's holding you back?" section is data-driven. To add a new capability:

### 1. Update the Data
Add the new capability details to the JSON configuration file.
-   **File**: `src/lib/data/capability_prioritization_questions.json`
-   **Action**: Add a new entry to the array with a unique `shortname` and at least 5-6 questions.

### 2. Update Application Logic
Update the application to recognize the new capability when loading state from URL parameters.
-   **File**: `src/App.svelte`
-   **Action**: Locate the `onMount` block (around line 92). Update the check to include your new `shortname` and update the `current_capability` index:
    ```typescript
    if (["ci", "arch", "culture", "your-new-cap"].every((param) => searchParams.has(param))) {
        current_capability = 3; // Index (0-based) for the results summary
    }
    ```

### 3. Build and Deploy
Run the build script mentioned above to update the assets used by the Hugo site.

---

## Internal API (`DataService`)

The 2025 Quick Check uses a centralized `DataService` (`src/lib/data-service.ts`) to manage benchmark data and metric calculations. This service acts as an internal API, abstracting the underlying JSON data structures.

### Accessing the API

```typescript
import { DataService } from './lib/data-service';

// Get industry benchmarks for a specific version (default is '2025')
const industryBenchmarks = await DataService.getIndustryMetrics('2025');

// Calculate a recoded metric (0-10 scale)
const recodedLeadTime = DataService.calculateRecodedMetric(4, 'categorical');
```

## Testing

### Unit Tests
Run unit tests for the `DataService` and recoding logic:
`npm test`

### Playwright Tests
End-to-end tests are located in the root `test/playwright` directory.
Run the 2025 specific tests:
`npx playwright test tests/quickcheck2025.spec.ts`

---

## Legacy Features

### Comparison by organization size
Enable organization size comparisons by adding `comp=size` to the query string. Data is stored in `src/lib/data/editions/[year]/organization_size_metrics.json`.
