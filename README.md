# Codex Search Analytics Dashboard

A high-performance analytics dashboard for visualizing search trend data across competitors, built with Next.js, TypeScript, and Recharts.

## Overview

This dashboard provides interactive visualizations of search performance data, allowing users to analyze competitor search trends over time. It features a monthly line chart and quarterly heatmap visualization with comprehensive filtering capabilities.

## Tech Stack

- **Frontend**: Next.js 15.x with TypeScript
- **Styling**: Tailwind CSS
- **Data Visualization**: Recharts (line chart), custom implementation (heatmap)
- **State Management**: React Hooks with context
- **Data Fetching**: SWR with custom caching strategies
- **Deployment**: Vercel

## Features

- Interactive search trend visualizations
- Comprehensive filtering system
- Responsive design for all device sizes
- WCAG 2.2 AA compliant accessibility
- Performance-optimized with code splitting and memoization
- Secure implementation with proper CSP headers

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/codex-dashboard.git
cd codex-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at http://localhost:3000.

### Production Build

```bash
# Create optimized production build
npm run build

# Run production build locally
npm start
```

## Project Structure

```
/src
  /components
    /filters        # Filter components
    /layout         # Layout components (header, navigation)
    /shared         # Reusable UI components
    /visualizations # Data visualization components
  /lib
    /api           # API functions
    /hooks         # Custom React hooks
    /utils         # Utility functions
  /types           # TypeScript type definitions
  /pages           # Next.js pages
  /styles          # Global styles
```

## Performance Optimizations

- React.memo for heavy components
- Code splitting with dynamic imports
- SWR for efficient data fetching and caching
- Responsive image optimization

## Accessibility

This project follows WCAG 2.2 AA guidelines:

- Proper semantic HTML
- ARIA attributes for interactive elements
- Keyboard navigation support
- Color contrast compliance
- Screen reader support

## Security

Security measures implemented:

- Content Security Policy (CSP)
- HTTP security headers
- Input validation
- XSS protection

## CI/CD

Continuous integration and deployment is set up with GitHub Actions:

- Automated linting and type checking
- Build verification
- Automatic deployment to Vercel

## Architecture Overview

The application follows a component-based architecture with clear separation of concerns:

1. **UI Layer**: React components for visualization and user interaction
2. **Data Layer**: SWR-based hooks for data fetching with caching
3. **State Layer**: React context for global state management
4. **API Layer**: Typed API client for data retrieval

