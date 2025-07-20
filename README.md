# 🚀 Shardendu Mishra - Professional Portfolio & Blog Platform

> **Enterprise-grade full-stack web platform** built with Next.js 15 & Go Fiber  
> Advanced content management • Dual-database architecture • AI-powered features

<div align="center">
  <img src="https://raw.githubusercontent.com/ShardenduMishra22/MishraShardendu22/refs/heads/main/GopherMishra.png" alt="Shardendu Avatar" width="200" />
  
  <h3>A modern, full-stack portfolio website built with Next.js 15</h3>
  <p><em>Featuring a blog system, admin panel, and dual backend architecture with load balancing</em></p>

  [![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-blue?style=for-the-badge)](https://mishrashardendu22.is-a.dev)
  [![Frontend Repo](https://img.shields.io/badge/📱_Frontend-View_Repo-green?style=for-the-badge)](https://github.com/ShardenduMishra22/MishraShardendu22)
  [![Backend Repo](https://img.shields.io/badge/⚙️_Backend-View_Repo-orange?style=for-the-badge)](https://github.com/ShardenduMishra22/MishraShardendu22-Updation)
</div>

<div align="center">

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-4285f4?style=for-the-badge&logo=google-chrome)](https://mishrashardendu22.is-a.dev)
[![Frontend Repo](https://img.shields.io/badge/📱_Frontend-Next.js_15-black?style=for-the-badge&logo=next.js)](https://github.com/ShardenduMishra22/MishraShardendu22)
[![Backend Repo](https://img.shields.io/badge/⚡_Backend-Go_Fiber-00ADD8?style=for-the-badge&logo=go)](https://github.com/ShardenduMishra22/MishraShardendu22-Updation)

![Version](https://img.shields.io/badge/version-2.0-brightgreen?style=flat-square)
![Status](https://img.shields.io/badge/status-production-success?style=flat-square)
![Uptime](https://img.shields.io/badge/uptime-99.9%25-success?style=flat-square)

</div>

---

## 🎯 Project Overview

This is a modern, scalable professional platform that combines a **portfolio showcase** and **content management system** using cutting-edge technologies. The architecture leverages a dual-database approach with specialized backends for optimal performance and maintainability.

### 🏗️ Architecture Highlights

- **🎨 Frontend**: Next.js 15 with React 19 & TypeScript for type-safe development
- **⚡ Backend**: Go Fiber microservice for high-performance API operations
- **🗄️ Dual Database**: PostgreSQL for blog content + MongoDB for portfolio data
- **🔐 Security**: JWT authentication with role-based access control
- **📊 Analytics**: Real-time metrics with Recharts visualizations
- **🤖 AI Integration**: OpenAI-powered content enhancement features

---

## 🛠️ Technology Stack

### Frontend Architecture (Next.js Ecosystem)

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql)
![Drizzle](https://img.shields.io/badge/Drizzle_ORM-Latest-C5F74F?style=for-the-badge)

</div>

**Core Technologies**
- **Framework**: Next.js 15 with App Router and Server Components
- **Language**: TypeScript for type-safe development
- **UI Library**: React 19 with concurrent features
- **Styling**: Tailwind CSS 4 + shadcn/ui premium components
- **Database**: PostgreSQL 15 with Drizzle ORM for type-safe operations
- **Content**: TipTap rich editor + ReactMarkdown rendering
- **Charts**: Recharts for beautiful data visualizations

**Key Libraries**
```typescript
// UI & Styling
@shadcn/ui              // Premium component library
tailwindcss             // Utility-first CSS framework
lucide-react            // Beautiful icon system

// Database & ORM
drizzle-orm             // Type-safe PostgreSQL ORM
pg                      // PostgreSQL client

// Content Management
@tiptap/react           // Rich text editor
react-markdown          // Markdown rendering
@tiptap/starter-kit     // Essential editor extensions

// State & Forms
zustand                 // Lightweight state management
react-hook-form         // Form management with validation
zod                     // Schema validation
```

### Backend Architecture (Go Microservice)

<div align="center">

![Go](https://img.shields.io/badge/Go-1.21-00ADD8?style=for-the-badge&logo=go)
![Fiber](https://img.shields.io/badge/Fiber-2.0-00ADD8?style=for-the-badge&logo=go)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb)
![Redis](https://img.shields.io/badge/Redis-7-DC382D?style=for-the-badge&logo=redis)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=json-web-tokens)

</div>

**Core Technologies**
- **Language**: Go 1.21+ for high-performance, concurrent operations
- **Framework**: GoFiber - Express.js-inspired with optimized speed
- **Database**: MongoDB 7.0+ for flexible portfolio document storage
- **ODM**: MGM (MongoDB Model for Go) for simplified interactions
- **Authentication**: JWT with secure, stateless token management
- **Cache**: Redis for high-performance data caching

**Dependencies**
```go
// Core Framework & Database
github.com/gofiber/fiber/v2     // High-performance web framework
go.mongodb.org/mongo-driver     // Official MongoDB driver
github.com/kamva/mgm            // MongoDB ODM for Go

// Security & Auth
github.com/golang-jwt/jwt       // JWT implementation
golang.org/x/crypto             // Cryptography for password hashing

// Configuration
github.com/joho/godotenv        // Environment variable management
```

---

## 🏛️ Dual Database Architecture

```mermaid
graph TB
    A[👤 Client Browser] --> B[📱 Next.js Frontend]
    B --> C[🔄 Next.js API Routes]
    B --> D[⚡ Go Fiber Backend]
    
    C --> E[🐘 PostgreSQL<br/>Blog System]
    C --> F[🔧 Drizzle ORM]
    
    D --> G[🍃 MongoDB<br/>Portfolio Data]
    D --> H[📊 MGM ODM]
    
    I[⚡ Redis Cache] --> C
    I --> D
    
    J[🔗 External APIs<br/>GitHub • LeetCode] --> D
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style C fill:#fff3e0
    style D fill:#e8f5e8
    style E fill:#e3f2fd
    style G fill:#f1f8e9
    style I fill:#ffebee
```

### 🐘 PostgreSQL + Drizzle ORM
**Purpose**: Blog System & Content Management

```typescript
// Type-safe blog schema with comprehensive relationships
export const blogs = pgTable('blogs', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  authorId: integer('author_id').references(() => users.id),
  categories: text('categories').array(),
  tags: text('tags').array(),
  status: blogStatusEnum('status').default('draft'),
  featured: boolean('featured').default(false),
  seoTitle: varchar('seo_title', { length: 255 }),
  seoDescription: text('seo_description'),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});
```

### 🍃 MongoDB + Go Backend
**Purpose**: Portfolio Data & Professional Information

```javascript
// Flexible document structure for dynamic portfolio content
projects: {
  _id: ObjectId,
  title: String,
  description: String,
  longDescription: String,
  technologies: [String],
  category: String, // "web", "mobile", "ai-ml", "backend"
  links: {
    demo: String,
    repository: String,
    documentation: String,
    caseStudy: String
  },
  githubStats: {
    stars: Number,
    forks: Number,
    language: String,
    lastUpdated: Date
  },
  featured: Boolean,
  status: String, // "active", "archived", "in-development"
  metrics: {
    liveUsers: Number,
    performanceScore: Number
  }
}
```

---

## ✨ Platform Features

### 💼 Professional Showcase (MongoDB Backend)
- 🚀 **Dynamic Hero Section** - Real-time GitHub statistics integration
- 🛠️ **Interactive Project Gallery** - Filterable showcase with live metrics
- 📈 **Career Timeline** - Professional experience with achievements
- 💡 **Skills Matrix** - Technology proficiency with visual charts
- 🏆 **Certifications Hub** - Verified credentials with validation
- 📊 **GitHub Integration** - Live repository statistics and contributions

### 📚 Content Management System (PostgreSQL Frontend)
- ✏️ **TipTap Rich Editor** - Advanced WYSIWYG with markdown support
- 📝 **ReactMarkdown Rendering** - Beautiful content with syntax highlighting
- 🏷️ **Advanced Taxonomy** - Sophisticated categorization and tagging
- 💬 **Engagement System** - Comments with nested thread support
- 🔍 **Full-text Search** - Powerful content discovery
- 📊 **Analytics Dashboard** - Performance metrics with Recharts
- 🤖 **AI Enhancement** - OpenAI-powered content suggestions

### 👨‍💻 Administrative Interface
- 🔐 **JWT Authentication** - Secure admin access with role management
- 📈 **Business Intelligence** - Comprehensive analytics dashboard
- 📝 **Content Operations** - Full CRUD for all content types
- 👥 **User Management** - Account administration and permissions
- 🛡️ **Security Management** - Content moderation and oversight
- 📊 **Database Operations** - Multi-database management interface

### ⚡ Technical Excellence
- 🏗️ **Hybrid Architecture** - Next.js API routes + Go microservices
- 🔄 **Real-time Sync** - Live updates across platform components
- 📱 **Progressive Web App** - Mobile-first with offline support
- 🌓 **Advanced Theming** - Dynamic theme switching with system detection
- 🔍 **SEO Optimization** - Advanced search engine optimization
- 🚀 **Performance First** - Optimized loading and delivery strategies

---

## 🚀 Quick Start Guide

### 📋 System Requirements

<div align="center">

| Technology | Version | Purpose |
|------------|---------|---------|
| 📦 **Node.js** | `18.17.0+` | Frontend runtime |
| 🐹 **Go** | `1.21+` | Backend development |
| 🐘 **PostgreSQL** | `15+` | Blog database |
| 🍃 **MongoDB** | `7.0+` | Portfolio data |
| 🔄 **Redis** | `7.0+` | Caching (optional) |

</div>

### ⚡ Quick Installation

```bash
# 1️⃣ Clone and setup frontend
git clone https://github.com/ShardenduMishra22/MishraShardendu22.git
cd MishraShardendu22
npm install

# 2️⃣ Setup PostgreSQL database
createdb blog_system_db

# 3️⃣ Configure environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# 4️⃣ Initialize database
npm run db:generate && npm run db:push

# 5️⃣ Clone and setup Go backend
git clone https://github.com/ShardenduMishra22/MishraShardendu22-Updation.git
cd ../MishraShardendu22-Updation
go mod download

# 6️⃣ Configure Go environment
cp .env.example .env
# Edit .env with your MongoDB and other settings

# 7️⃣ Start services (in separate terminals)
# Terminal 1: Go Backend
go run main.go

# Terminal 2: Frontend
cd ../MishraShardendu22
npm run dev
```

### 🌐 Service Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| 🎯 **Main Platform** | http://localhost:3000 | Professional website & blog |
| 👨‍💼 **Admin Panel** | http://localhost:3000/admin | Content management |
| 🐹 **API Server** | http://localhost:5000 | Backend microservice |
| 🗄️ **Database Studio** | http://localhost:4983 | PostgreSQL management |

---

## ⚙️ Environment Configuration

### 🎯 Frontend Environment (`.env.local`)

```env
# 🐘 PostgreSQL Database (Blog System)
DATABASE_URL="postgresql://username:password@localhost:5432/blog_system_db"
DIRECT_URL="postgresql://username:password@localhost:5432/blog_system_db"

# 🍃 Portfolio API (Go Backend)
NEXT_PUBLIC_API_BASE_URL="http://localhost:5000"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# 🔐 Authentication & Security
NEXTAUTH_SECRET="your-nextauth-secret-minimum-32-characters"
NEXTAUTH_URL="http://localhost:3000"
JWT_SECRET="your-jwt-secret-matching-backend"

# 🤖 AI Integration
OPENAI_API_KEY="sk-your-openai-api-key"
AI_MODEL="gpt-4-turbo-preview"

# 📧 Email Services
RESEND_API_KEY="re_your-resend-api-key"
SMTP_FROM="contact@mishrashardendu22.is-a.dev"

# 🔄 Cache & Performance
REDIS_URL="redis://localhost:6379"
CACHE_TTL="3600"

# 📊 Analytics
VERCEL_ANALYTICS_ID="your-vercel-analytics-id"
GOOGLE_ANALYTICS_ID="G-YOUR-GA-MEASUREMENT-ID"
```

### 🐹 Go Backend Environment (`.env`)

```env
# 🍃 MongoDB Configuration
MONGODB_URI="mongodb+srv://username:password@cluster0.mongodb.net/?retryWrites=true&w=majority"
MONGODB_DATABASE="portfolio_professional_db"

# 🔐 Security
JWT_SECRET="your-jwt-secret-matching-frontend"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your-secure-admin-password"

# 🌐 Server Configuration
PORT="5000"
GIN_MODE="debug"  # Use "release" for production

# 🔗 CORS Configuration
CORS_ALLOWED_ORIGINS="http://localhost:3000,https://mishrashardendu22.is-a.dev"
CORS_ALLOWED_METHODS="GET,POST,PUT,DELETE,OPTIONS,PATCH"

# 📊 Rate Limiting
RATE_LIMIT_REQUESTS="100"
RATE_LIMIT_WINDOW="60"

# 🤖 AI & External APIs
OPENAI_API_KEY="sk-your-openai-api-key"
GITHUB_TOKEN="ghp_your-github-token"
GITHUB_USERNAME="ShardenduMishra22"
```

---

## 🛠️ Development Commands

### 📜 Frontend Development

```bash
# Development & Building
npm run dev          # 🚀 Development server
npm run build        # 🏗️ Production build
npm run start        # ▶️ Start production server
npm run lint         # 🔍 Code linting
npm run format       # 🎨 Code formatting

# Database Operations
npm run db:generate  # 🏗️ Generate migrations
npm run db:push      # 📤 Push schema changes
npm run db:studio    # 🎨 Open Drizzle Studio
npm run db:seed      # 🌱 Seed sample data
```

### 🐹 Backend Development

```bash
# Development & Testing
go run main.go       # 🚀 Start development server
go build -o app      # 🏗️ Build production binary
go test ./...        # 🧪 Run test suite
go mod tidy          # 📦 Update dependencies

# Code Quality
go fmt ./...         # 🎨 Format code
go vet ./...         # 🔍 Static analysis
golangci-lint run    # 🔎 Comprehensive linting
```

---

## 🎨 Design System

### 🌊 Modern Design Framework
- 🎨 **Tailwind CSS 4** - Utility-first with JIT compilation
- 🧩 **shadcn/ui** - Premium component library on Radix UI
- ✨ **Lucide React** - Beautiful, customizable icon library
- 📝 **TipTap Editor** - Extensible rich text editing
- 📄 **ReactMarkdown** - Enhanced markdown rendering
- 📊 **Recharts** - Composable data visualization

### 🌓 Advanced Theming
- ☀️ **Light Mode** - Clean, professional appearance
- 🌙 **Dark Mode** - Developer-optimized dark interface
- 🔄 **System Detection** - Automatic OS preference matching
- 🎨 **CSS Variables** - Dynamic theming system
- 📱 **Responsive Design** - Mobile-first breakpoint system
- ♿ **WCAG 2.1 AA** - Full accessibility compliance

---

## 🚀 Performance & Security

### ⚡ Performance Optimization
- 🚀 **Next.js 15** - Server Components with streaming
- ⚡ **Turbopack** - Ultra-fast development builds
- 🖼️ **Image Optimization** - WebP/AVIF with lazy loading
- 📦 **Smart Bundling** - Tree shaking and code splitting
- 💾 **Multi-layer Caching** - Redis + browser + CDN
- 🌐 **Edge Deployment** - Global CDN with low latency

### 🔒 Enterprise Security
- 🔐 **JWT Authentication** - Stateless with refresh rotation
- 🛡️ **Input Validation** - Comprehensive Zod schemas
- 🚫 **SQL Injection Prevention** - Parameterized queries
- 🛡️ **XSS Protection** - Content sanitization
- 🔒 **CSRF Protection** - SameSite cookies
- 🎯 **Rate Limiting** - Sliding window protection
- 📝 **Security Headers** - HSTS, CSP, and more

---

## 📊 Analytics & Monitoring

### 📈 Performance Tracking
- **Vercel Analytics** - Real-time user insights
- **Speed Insights** - Core Web Vitals monitoring
- **Custom Metrics** - Blog engagement tracking
- **Error Monitoring** - Real-time error tracking
- **Database Performance** - Query optimization
- **API Metrics** - Response time analysis

### 📊 Data Visualization Example

```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface EngagementData {
  date: string
  views: number
  likes: number
  comments: number
}

export function EngagementChart({ data }: { data: EngagementData[] }) {
  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="views" stroke="#8884d8" strokeWidth={2} />
          <Line type="monotone" dataKey="likes" stroke="#82ca9d" strokeWidth={2} />
          <Line type="monotone" dataKey="comments" stroke="#ffc658" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
```

---

## 🌐 Production Deployment

### 🚀 Frontend Deployment (Vercel)

```bash
# Install and deploy
npm install -g vercel
vercel login
vercel --prod

# Environment management
vercel env add PRODUCTION
vercel env pull .env.production
```

### 🐹 Backend Deployment Options

**Railway Deployment**
```bash
npm install -g @railway/cli
railway login
railway link
railway up
```

**Docker Containerization**
```dockerfile
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

FROM alpine:latest
RUN apk --no-cache add ca-certificates tzdata
WORKDIR /root/
COPY --from=builder /app/main .
EXPOSE 5000
CMD ["./main"]
```

### ✅ Production Checklist

#### 🔧 Infrastructure
- [ ] Frontend deployed on Vercel with custom domain
- [ ] Backend on Railway/DigitalOcean with load balancer
- [ ] PostgreSQL on Neon/Supabase with connection pooling
- [ ] MongoDB Atlas with replica sets
- [ ] Redis Cloud with persistence
- [ ] CDN setup (Cloudflare/CloudFront)
- [ ] SSL certificates with auto-renewal

#### 🔒 Security & Monitoring
- [ ] Environment variables encrypted and secured
- [ ] Database security and firewall rules
- [ ] API security (rate limiting, CORS, headers)
- [ ] Error tracking integration
- [ ] Performance monitoring setup
- [ ] Automated backup strategy
- [ ] Health check endpoints

#### 📊 Performance
- [ ] Core Web Vitals optimization (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Image optimization and CDN
- [ ] Database query optimization
- [ ] Caching strategy implementation
- [ ] Performance monitoring alerts

---

## 🧪 Testing Strategy

### Frontend Testing
```bash
npm run test              # Jest + React Testing Library
npm run test:coverage     # Coverage report
npm run test:e2e         # Playwright E2E tests
```

### Backend Testing (Go)
```bash
go test ./...            # Unit tests
go test -cover ./...     # Test coverage
go test -race ./...      # Race condition detection
go test -bench ./...     # Benchmark tests
```

---

## 🤝 Contributing Guidelines

### 🔄 Contribution Workflow
1. 🍴 **Fork** both repositories
2. 🌿 **Create Feature Branch** with descriptive name
3. ✅ **Implement** with comprehensive testing
4. 📝 **Document** changes and add comments
5. 🧪 **Test** ensure all functionality works
6. 📤 **Submit PR** with detailed description
7. 🔍 **Code Review** and address feedback

### 📋 Development Standards
- 📝 **TypeScript** strict mode with comprehensive typing
- 🐹 **Go** following official conventions and idioms
- 🎨 **Formatting** Prettier + ESLint for frontend, gofmt for backend
- 📏 **Commits** Conventional commits for automated changelog
- 🧪 **Testing** Minimum 80% code coverage for new features
- 📚 **Documentation** Comprehensive inline and API documentation

### Pull Request Requirements
- ✅ All existing tests pass
- 📝 Clear description of changes
- 🖼️ Screenshots for visual changes
- 📊 No performance regression
- 🔒 Security implications addressed
- 📖 Documentation updated

---

## 👨‍💻 Author & Leadership

<div align="center">

### **Shardendu Mishra**
**Senior Software Engineer | Full-Stack Architect | AI/ML Specialist**

*Building scalable, performant web applications with cutting-edge technologies*

[![Email](https://img.shields.io/badge/📧_Email-mishrashardendu22%40gmail.com-red?style=for-the-badge&logo=gmail)](mailto:mishrashardendu22@gmail.com)
[![LinkedIn](https://img.shields.io/badge/💼_LinkedIn-Shardendu_Mishra-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/shardendu-mishra)
[![Portfolio](https://img.shields.io/badge/🌐_Portfolio-mishrashardendu22.is--a.dev-green?style=for-the-badge&logo=google-chrome)](https://mishrashardendu22.is-a.dev)

**🚀 Expertise**: Next.js • TypeScript • Go • AI/ML • Cloud Architecture • Database Design

</div>

---

## 🙏 Acknowledgments

<div align="center">

**Built with exceptional open-source technologies:**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Go](https://img.shields.io/badge/Go-1.21-00ADD8?style=flat-square&logo=go)](https://golang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=flat-square&logo=postgresql)](https://postgresql.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=flat-square&logo=mongodb)](https://mongodb.com)
[![Fiber](https://img.shields.io/badge/Fiber-2.0-00ADD8?style=flat-square&logo=go)](https://gofiber.io)
[![Drizzle](https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=flat-square)](https://orm.drizzle.team)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Components-black?style=flat-square)](https://ui.shadcn.com)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Vercel-Deployment-black?style=flat-square&logo=vercel)](https://vercel.com)

</div>

---

## 📞 Support & Consultation

<div align="center">

**Available for technical consultation, collaboration opportunities, and development inquiries**

[![Create Issue](https://img.shields.io/badge/🐛_Report_Issue-GitHub_Issues-red?style=for-the-badge&logo=github)](https://github.com/ShardenduMishra22/MishraShardendu22/issues)
[![Discussions](https://img.shields.io/badge/💬_Discussions-GitHub_Discussions-purple?style=for-the-badge&logo=github)](https://github.com/ShardenduMishra22/MishraShardendu22/discussions)
[![Email Support](https://img.shields.io/badge/📧_Email_Support-Professional_Inquiry-blue?style=for-the-badge&logo=gmail)](mailto:mishrashardendu22@gmail.com?subject=Professional%20Platform%20Inquiry)

</div>

---

## 📄 License & Legal

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for complete terms.

```
MIT License - Copyright (c) 2025 Shardendu Mishra

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

<div align="center">

### ⭐ Support This Project

*If this comprehensive full-stack architecture helps your development journey,  
please consider starring all the repositories*

[![GitHub stars](https://img.shields.io/github/stars/ShardenduMishra22/MishraShardendu22?style=social)](https://github.com/ShardenduMishra22/MishraShardendu22)
[![GitHub forks](https://img.shields.io/github/forks/ShardenduMishra22/MishraShardendu22?style=social)](https://github.com/ShardenduMishra22/MishraShardendu22/network/members)

**🚀 Built by [Shardendu Mishra](https://mishrashardendu22.is-a.dev)**  
*Committed to excellence in software architecture, performance optimization, and developer experience*

*Last Updated: July 2025 • Version 2.0 • Next.js 15 + Go Fiber Architecture*

</div>
