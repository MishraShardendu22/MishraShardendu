# Admin Dashboard - Vite + Preact Application

Lightweight, high-performance admin interface for managing portfolio platform content. Built with Vite and Preact for optimal bundle size and development experience.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Development](#development)
- [Admin Features](#admin-features)
- [API Integration](#api-integration)
- [Authentication & Authorization](#authentication--authorization)
- [State Management](#state-management)
- [Form Management](#form-management)
- [Deployment](#deployment)
- [Performance](#performance)
- [Security](#security)
- [Testing](#testing)
- [Contributing](#contributing)

## Overview

The Admin Dashboard provides a comprehensive interface for managing all aspects of the portfolio platform. Built with Preact for minimal bundle size and maximum performance, it offers full CRUD operations for projects, blog posts, experiences, and other content types.

**Key Characteristics**:

- Minimal bundle size with Preact (3KB alternative to React)
- Fast development with Vite's HMR
- Type-safe with TypeScript
- Real-time content preview
- Responsive design for mobile administration
- Secure authentication and authorization

## Technology Stack

### Core Framework

- **Vite 7.1.9**: Next-generation frontend tooling with lightning-fast HMR
- **Preact 10.27.2**: Fast 3KB alternative to React with same API
- **TypeScript 5.8**: Static type checking and enhanced IDE support

### Routing & Navigation

- **Preact Router**: Declarative routing for single-page application
- **History API**: Browser history management

### Styling & UI

- **Tailwind CSS 4**: Utility-first CSS framework
- **HeadlessUI**: Unstyled, accessible UI components adapted for Preact
- **Lucide Preact**: Icon library optimized for Preact
- **clsx**: Utility for conditional class names

### Form Management

- **React Hook Form**: Performant form library (works with Preact)
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Validation integration

### Rich Text Editing

- **TipTap**: Extensible rich text editor
- **ProseMirror**: Foundation for TipTap editor
- **Extensions**: Tables, code blocks, images, mentions

### HTTP Client

- **Axios**: Promise-based HTTP client
- **Interceptors**: Request/response middleware
- **Error Handling**: Centralized error management

### Additional Libraries

- **date-fns**: Modern date utility library
- **React Hot Toast**: Beautiful notifications
- **Chart.js**: Data visualization for analytics
- **React Dropzone**: File upload handling

## Features

### Content Management

**Projects**:

- Create, read, update, delete (CRUD) operations
- Rich media upload and management
- Technology stack tagging
- GitHub repository integration
- Display order management
- Featured project selection

**Blog Posts**:

- Full-featured rich text editor
- Markdown export/import
- Category and tag management
- Draft/published status
- SEO metadata editing
- Scheduled publishing

**Experiences**:

- Work history management
- Achievement tracking
- Technology association
- Date range handling
- Current position indicator

**Certifications**:

- Credential management
- Issuer information
- Validation links
- Expiration tracking
- Skills association

### User Management

**Authentication**:

- Secure login/logout
- Session management
- Remember me functionality
- Password reset flow

**Authorization**:

- Role-based access control
- Permission management
- Admin/editor/viewer roles
- Resource-level permissions

### Analytics Dashboard

**Metrics**:

- Page views and unique visitors
- Content performance analytics
- User engagement metrics
- Traffic sources
- Geographic distribution

**Visualizations**:

- Line charts for trends
- Bar charts for comparisons
- Pie charts for distributions
- Real-time statistics

### Media Management

**Features**:

- Drag-and-drop file upload
- Image optimization
- File organization
- URL generation
- Delete and replace
- Preview functionality

### System Administration

**Settings**:

- Site configuration
- API key management
- Feature flags
- Maintenance mode
- Cache control

**Monitoring**:

- Error tracking
- Performance metrics
- API health checks
- Database status

## Architecture

### Directory Structure

```
src/
├── app.tsx                       # Root application component
├── main.tsx                      # Application entry point
├── index.css                     # Global styles
├── components/                   # Reusable components
│   ├── layout/                   # Layout components
│   │   ├── AdminLayout.tsx       # Main admin layout
│   │   ├── Header.tsx            # Header with navigation
│   │   ├── Sidebar.tsx           # Collapsible sidebar
│   │   └── Footer.tsx            # Footer component
│   ├── ui/                       # UI components
│   │   ├── Button.tsx            # Button variations
│   │   ├── Input.tsx             # Form inputs
│   │   ├── Modal.tsx             # Modal dialogs
│   │   ├── Table.tsx             # Data tables
│   │   ├── Card.tsx              # Card containers
│   │   └── Badge.tsx             # Status badges
│   ├── forms/                    # Form components
│   │   ├── ProjectForm.tsx       # Project creation/edit
│   │   ├── BlogForm.tsx          # Blog post form
│   │   ├── ExperienceForm.tsx    # Experience form
│   │   └── CertificationForm.tsx # Certification form
│   ├── editor/                   # Rich text editor
│   │   ├── TipTapEditor.tsx      # Main editor component
│   │   ├── Toolbar.tsx           # Editor toolbar
│   │   └── extensions/           # Custom extensions
│   └── charts/                   # Analytics charts
│       ├── LineChart.tsx         # Time series data
│       ├── BarChart.tsx          # Comparison data
│       └── PieChart.tsx          # Distribution data
├── pages/                        # Application pages
│   ├── Login.tsx                 # Login page
│   ├── Dashboard.tsx             # Main dashboard
│   ├── projects/                 # Project management
│   │   ├── ProjectList.tsx       # Projects listing
│   │   ├── ProjectCreate.tsx     # Create project
│   │   └── ProjectEdit.tsx       # Edit project
│   ├── blog/                     # Blog management
│   │   ├── BlogList.tsx          # Posts listing
│   │   ├── BlogCreate.tsx        # Create post
│   │   └── BlogEdit.tsx          # Edit post
│   ├── experiences/              # Experience management
│   ├── certifications/           # Certification management
│   ├── media/                    # Media library
│   ├── analytics/                # Analytics dashboard
│   └── settings/                 # System settings
├── hooks/                        # Custom hooks
│   ├── useAuth.ts                # Authentication hook
│   ├── useApi.ts                 # API calls hook
│   ├── useForm.ts                # Form handling hook
│   ├── useDebounce.ts            # Debounce hook
│   └── useLocalStorage.ts        # Local storage hook
├── lib/                          # Utilities and configuration
│   ├── api.ts                    # API client setup
│   ├── auth.ts                   # Auth utilities
│   ├── validators.ts             # Zod schemas
│   └── utils.ts                  # Helper functions
├── types/                        # TypeScript types
│   ├── api.ts                    # API types
│   ├── models.ts                 # Data models
│   └── forms.ts                  # Form types
└── utils/                        # Utility functions
    ├── format.ts                 # Formatting helpers
    ├── date.ts                   # Date utilities
    └── validation.ts             # Validation helpers

public/                           # Static assets
├── icons/                        # Icon files
└── favicon.ico                   # Favicon
```

### Component Architecture

**Container/Presentational Pattern**:

- Container components handle logic and state
- Presentational components focus on UI
- Promotes reusability and testability

**Composition**:

- Small, focused components
- Compose complex UIs from simple parts
- Prop-based communication

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- PNPM >= 9.0.0
- Access to backend API
- Admin credentials

### Installation

```bash
# Navigate to admin directory
cd apps/MishraShardendu22-Frontend-AdminWebsite

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env

# Configure API endpoints in .env
# (See Environment Configuration)

# Start development server
pnpm dev
```

Access dashboard at `http://localhost:5173`

## Environment Configuration

Create a `.env` file with the following variables:

### API Configuration

```env
# Backend API base URL
VITE_API_BASE_URL="http://localhost:5000/api"

# API timeout (milliseconds)
VITE_API_TIMEOUT="30000"

# Enable API request logging
VITE_API_DEBUG="true"
```

### Authentication

```env
# Auth token storage key
VITE_AUTH_TOKEN_KEY="admin_auth_token"

# Session timeout (seconds)
VITE_SESSION_TIMEOUT="3600"

# Remember me duration (days)
VITE_REMEMBER_ME_DAYS="7"
```

### Application

```env
# Application name
VITE_APP_NAME="Portfolio Admin"

# Application version
VITE_APP_VERSION="2.10.0"

# Environment (development/staging/production)
VITE_ENV="development"
```

### Features

```env
# Enable analytics dashboard
VITE_ENABLE_ANALYTICS="true"

# Enable media library
VITE_ENABLE_MEDIA="true"

# Enable draft mode
VITE_ENABLE_DRAFTS="true"

# Items per page
VITE_ITEMS_PER_PAGE="20"
```

### External Services

```env
# Image upload service
VITE_UPLOAD_URL="https://api.cloudinary.com/v1_1/upload"

# CDN base URL
VITE_CDN_URL="https://cdn.yourdomain.com"
```

## Development

### Available Scripts

```bash
# Development
pnpm dev              # Start dev server (port 5173)
pnpm build            # Production build
pnpm preview          # Preview production build

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues
pnpm format           # Format with Prettier
pnpm typecheck        # TypeScript checking

# Testing
pnpm test             # Run unit tests
pnpm test:watch       # Watch mode
pnpm test:coverage    # Coverage report
pnpm test:e2e         # E2E tests

# Bundle Analysis
pnpm analyze          # Analyze bundle size
```

### Development Workflow

1. **Feature Development**:

   ```bash
   # Create feature branch
   git checkout -b feature/new-admin-feature

   # Develop with hot reload
   pnpm dev

   # Run tests
   pnpm test

   # Build and verify
   pnpm build && pnpm preview
   ```

2. **Component Development**:

   ```typescript
   // Create new component
   // src/components/ui/NewComponent.tsx

   import { h } from 'preact'
   import type { ComponentProps } from './types'

   export function NewComponent(props: ComponentProps) {
     return (
       <div className="component">
         {/* Implementation */}
       </div>
     )
   }
   ```

3. **Adding New Pages**:

   ```typescript
   // Add route in app.tsx
   import { Route } from 'preact-router'
   import NewPage from './pages/NewPage'

   <Route path="/admin/new-page" component={NewPage} />
   ```

## Admin Features

### Projects Management

**List View**:

- Paginated project list
- Search and filter
- Sort by various fields
- Quick actions (edit, delete, toggle featured)
- Bulk operations

**Create/Edit**:

```typescript
interface ProjectFormData {
  title: string
  description: string
  longDescription?: string
  technologies: string[]
  category: string
  demoUrl?: string
  repositoryUrl?: string
  imageUrl?: string
  featured: boolean
  status: 'active' | 'archived' | 'in-development'
}
```

**Features**:

- Rich text description editor
- Technology multi-select
- Image upload with preview
- GitHub integration for auto-fill
- Display order management

### Blog Management

**Editor Features**:

- TipTap WYSIWYG editor
- Markdown support
- Code block with syntax highlighting
- Image insertion
- Link management
- Table support

**Publishing Options**:

- Draft/Published status
- Schedule publishing
- SEO metadata
- Category selection
- Tag management

**Preview**:

- Live preview while editing
- Mobile/desktop preview
- SEO preview

### Analytics Dashboard

**Metrics Displayed**:

```typescript
interface AnalyticsMetrics {
  pageViews: {
    total: number
    trend: number // percentage change
    chart: TimeSeriesData[]
  }
  uniqueVisitors: {
    total: number
    trend: number
    chart: TimeSeriesData[]
  }
  topPosts: Array<{
    id: string
    title: string
    views: number
    engagement: number
  }>
  trafficSources: Array<{
    source: string
    percentage: number
    visitors: number
  }>
}
```

**Visualizations**:

- 7/30/90 day views
- Content performance
- User engagement
- Geographic data

### Media Library

**Features**:

- Drag-and-drop upload
- Multiple file upload
- Image preview
- File organization
- Search and filter
- Copy URL functionality

**Supported Formats**:

- Images: JPG, PNG, WebP, SVG
- Documents: PDF
- Maximum size: 10MB per file

## API Integration

### API Client Setup

```typescript
// lib/api.ts
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT),
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

### API Methods

```typescript
// Projects API
export const projectsApi = {
  list: (params) => api.get('/projects', { params }),
  get: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
  updateOrder: (data) => api.patch('/projects/order', data),
}

// Blog API
export const blogsAPI = {
  // Get all blogs with pagination and filters
  getAllBlogs: (page = 1, limit = 10, options = {}) =>
    api.get('/blogs', { params: { page, limit, ...options } }),

  // Get single blog by ID
  getBlogById: (id) => api.get(`/blogs/${id}`),

  // Create new blog (owner only)
  createBlog: (data) => api.post('/blogs', data),

  // Update blog (owner only)
  updateBlog: (id, data) => api.put(`/blogs/${id}`, data),

  // Partially update blog (owner only)
  patchBlog: (id, data) => api.patch(`/blogs/${id}`, data),

  // Delete blog (owner only)
  deleteBlog: (id) => api.delete(`/blogs/${id}`),

  // Get blog statistics
  getBlogStats: () => api.get('/blogs/stats'),

  // Get reorder list (owner only)
  getReorderList: () => api.get('/blogs/reorder'),

  // Update blog order (owner only)
  updateReorder: (payload) => api.post('/blogs/reorder', payload),
}

// Comments API
export const commentsAPI = {
  // Get all comments for a blog with pagination
  getCommentsByBlogId: (blogId, page = 1, limit = 10) =>
    api.get(`/blogs/${blogId}/comments`, { params: { page, limit } }),

  // Create new comment (authenticated users only)
  createComment: (blogId, data) => api.post(`/blogs/${blogId}/comments`, data),

  // Delete comment (comment author or blog owner only)
  deleteComment: (blogId, commentId) => api.delete(`/blogs/${blogId}/comments/${commentId}`),
}
```

**Pagination Response Format**:

```typescript
interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
```

**Example Usage**:

```typescript
// Fetch blogs with pagination
const fetchBlogs = async () => {
  const response = await blogsAPI.getAllBlogs(1, 10, {
    search: 'react',
    tag: 'javascript',
  })
  const { data, pagination } = response.data
  console.log(`Showing ${data.length} of ${pagination.total} blogs`)
}

// Fetch comments with pagination
const fetchComments = async (blogId) => {
  const response = await commentsAPI.getCommentsByBlogId(blogId, 1, 10)
  const { data, pagination } = response.data
  console.log(`Page ${pagination.page} of ${pagination.totalPages}`)
}
```

## Authentication & Authorization

### Authentication Flow

```typescript
// hooks/useAuth.ts
export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    const { token, user } = response.data

    localStorage.setItem('admin_auth_token', token)
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem('admin_auth_token')
    setUser(null)
    window.location.href = '/login'
  }

  const checkAuth = async () => {
    const token = localStorage.getItem('admin_auth_token')
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const response = await api.get('/auth/me')
      setUser(response.data)
    } catch (error) {
      logout()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return { user, loading, login, logout }
}
```

### Protected Routes

```typescript
// components/ProtectedRoute.tsx
export function ProtectedRoute({ component: Component, ...rest }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return <Redirect to="/login" />
  }

  return <Component {...rest} />
}
```

### Role-Based Access

```typescript
// utils/permissions.ts
export function hasPermission(user, resource, action) {
  const permissions = {
    admin: ['*'],
    editor: ['projects:*', 'blogs:*', 'media:read'],
    viewer: ['projects:read', 'blogs:read'],
  }

  const userPermissions = permissions[user.role] || []

  return (
    userPermissions.includes('*') ||
    userPermissions.includes(`${resource}:*`) ||
    userPermissions.includes(`${resource}:${action}`)
  )
}
```

## State Management

### Local State with Hooks

```typescript
// Component-level state
const [projects, setProjects] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
```

### Context for Global State

```typescript
// contexts/AppContext.tsx
const AppContext = createContext()

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('light')

  return (
    <AppContext.Provider value={{ user, setUser, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
```

## Form Management

### React Hook Form with Zod

```typescript
// Form validation schema
const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description too short'),
  technologies: z.array(z.string()).min(1, 'Select at least one'),
  demoUrl: z.string().url().optional(),
  repositoryUrl: z.string().url().optional()
})

// Form component
export function ProjectForm({ initialData, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Title"
        {...register('title')}
        error={errors.title?.message}
      />
      {/* Other fields */}
      <Button type="submit" loading={isSubmitting}>
        Save Project
      </Button>
    </form>
  )
}
```

## Deployment

### Production Build

```bash
# Build for production
pnpm build

# Output in dist/ directory
# Ready for static hosting
```

### Vercel Deployment

```bash
# Install Vercel CLI
pnpm install -g vercel

# Deploy
vercel --prod
```

### Build Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

export default defineConfig({
  plugins: [preact()],
  build: {
    target: 'es2015',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['preact', 'preact/hooks'],
          editor: ['@tiptap/core', '@tiptap/react'],
        },
      },
    },
  },
})
```

## Performance

### Bundle Size

**Targets**:

- Initial bundle: < 50KB (gzipped)
- Vendor chunks: < 100KB (gzipped)
- Total size: < 200KB (gzipped)

**Optimizations**:

- Preact instead of React (saves ~30KB)
- Code splitting by route
- Dynamic imports for heavy components
- Tree shaking unused code

### Load Time

**Metrics**:

- Time to Interactive: < 2s
- First Contentful Paint: < 1s
- Lighthouse Score: 90+

### Lazy Loading

```typescript
// Lazy load heavy components
const AnalyticsDashboard = lazy(() =>
  import('./pages/analytics/Dashboard')
)

<Suspense fallback={<Loading />}>
  <AnalyticsDashboard />
</Suspense>
```

## Security

### Best Practices

1. **Authentication**:
   - Secure token storage
   - Token expiration handling
   - Automatic logout on inactivity

2. **Authorization**:
   - Role-based access control
   - Permission checking
   - Resource-level permissions

3. **Data Validation**:
   - Client-side validation with Zod
   - Server-side validation
   - Sanitize user input

4. **XSS Prevention**:
   - Escape user content
   - Content Security Policy
   - Sanitize HTML in editor

5. **CSRF Protection**:
   - CSRF tokens
   - SameSite cookies
   - Origin verification

## Testing

### Unit Tests

```bash
# Run tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage
```

### E2E Tests

```bash
# Run E2E tests
pnpm test:e2e
```

### Testing Stack

- **Vitest**: Fast unit testing
- **Testing Library**: Component testing
- **Playwright**: E2E testing
- **MSW**: API mocking

## Contributing

See [CONTRIBUTING.md](../../docs/CONTRIBUTING.md) for guidelines.

### Quick Guidelines

1. Follow Preact conventions
2. Write tests for new features
3. Use TypeScript strictly
4. Document components
5. Optimize bundle size

## Support

For support:

- **Issues**: [GitHub Issues](https://github.com/MishraShardendu22/MishraShardendu/issues)
- **Docs**: [Root Docs](../../docs)
- **Email**: mishrashardendu22@gmail.com

## License

Part of MishraShardendu monorepo. MIT Licensed.
