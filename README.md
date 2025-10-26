# Room Ceiling Editor

> Interactive ceiling grid editor built with SvelteKit 5 and TailwindCSS 4

## TL;DR

A drag-and-drop SVG canvas application for designing room ceiling layouts with lighting fixtures, HVAC components, and smoke detectors. Features pan/zoom navigation, context menus, and real-time grid interactions.

Right click to add cells.

Change the canvas size from the bottom left.

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── routes/+page.svelte          # Main canvas application
├── lib/
│   ├── components/
│   │   ├── grid/                # Grid, cells, and floating elements
│   │   ├── NodesMenu.svelte     # Context menu
│   │   └── ZoomControl.svelte   # Zoom UI controls
│   ├── types.ts                 # TypeScript definitions
│   └── stores.ts                # Shared state management
```

## Cell Types

- **Light** - Ceiling light fixtures
- **Air Supply** - HVAC supply vents
- **Air Return** - HVAC return vents
- **Smoke Detector** - Fire safety sensors