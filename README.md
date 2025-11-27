# Retired Website - No Longer Maintained

<div align="center">
  <img src="https://raw.githubusercontent.com/ShardenduMishra22/ShardenduMishra22/main/Gopher.gif" alt="Gopher Mishra" width="200"/>
</div>

# MishraShardendu22 - TurboRepo

Professional portfolio ecosystem featuring a Next.js personal website, Svelte blog platform, and Preact admin dashboard. Built with TypeScript, Turborepo, and modern web standards for optimal performance and maintainability.

## Mission

Deliver a high-performance, accessible, and SEO-optimized portfolio platform that showcases technical expertise while providing seamless content management and exceptional user experience across all devices.

## Monorepo Structure

| Repository                                                                                                | Purpose             | Technology       | Live URL                                 |
| --------------------------------------------------------------------------------------------------------- | ------------------- | ---------------- | ---------------------------------------- |
| [MishraShardendu22](https://github.com/MishraShardendu22/MishraShardendu)                                 | Root monorepo       | Turborepo + PNPM | -                                        |
| [PersonalWebsite](https://github.com/MishraShardendu22/MishraShardendu)                                   | Main portfolio site | Next.js 15       | https://mishrashardendu22.is-a.dev       |
| [BlogWebsite](https://github.com/MishraShardendu22/MishraShardendu)                                       | Blog platform       | Svelte 5         | https://mishrashardendu22.is-a.dev/blog  |
| [AdminWebsite](https://github.com/MishraShardendu22/MishraShardendu)                                      | Admin dashboard     | Preact           | https://mishrashardendu22.is-a.dev/admin |
| [Backend-PersonalWebsite](https://github.com/MishraShardendu22/MishraShardendu22-Backend-PersonalWebsite) | Personal site API   | Go/Fiber         | API endpoint                             |
| [Backend-BlogWebsite](https://github.com/MishraShardendu22/MishraShardendu22-Backend-BlogWebsite)         | Blog API            | JS/Node.js       | API endpoint                             |

## Overview

This monorepo contains a complete portfolio platform ecosystem built with cutting-edge technologies. The architecture leverages Turborepo for efficient builds, PNPM workspaces for dependency management, and a modular design with shared packages for maximum code reuse.

### Architecture

- Monorepo Structure: Turborepo + PNPM Workspaces
- Frontend Applications: Next.js 15, Svelte 5, Preact
- Shared Packages: TypeScript, React components, utilities, authentication
- Database Systems: PostgreSQL (Blog), MongoDB (Portfolio)
- Styling: Tailwind CSS 4 + shadcn/ui components
- Type Safety: TypeScript with strict mode

## Project Structure

```
mishrashardendu22/
├── apps/
│   ├── MishraShardendu22-Frontend-PersonalWebsite/  # Next.js 15 - Main portfolio
│   ├── MishraShardendu22-Frontend-BlogWebsite/      # Svelte 5 - Blog system
│   └── MishraShardendu22-Frontend-AdminWebsite/     # Preact - Admin panel
├── packages/
│   ├── shared-ui/          # Shared React components
│   ├── shared-utils/       # Common utilities
│   ├── shared-types/       # TypeScript type definitions
│   ├── auth-shared/        # Authentication logic
│   ├── ui/                 # UI component library
│   └── typescript-config/  # Shared TypeScript configurations
├── public/                 # Shared public assets (icons, manifests)
├── docs/                   # Documentation
├── scripts/                # Build and deployment scripts
└── turbo.json              # Turborepo configuration
```

## Icons & Assets

All applications share a common set of icons and assets located in the root `public/` directory:

- **favicon.ico** - Main favicon (48x48)
- **logo.png** - Primary GopherShardenduMishra logo
- **apple-touch-icon.png** - iOS home screen icon (192x192)
- **manifest.json** - PWA manifest with app shortcuts
- **browserconfig.xml** - Windows tile configuration
- **robots.txt** - Search engine crawler configuration
- **icons/** - Multiple icon sizes (16x16, 32x32, 192x192, 512x512)

Each application maintains its own copy of these assets in their respective `public/` directories, optimized for their specific needs. See `public/README.md` for detailed icon specifications.

## Applications

### Personal Website (Next.js 15)

The main portfolio application showcasing projects, experiences, skills, and certifications. Built with Next.js 15 App Router and React 19.

- Technology Stack:
  - Next.js 15 with Server Components
  - React 19 concurrent features
  - TypeScript 5.8
  - Tailwind CSS 4
  - PostgreSQL with Drizzle ORM
  - Authentication system

- Features:
  - Dynamic project showcase with filtering
  - Professional experience timeline
  - Skills and certifications management
  - Contact form with validation
  - SEO optimized with metadata API
  - PWA support

### Blog Website (Svelte 5)

A high-performance blog platform with markdown support and content management capabilities.

- Technology Stack:
  - Svelte 5 with SSR
  - SvelteKit for routing and server-side rendering
  - Drizzle ORM with PostgreSQL
  - TipTap rich text editor
  - MDX support

- Features:
  - Markdown-based content authoring
  - Rich text editor for content creation
  - Category and tag management
  - Comment system
  - RSS feed generation
  - Full-text search

### Admin Dashboard (Preact)

A lightweight admin interface for managing all platform content.

- Technology Stack:
  - Vite 7 for fast development
  - Preact for minimal bundle size
  - TypeScript
  - Tailwind CSS
  - React Hook Form + Zod

- Features:
  - Content management (CRUD)
  - Project and blog post management
  - User authentication and authorization
  - Analytics dashboard
  - Media management

## Shared Packages

### @repo/eslint-config

Shared ESLint configurations for consistent code quality across all applications.

### @repo/typescript-config

Shared TypeScript configurations for consistent type checking across projects.

## Technology Stack

### Core

| Technology | Version | Purpose               |
| ---------- | ------- | --------------------- |
| Node.js    | 18+     | Runtime environment   |
| PNPM       | 9.0.0   | Package manager       |
| Turborepo  | 2.5.8   | Monorepo build system |
| TypeScript | 5.8     | Type safety           |

### Frontend

| Framework | Version | Application      |
| --------- | ------- | ---------------- |
| Next.js   | 15.5.3  | Personal Website |
| Svelte    | 5.14.4  | Blog Website     |
| Vite      | 7.1.9   | Admin Dashboard  |
| React     | 19.2.0  | UI Library       |
| Preact    | 10.27.2 | Admin Dashboard  |

### Databases & ORMs

| Technology  | Version | Purpose                    |
| ----------- | ------- | -------------------------- |
| PostgreSQL  | 15+     | Blog content storage       |
| MongoDB     | 7.0+    | Portfolio data storage     |
| Drizzle ORM | Latest  | Type-safe database queries |

### Styling & UI

| Technology     | Purpose                |
| -------------- | ---------------------- |
| Tailwind CSS 4 | Utility-first styling  |
| shadcn/ui      | Component library      |
| Radix UI       | Headless UI primitives |
| Lucide React   | Icon library           |

## Getting Started

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
- PNPM >= 9.0.0
- PostgreSQL >= 15 (for database-backed apps)

### Installation

```bash
# Clone the monorepo
git clone https://github.com/MishraShardendu22/MishraShardendu22.git
cd MishraShardendu22

# Install all dependencies
pnpm install

# Set up environment variables
# Copy .env.example to .env.local in each app directory
# Configure database URLs, API endpoints, and authentication secrets
```

### Development

```bash
# Start all applications in development mode
pnpm dev

# Build all applications
pnpm build

# Lint all packages
pnpm lint

# Type check all packages
pnpm typecheck

# Clean build artifacts
pnpm clean
```

### Environment Configuration

Each application requires specific environment variables:

**PersonalWebsite (.env.local):**

```env
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio
NEXTAUTH_SECRET=your-secret-key
API_URL=https://api.mishrashardendu22.is-a.dev
```

**BlogWebsite (.env):**

```env
VITE_API_URL=https://api-blog.mishrashardendu22.is-a.dev
```

**AdminWebsite (.env):**

```env
VITE_API_URL=https://api.mishrashardendu22.is-a.dev
VITE_AUTH_TOKEN=your-admin-token
```

## CI/CD and Deployment

### Turborepo Pipeline

The monorepo uses Turborepo for optimized build caching and parallel execution:

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**", "build/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "typecheck": {}
  }
}
```

### Vercel Deployment

All frontend applications are deployed to Vercel with automatic deployments on push to main:

- **Personal Website**: Deployed from `apps/MishraShardendu22-Frontend-PersonalWebsite`
  - Production: https://mishrashardendu22.is-a.dev/
  - Framework Preset: Next.js
  - Build Command: `cd ../.. && pnpm turbo run build --filter=ms22-main`
  - Output Directory: `.next`

- **Blog Website**: Deployed from `apps/MishraShardendu22-Frontend-BlogWebsite`
  - Production: https://mishrashardendu22.is-a.dev/blog
  - Framework Preset: Vite
  - Build Command: `cd ../.. && pnpm turbo run build --filter=ms22-blog`
  - Output Directory: `dist`

- **Admin Website**: Internal deployment
  - Framework Preset: Vite
  - Build Command: `cd ../.. && pnpm turbo run build --filter=ms22-admin`
  - Output Directory: `dist`

### Environment Variables in Vercel

Add the following environment variables in Vercel project settings for each application:

- `DATABASE_URL` (Personal Website)
- `NEXTAUTH_SECRET` (Personal Website)
- `VITE_API_URL` (Blog and Admin)

## SEO and Accessibility

This monorepo implements comprehensive SEO and accessibility optimizations:

### Technical SEO

- Dynamic sitemap generation at `/sitemap.xml` for all applications
- Robots.txt configuration allowing all crawlers
- Canonical URLs for duplicate content prevention
- Structured data (JSON-LD) for Organization, Person, and content schemas
- OpenGraph and Twitter Card meta tags for social sharing
- Semantic HTML5 elements throughout

### On-Page SEO

- Unique meta descriptions under 160 characters per page
- Optimized title tags with templates
- H1-H6 heading hierarchy
- Alt text for all images
- Internal linking strategy
- Lazy loading for images and media

### Accessibility (WCAG 2.1 AA)

- Semantic HTML structure
- ARIA labels and roles where needed
- Keyboard navigation support
- Focus indicators
- Color contrast ratios meeting standards
- Screen reader compatibility
- Responsive design for mobile accessibility

### Performance

- Core Web Vitals optimization (LCP, FID, CLS)
- Image optimization (WebP, AVIF formats)
- Code splitting and lazy loading
- CDN delivery via Vercel Edge Network
- Service worker for offline support (PWA)

## Contributing

Contributions are welcome. Please follow these guidelines:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

Ensure all tests pass and code follows the existing style guide (ESLint + Prettier).

## License

This project is licensed under the MIT License. See LICENSE file for details.

## Contact

**Shardendu Mishra**

- Website: https://mishrashardendu22.is-a.dev/
- LinkedIn: https://www.linkedin.com/in/shardendumishra22/
- GitHub: https://github.com/MishraShardendu22
- Twitter/X: https://x.com/Shardendu_M
- LeetCode: https://leetcode.com/u/ShardenduMishra22/
- Email: mishrashardendu22@gmail.com

For bug reports and feature requests, please use the GitHub issue tracker in the respective repository.

### Development

```bash
# Start all apps in dev mode
pnpm dev

# Build all apps
pnpm build

# Lint
pnpm lint

# Format
pnpm format

# Type check
pnpm typecheck

# Clean builds and node_modules
pnpm clean
```

### Accessing Applications

| Application      | URL                     | Description    |
| ---------------- | ----------------------- | -------------- |
| Personal Website | `http://localhost:3000` | Main portfolio |
| Blog Website     | `http://localhost:4321` | Blog platform  |
| Admin Dashboard  | `http://localhost:5173` | Admin panel    |

## Environment Configuration

Each app has its own environment configuration. See docs/DEVELOPMENT_GUIDE.md for details.

- Personal Website (.env.local)
  - Database URL (PostgreSQL)
  - Authentication secrets
  - API endpoints
- Blog Website (.env)
  - Database URL (PostgreSQL)
  - API keys
  - Content directory paths
- Admin Dashboard (.env)
  - API base URL
  - Authentication tokens

## Deployment

### Production Build

```bash
# Build all applications for production
pnpm build

# Test production builds locally
pnpm start
```

### Platforms

- Personal Website: Vercel (recommended)
- Blog Website: Vercel or Netlify
- Admin Dashboard: Vercel or Cloudflare Pages

See docs/DEPLOYMENT_GUIDE.md for full instructions.

## Performance

### Build

- Turborepo caching for incremental builds
- PNPM workspace optimization
- Parallel task execution

### Runtime

- Next.js Server Components for optimal loading
- Svelte reactive compilation to minimize JavaScript
- Vite optimized bundling for fast admin dashboard

### Metrics

- Lighthouse: 95+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 2.5s
- Total Bundle Size: optimized per app

## Security

### Authentication

- JWT-based authentication
- Secure session management
- Role-based access control

### Data Protection

- Input validation with Zod schemas
- Parameterized queries (SQL injection prevention)
- Content sanitization (XSS defense)
- SameSite cookies for CSRF mitigation

### Best Practices

- Environment variable encryption
- Secure HTTP headers
- Rate limiting on API endpoints
- Regular dependency updates

## Testing

```bash
# Run all tests
pnpm test

# Coverage
pnpm test:coverage

# End-to-end
pnpm test:e2e
```

## Documentation

- docs/API_DOCS.md
- docs/DEVELOPMENT_GUIDE.md
- docs/CONTRIBUTING.md
- docs/CODE_OF_CONDUCT.md
- docs/SECURITY.md
- docs/POSTMAN.md

## Contributing

We welcome contributions. Please read docs/CONTRIBUTING.md before submitting pull requests.

### Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m "feat: add AmazingFeature"`
4. Push the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

### Standards

- TypeScript strict mode
- ESLint + Prettier
- Tests with 80%+ coverage
- Conventional commits
- Updated documentation

## License

MIT. See LICENSE for details.

## Author

Shardendu Mishra  
Software Engineer | Software Engineer  
Email: mishrashardendu22@gmail.com

## Acknowledgments

Built with Next.js, Svelte, React, TypeScript, Tailwind CSS, Turborepo, PostgreSQL, Drizzle, and more.

Last Updated: October 2025 - Version 3.0.0 - Monorepo Architecture

### docs/DEVELOPMENT_GUIDE.md

# Development Guide

## Prerequisites

- Node.js 18+
- PNPM 9.x
- PostgreSQL 15+
- MongoDB 7.0+ (optional; used for portfolio data)
- Git

## Workspace Setup

```bash
pnpm install
pnpm build # optional warm cache
```

### Node and PNPM

- Use a consistent Node version across all apps.
- Recommended: set an `.nvmrc` with `18` or define `engines` in package.json.

## Environment Variables

Create per-app environment files based on provided examples:

- apps/MishraShardendu22-Frontend-PersonalWebsite/.env.local
- apps/MishraShardendu22-Frontend-BlogWebsite/.env
- apps/MishraShardendu22-Frontend-AdminWebsite/.env

### Personal Website

- POSTGRES_URL
- AUTH_SECRET
- AUTH_JWT_SECRET
- NEXT_PUBLIC_BASE_URL

### Blog Website

- POSTGRES_URL
- CONTENT_DIR
- NEXT_PUBLIC_SITE_URL

### Admin Dashboard

- VITE_API_BASE_URL
- VITE_AUTH_TOKEN

Store secrets securely. Do not commit environment files.

## Databases

### PostgreSQL

- Create databases for personal website and blog.
- Run migrations via Drizzle:

```bash
# Personal Website
cd apps/MishraShardendu22-Frontend-PersonalWebsite
pnpm db:push

# Blog Website
cd ../MishraShardendu22-Frontend-BlogWebsite
pnpm db:push

cd ../../
```

### MongoDB (optional)

- Create a database for portfolio data if enabled.
- Expose connection via environment variable as needed by the app.

## Local Development

```bash
pnpm dev
```

Access apps:

- Personal Website: `http://localhost:3000`
- Blog Website: `http://localhost:4321`
- Admin Dashboard: `http://localhost:5173`

## Turborepo Pipelines

Common tasks are defined at the root.

- `pnpm dev`: runs all app dev servers in parallel
- `pnpm build`: builds all packages and apps with caching
- `pnpm typecheck`: runs TypeScript across workspace
- `pnpm lint` / `pnpm format`: code quality

Use `--filter` to scope tasks:

```bash
pnpm --filter @apps/personal dev
pnpm --filter @apps/blog build
```

## Coding Standards

- TypeScript strict mode enabled
- ESLint with recommended + TypeScript rules
- Prettier for formatting
- Absolute imports via TS path aliases in shared types/config

## Commits and Branching

- Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`
- Branching: `feature/*`, `fix/*`, `chore/*`
- Keep PRs small and focused

## Testing

- Unit tests for utils and components
- Integration tests for APIs
- E2E tests for critical flows

Commands:

```bash
pnpm test
pnpm test:coverage
pnpm test:e2e
```

## Debugging

- Next.js and Vite support Node inspector: `--inspect`
- Use React DevTools and network panels
- For database: enable query logging in Drizzle during local dev

## Common Issues

- Port conflicts: update `.env` or dev scripts
- Missing env vars: ensure all required variables are set
- Migrations fail: verify database connectivity and permissions
- Cache issues: `pnpm clean && rm -rf node_modules/.cache`

### docs/DEPLOYMENT_GUIDE.md

# Deployment Guide

## Build Artifacts

```bash
pnpm build
pnpm start # optional local preview if configured
```

Each app produces a build:

- Personal Website (Next.js): `.next/` output; use output: standalone if configured.
- Blog Website (Svelte): `dist/` for static or SSR build output.
- Admin Dashboard (Vite): `dist/` static assets.

## Environment for Production

Set production environment variables for each app, mirroring development but with production credentials and URLs.

### Personal Website

- POSTGRES_URL (managed instance)
- AUTH_SECRET, AUTH_JWT_SECRET (rotate periodically)
- NEXT_PUBLIC_BASE_URL (public site URL)

### Blog Website

- POSTGRES_URL
- NEXT_PUBLIC_SITE_URL
- CONTENT_DIR or use database/file storage accordingly

### Admin Dashboard

- VITE_API_BASE_URL (points to production API)
- VITE_AUTH_TOKEN or use proper auth flow

## Platforms

- Personal Website: Vercel recommended for Next.js.
- Blog Website: Vercel or Netlify.
- Admin Dashboard: Vercel or Cloudflare Pages.

Ensure proper SSR/edge runtimes if used.

## Static Assets and Caching

- Set long-term caching headers for static assets in `dist/`.
- Use hashed filenames from Vite/Svelte builds.
- For Next.js, leverage image optimization and headers via configuration.

## Database Migrations

Run migrations during deployment:

```bash
# From app directory
pnpm db:push
```

Consider using a migration step in CI/CD before switching traffic.

## CI/CD

Example GitHub Actions workflow (simplified):

```yaml
name: ci
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck
      - run: pnpm lint
      - run: pnpm build
```

Add deployment jobs per platform and app.

## Observability

- Enable runtime logs for SSR.
- Collect web vitals (LCP, CLS, FID).
- Monitor error rates for client and server.
- Track DB performance and slow queries.

## Rollbacks

- Keep previous build artifacts available.
- Database: avoid destructive migrations without backups.
- Use feature flags to disable risky features.

### docs/API_DOCS.md

# API Documentation

This document outlines API routes used by the platform. Adjust paths as needed per deployment.

## Conventions

- RESTful endpoints
- JSON request/response
- Authentication: Bearer JWT for protected routes
- Content-Type: `application/json`

## Authentication

### POST /api/auth/login

- Body:

```json
{
  "email": "user@example.com",
  "password": "string"
}
```

- Response 200:

```json
{
  "token": "jwt",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "admin"
  }
}
```

- Errors: 400, 401

### POST /api/auth/logout

- Header: `Authorization: Bearer <token>`
- Response 204

## Projects

### GET /api/projects

- Query:
  - `tag` (optional)
  - `limit`, `offset` (optional)

- Response 200:

```json
{
  "items": [
    {
      "id": "uuid",
      "title": "string",
      "tags": ["go", "react"],
      "description": "string",
      "url": "string",
      "createdAt": "2025-10-01T00:00:00.000Z"
    }
  ],
  "total": 42
}
```

### POST /api/projects

- Header: `Authorization: Bearer <token>`
- Body:

```json
{
  "title": "string",
  "description": "string",
  "tags": ["string"],
  "url": "string"
}
```

- Response 201:

```json
{ "id": "uuid" }
```

## Blog Posts

### GET /api/posts

- Query:
  - `q` full-text search
  - `tag`, `category`
  - `limit`, `offset`

- Response 200:

```json
{
  "items": [
    {
      "id": "uuid",
      "slug": "my-first-post",
      "title": "string",
      "excerpt": "string",
      "tags": ["svelte", "nextjs"],
      "publishedAt": "2025-10-01T00:00:00.000Z"
    }
  ],
  "total": 123
}
```

### GET /api/posts/:slug

- Response 200:

```json
{
  "id": "uuid",
  "slug": "my-first-post",
  "title": "string",
  "content": "markdown or html",
  "tags": ["string"],
  "publishedAt": "2025-10-01T00:00:00.000Z"
}
```

### POST /api/posts

- Header: `Authorization: Bearer <token>`
- Body:

```json
{
  "title": "string",
  "slug": "kebab-case",
  "content": "markdown or html",
  "tags": ["string"],
  "publishedAt": "2025-10-01T00:00:00.000Z"
}
```

- Response 201:

```json
{ "id": "uuid" }
```

## Comments

### GET /api/posts/:slug/comments

- Response 200:

```json
[
  {
    "id": "uuid",
    "author": "string",
    "message": "string",
    "createdAt": "2025-10-01T00:00:00.000Z"
  }
]
```

### POST /api/posts/:slug/comments

- Body:

```json
{
  "author": "string",
  "message": "string"
}
```

- Response 201:

```json
{ "id": "uuid" }
```

## Admin Metrics

### GET /api/admin/metrics

- Header: `Authorization: Bearer <token>`
- Response 200:

```json
{
  "users": 1200,
  "projects": 25,
  "posts": 80,
  "comments": 460
}
```

### docs/CONTRIBUTING.md

# Contributing Guidelines

## Getting Started

- Read docs/DEVELOPMENT_GUIDE.md.
- Install dependencies with PNPM.
- Configure environment variables per app.

## Issues

- Provide a clear description, steps to reproduce, expected vs actual behavior.
- Include logs, screenshots, or stack traces if relevant.

## Pull Requests

- Fork and create a feature branch: `feature/<short-description>`.
- Write tests for new behavior.
- Ensure `pnpm typecheck && pnpm lint && pnpm test` pass.
- Update documentation when behavior changes.
- Keep PRs focused and under 400 lines where possible.

## Code Style

- TypeScript strict mode
- ESLint + Prettier
- Prefer functional components and hooks
- No unused exports; keep public APIs explicit in shared packages

## Commit Messages

- Use Conventional Commits, e.g.:
  - `feat: add analytics panel`
  - `fix: correct drizzle migration path`
  - `docs: update deployment guide`
  - `refactor: extract table component`
  - `test: add e2e for auth flow`

## Review Process

- At least one approval required.
- Address review comments promptly.
- Squash commits when merging.

### docs/CODE_OF_CONDUCT.md

# Code of Conduct

## Our Pledge

We pledge to make participation a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity, level of experience, nationality, personal appearance, race, religion, or sexual identity.

## Our Standards

- Use welcoming and inclusive language.
- Be respectful of differing viewpoints and experiences.
- Accept constructive criticism gracefully.
- Focus on what is best for the community.
- Show empathy towards other community members.

Unacceptable behavior includes harassment, trolling, insults, or other conduct that could reasonably be considered inappropriate.

## Responsibilities

Project maintainers are responsible for clarifying standards and taking corrective action in response to unacceptable behavior.

## Scope

This Code of Conduct applies within project spaces and in public spaces when representing the project.

## Enforcement

Report issues to the maintainer at mishrashardendu22@gmail.com. All complaints will be reviewed and investigated, resulting in a response deemed necessary and appropriate to the circumstances.

### docs/SECURITY.md

# Security Policy

## Supported Versions

Security fixes are applied to the latest major version.

## Reporting a Vulnerability

- Email: mishrashardendu22@gmail.com
- Provide steps to reproduce, impact assessment, and any mitigations tried.
- You will receive an acknowledgment within 72 hours.

## Disclosure Policy

- We aim to fix confirmed vulnerabilities promptly.
- Please do not publicly disclose until a fix is released.
- Credit will be given upon request.

## Hardening Checklist

- Rotate secrets regularly.
- Enforce HTTPS and secure cookies.
- Validate all inputs with Zod and sanitize outputs.
- Use parameterized queries in Drizzle.
- Apply rate limiting to sensitive endpoints.
- Keep dependencies updated.

### docs/POSTMAN.md

# Postman Collection

## Overview

A Postman collection is provided to test API endpoints for projects, posts, comments, auth, and admin metrics.

## Files

- docs/postman/portfolio-collection.json
- docs/postman/environments/local.json
- docs/postman/environments/production.json

## Setup

1. Import the collection and environment files into Postman.
2. Select the appropriate environment.
3. Set variables:
   - `baseUrl`: `http://localhost:3000` or your deployment URL
   - `authToken`: a valid JWT for protected routes

## Usage

- Run the "Auth" folder first to obtain a token.
- Use "Projects" and "Posts" folders for CRUD flows.
- Use "Admin" folder to verify metrics endpoints.
- Enable tests and view assertions in the Postman Tests tab.

### docs/API_EXAMPLES.md

# API Examples

## cURL

```bash
# List posts
curl -s GET http://localhost:3000/api/posts

# Create post (requires auth)
curl -s -X POST http://localhost:3000/api/posts \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello","slug":"hello","content":"Hi","tags":["intro"]}'
```

## JavaScript (fetch)

```js
async function listPosts() {
  const res = await fetch('/api/posts')
  return res.json()
}
```
