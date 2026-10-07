# Nepal Motorcycle Market 2026

Explore 20 Nepal-market motorcycle companies, with a dedicated page for each brand and the hierarchy **Brand → Family/Series → Model**. Click a model to open its official Nepal product page, or a clearly labelled official catalogue/importer fallback.

**Live site:** https://ibeshkhadka.github.io/nepal-motorcycle-market-2026/

## Features

- 142 mapped model/family entries, with current and historical evidence scopes
- Company pages, model/family search and research CSV export
- Star buttons and a Favorites view
- Responsive editorial design with locally hosted Manrope/Fraunces fonts and simple SVG icons
- Research controls in expandable notes
- Source/availability labels and direct official Nepal links

## Favorites on GitHub Pages

GitHub Pages is static hosting. This version saves favorites in browser storage. They survive reloads in the same browser, but do not sync between devices or with the original ChatGPT Sites version. No private saved favorites or account credentials are included in this repository.

The existing account-synced Sites version remains at https://nepal-motorcycle-market-2026.ibeshkhadka35.chatgpt.site/ . Its server handler and schema are preserved under `server/` as reference source, and are not deployed to Pages.

## Edit and publish

Edit `src/index.html` and `src/research.json`. Run `npm run build` with Node 22 or later. No dependency installation is required. The build generates the overview and all 20 company directories in `dist/`.

The default project path is `/nepal-motorcycle-market-2026/`. To preview at a different path, set `PAGES_BASE_PATH`, for example `PAGES_BASE_PATH=/ npm run build`.

A push to `main` triggers `.github/workflows/pages.yml`, builds the static site and publishes it with GitHub Pages. Internal company links and breadcrumbs respect the repository's URL path.

## Research scope

Petrol motorcycles marketed in Nepal; scooters, EV scooters and three-wheelers are excluded. The research/source checks are dated 5 October 2026. A catalogue or market listing does not guarantee dealer stock. Combined family entries and official catalogue/importer fallbacks are labelled. Source URLs and availability notes are included in the research data.

## Font licenses

Manrope and Fraunces are bundled as compact WOFF2 files under `src/assets/fonts/`. Both use the SIL Open Font License; their license files are included alongside the fonts. The site makes no external font requests.
