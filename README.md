# ProConnect Tax API Portal Prototype

A frontend-only React/TypeScript prototype of the ProConnect Tax API Portal, featuring four main sections for managing API integrations.

## Features

- **API Catalog**: Browse and explore available APIs with search and filtering
- **Documentation**: Comprehensive guides with code examples in multiple languages
- **API Keys**: Generate and manage API keys with a 3-step connection wizard
- **API Health**: Monitor API performance with real-time metrics and traffic logs

## Technology Stack

- React 18+ with TypeScript
- React Router for navigation
- Vite for build tooling
- CSS Modules for styling

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

The app will automatically redirect to `/settings/api-portal/catalog`.

## Project Structure

```
src/
├── components/
│   ├── Layout/          # Header, Sidebar, SettingsLayout
│   ├── APICatalog/      # API catalog components
│   ├── Documentation/   # Documentation viewer
│   ├── APIKeys/         # API key management
│   ├── APIHealth/       # Health dashboard
│   └── Shared/          # Reusable components (Button, Card, Table, etc.)
├── data/                # Mock data files
├── styles/              # Global styles and design tokens
└── types/               # TypeScript type definitions
```

## Design System

The prototype uses design tokens matching ProConnect Tax's visual identity:
- Primary color: Intuit Blue (#0077C5)
- Dark sidebar navigation
- Clean, professional UI components

## Mock Data

All data is stored in JSON files in the `src/data/` directory:
- `apiCatalog.json` - Available APIs
- `apiKeys.json` - Sample API keys
- `apiHealth.json` - Health metrics and traffic logs
- `scopes.json` - Available API scopes

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Notes

This is a frontend-only prototype with mock data. No backend API is required to run the application.
