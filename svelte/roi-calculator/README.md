# ROI of AI-assisted software development calculator

This folder contains the ROI calculator implementation. It is a Single Page Application (SPA) using the [Svelte](https://svelte.dev) framework (v5). It is built independently of the main Hugo site and embedded as a static asset.

## Development

### Prerequisites
- Node.js and npm

### Local development (standalone)
1. Navigate to this folder: `cd svelte/roi-calculator`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Open the provided URL in your browser.

### Testing
We use [Vitest](https://vitest.dev/) for unit testing the calculation logic.
- Run tests once: `npm test -- --run`
- Run tests in watch mode: `npm test`

The calculation logic is isolated in `src/lib/calculations.js` and verified in `src/lib/calculations.test.js`.

## Integration with Hugo

The calculator is integrated into the Hugo site at `https://dora.dev/experimental/roi-calculator/`.

### Building and deploying to Hugo
To preview the calculator within the full Hugo site:
1. From the **project root**, run the build script:
   ```bash
   ./svelte/roi-calculator/build-roi-calculator.sh
   ```
   This script builds the Svelte app and copies the generated JS and CSS files to `hugo/content/experimental/roi-calculator/`.
2. Run Hugo:
   ```bash
   hugo serve -s hugo
   ```
3. Preview at `http://localhost:1313/experimental/roi-calculator/`.

## Architecture notes

- **State management**: Uses Svelte 5 runes (`$state`, `$derived`, `$effect`).
- **Persistence**: The calculator state is synchronized with the URL hash. This allows the page to be bookmarkable and sharable with specific input values.
- **Validation**: Inputs are sanitized both at the component level and within the calculation engine to prevent invalid states (e.g., negative staff size).
- **Formatting**: `src/lib/formatters.js` handles currency, percentage, and number formatting for consistent display.
- **Components**:
    - `NumericInput.svelte`: Handles large numbers with thousand separators and optional currency formatting.
    - `PercentInput.svelte`: Handles percentage inputs, converting between display values (33) and internal decimals (0.33).
