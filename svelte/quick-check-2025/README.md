# DORA Quick Check 2025 (Experimental)

This folder contains the updated DORA Quick Check implementation for 2025. It's a Single Page Application (SPA) built with [Svelte 5](https://svelte.dev) and [TypeScript](https://www.typescriptlang.org/).

## Features (2025)
*   **Deployment Rework Rate**: A new metric integrated into the performance calculation.
*   **Multi-step/Single-page Hybrid**: Embedded mode shows all questions on one page, while Kiosk mode remains multi-step.
*   **Versioned Benchmarks**: Supports 2024 and 2025 benchmark data via an internal API.
*   **TypeScript**: Fully typed for better maintainability.

## Development

### Prerequisites
*   Node.js and npm

### Local Development
1.  Navigate to this folder: `cd svelte/quick-check-2025`
2.  Install dependencies: `npm install`
3.  Run the dev server: `npm run dev`

### Building for Hugo
To build the SPA and copy it to the experimental Hugo content directory:
1.  From the project root, run: `bash svelte/quick-check-2025/build-quick-check.sh`
2.  Preview with Hugo: `hugo serve -s hugo`

## Internal API (`DataService`)

The 2025 Quick Check uses a centralized `DataService` (`src/lib/data-service.ts`) to manage benchmark data and metric calculations. This service acts as an internal API, abstracting the underlying JSON data structures.

### Accessing the API

External Svelte components or TypeScript modules within this project can consume the `DataService` as follows:

```typescript
import { DataService } from './lib/data-service';

// Get industry benchmarks for a specific version (default is '2025')
const industryBenchmarks = await DataService.getIndustryMetrics('2025');
console.log(industryBenchmarks['technology'].name); // "Technology"

// Get organization size benchmarks
const orgBenchmarks = await DataService.getOrgSizeMetrics('2025');
console.log(orgBenchmarks['fewer_than_100'].name); // "20 to 99 employees"

// Calculate a recoded metric (0-10 scale)
const recodedLeadTime = DataService.calculateRecodedMetric(4, 'categorical'); // 4 maps to 6.0

// Calculate overall performance average
const metrics = {
    leadtime: 4,
    deployfreq: 4,
    failurerecovery: 3,
    changefailure: 15,
    rework: 10
};
const avg = DataService.calculatePerformanceAverage(metrics, '2025');
```

### Future Externalization

The `DataService` is designed to be easily extracted into a standalone library or replaced by a fetch-based client for a remote REST/GraphQL API. To externalize:
1.  Replace the static JSON imports in `data-service.ts` with `fetch()` calls to a backend endpoint.
2.  Maintain the existing interface (`getIndustryMetrics`, `calculateRecodedMetric`, etc.) to ensure the UI components continue to function without modification.

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

### Comparison by industry size
Enable organization size comparisons by adding `comp=size` to the query string. Data is stored in `src/lib/data/editions/[year]/organization_size_metrics.json`.
