# 🚀 Shardendu Mishra - Personal Portfolio Website

<div align="center">
  <img src="https://raw.githubusercontent.com/ShardenduMishra22/MishraShardendu22/refs/heads/main/GopherMishra.png" alt="Shardendu Avatar" width="200" />
  
  <h3>A modern, full-stack portfolio website built with Next.js 15</h3>
  <p><em>Featuring a blog system, admin panel, and dual backend architecture with load balancing</em></p>

  [![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-blue?style=for-the-badge)](https://mishrashardendu22.is-a.dev)
  [![Frontend Repo](https://img.shields.io/badge/📱_Frontend-View_Repo-green?style=for-the-badge)](https://github.com/ShardenduMishra22/MishraShardendu22)
  [![Backend Repo](https://img.shields.io/badge/⚙️_Backend-View_Repo-orange?style=for-the-badge)](https://github.com/ShardenduMishra22/MishraShardendu22-Updation)
</div>

---

## 📚 Tech Stack

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Go](https://img.shields.io/badge/Go-1.21+-00ADD8?style=for-the-badge&logo=go&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-7+-DC382D?style=for-the-badge&logo=redis&logoColor=white)

</div>

---

## ✨ Features Overview

<table>
<tr>
<td width="50%">

### 🎨 **Portfolio Sections**
- 🚀 **Hero Section** - Animated introduction with modern design
- 🎓 **Education** - Academic background and achievements  
- 💡 **Skills** - Interactive skill showcase with pagination
- 🛠️ **Projects** - Portfolio projects with detailed descriptions
- 💼 **Experience** - Professional work history
- 🏆 **Certifications** - Professional certifications and achievements
- 📧 **Contact** - Contact information and social links

</td>
<td width="50%">

### 📝 **Blog System**
- ✏️ **Rich Text Editor** - TipTap-based markdown editor
- 🏷️ **Categories & Tags** - Organized content management
- 💬 **Comments System** - User interaction and engagement
- ❤️ **Like & Bookmark** - Social features for content
- 📊 **View Tracking** - Analytics and engagement metrics
- 🔍 **Search & Filtering** - Advanced content discovery
- 📋 **Revision History** - Content version control
- 🚨 **Reporting System** - Content moderation tools

</td>
</tr>
</table>

### 👨‍💻 **Admin Panel**
- 🔐 **Authentication** - Secure admin login system
- 📈 **Dashboard** - Overview of site statistics
- 📝 **Content Management** - CRUD operations for all content
- 👥 **User Management** - User profiles and permissions
- 📊 **Analytics** - Detailed performance metrics
- 🛡️ **Moderation** - Report handling and content review

### ⚡ **Technical Features**
- 🏗️ **Dual Backend Architecture** - Next.js API + Go backend with load balancing
- 🔄 **Real-time Updates** - Live content synchronization
- 📱 **Responsive Design** - Mobile-first approach
- 🌓 **Dark/Light Theme** - Theme switching with system preference
- 🔍 **SEO Optimized** - Meta tags, structured data, and performance
- 🚀 **Performance Optimized** - Image optimization, lazy loading, caching

---

## 🏗️ Architecture

<details>
<summary><strong>🎨 Frontend Structure (Next.js 15)</strong></summary>

```
src/
├── 📁 app/                    # Next.js App Router
│   ├── 👨‍💼 admin/             # Admin panel routes
│   ├── 🔌 api/               # Next.js API routes
│   ├── 📝 blog/              # Blog system routes
│   ├── 🛠️ projects/          # Project pages
│   ├── 💼 experiences/       # Experience pages
│   └── 🏆 certifications/    # Certification pages
├── 🧩 components/            # Reusable UI components
│   ├── 🎨 ui/               # Base UI components (shadcn/ui)
│   ├── 👨‍💼 admin/            # Admin-specific components
│   ├── 📝 blog/             # Blog-specific components
│   └── 🎯 main/             # Portfolio section components
├── 🗄️ db/                   # Database schemas
├── 🎣 hooks/                # Custom React hooks
├── 📚 lib/                  # Utility libraries
├── 🔧 services/             # API service layer
└── 🛠️ util/                 # Utility functions
```

</details>

<details>
<summary><strong>⚙️ Backend Architecture</strong></summary>

- **⚛️ Next.js API Routes** - Frontend API, authentication, AI integration
- **🐹 Go Backend** - Main API server for portfolio data, blog system
- **🍃 MongoDB** - Primary database for all application data
- **🔄 Redis** - Caching layer for improved performance
- **🤖 AI Integration** - AI-powered features and content generation

</details>

<details>
<summary><strong>🗄️ Database Schema</strong></summary>

```javascript
// 👥 User Management
users: {
  _id: ObjectId,
  username: String,
  email: String,
  role: String,
  createdAt: Date
}

// 📝 Blog System  
blogs: {
  _id: ObjectId,
  title: String,
  content: String,
  author: ObjectId,
  categories: [String],
  tags: [String],
  likes: Number,
  views: Number,
  createdAt: Date
}

// 🛠️ Portfolio Data
projects: {
  _id: ObjectId,
  title: String,
  description: String,
  technologies: [String],
  links: Object,
  featured: Boolean
}

// 🏆 Experiences & Skills
experiences: [...],
skills: [...],
certifications: [...]
```

</details>

---

## 🚀 Quick Start

### 📋 Prerequisites

<table>
<tr>
<td>

- 📦 **Node.js** `18+`
- 🍃 **MongoDB** `4.4+` 
- 🐹 **Go** `1.21+` *(for backend)*
- 📦 **npm** *(package manager)*

</td>
<td>

```bash
# Check versions
node --version
mongod --version
go version
npm --version
```

</td>
</tr>
</table>

### ⚙️ Environment Setup

#### 🐹 **Go Backend Environment**
Create a `.env` file in your Go backend directory:

<details>
<summary><strong>📄 Backend Environment Variables</strong></summary>

```env
# 👨‍💼 Admin Authentication
ADMIN_PASS=your-admin-password

# 🌐 CORS Configuration
CORS_ALLOW_ORIGINS=https://mishrashardendu22.vercel.app,https://mishrashardendu22.is-a.dev,http://localhost:3000

# 🗄️ Database
DB_NAME=your-database-name
MONGODB_URI=mongodb+srv://username:password@cluster0.4jphclx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# 🔐 Security
GITHUB_TOKEN=ghp_your-github-token
JWT_SECRET=your-jwt-secret-key

# ⚙️ Server Configuration
LOG_LEVEL=info
PORT=5000
```

</details>

#### ⚛️ **Next.js Frontend Environment**
Create a `.env.local` file in your Next.js frontend directory:

<details>
<summary><strong>📄 Frontend Environment Variables</strong></summary>

```env
# 🤖 AI Integration
AI_MODEL=your-ai-model
AI_URL=your-ai-service-url
AI_API_KEY=your-ai-api-key
AI_SYSTEM_PROMPT=your-system-prompt

# 🔄 Cache & Session
REDIS_URL=your-redis-connection-string

# 🌐 Application URLs
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000

# 🔐 Authentication (if using NextAuth)
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

</details>

### 💻 Installation

```bash
# 1️⃣ Clone the frontend repository
git clone https://github.com/ShardenduMishra22/portfolio-frontend.git
cd portfolio-frontend

# 2️⃣ Install frontend dependencies
npm install

# 3️⃣ Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 4️⃣ Clone and setup Go backend
git clone https://github.com/ShardenduMishra22/portfolio-backend.git
cd portfolio-backend

# 5️⃣ Install Go dependencies
go mod download

# 6️⃣ Set up backend environment
cp .env.example .env
# Edit .env with your values

# 7️⃣ Start the Go backend
go run main.go

# 8️⃣ Start the frontend (in another terminal)
cd ../portfolio-frontend
npm run dev
```

### 🌐 Access Points

| Service | URL | Description |
|---------|-----|-------------|
| 🎯 **Frontend** | http://localhost:3000 | Main portfolio website |
| 🐹 **Go Backend** | http://localhost:5000 | API server |
| 👨‍💼 **Admin Panel** | http://localhost:3000/admin | Content management |
| 🔌 **API Docs** | http://localhost:5000/docs | Go API endpoints |

> **📝 Note:** Make sure both frontend and Go backend are running for complete functionality!

---

## 🛠️ Development

### 📜 Available Scripts

#### 🎯 **Frontend (Next.js)**
<table>
<tr>
<td>

```bash
npm run dev       # 🚀 Start development
npm run build     # 🏗️ Build for production  
npm run start     # ▶️ Start production
npm run lint      # 🔍 Run ESLint
```

</td>
<td>

```bash
npm run format    # 🎨 Format with Prettier
npm run type-check # ✅ TypeScript checking
npm run analyze   # 📊 Bundle analysis
npm test          # 🧪 Run tests
```

</td>
</tr>
</table>

#### 🐹 **Backend (Go)**
<table>
<tr>
<td>

```bash
go run main.go    # 🚀 Start development
go build          # 🏗️ Build binary
go test ./...     # 🧪 Run tests
go mod tidy       # 📦 Clean dependencies
```

</td>
<td>

```bash
go mod download   # 📥 Download dependencies
go vet ./...      # 🔍 Static analysis
go fmt ./...      # 🎨 Format code
air              # 🔥 Hot reload (if using air)
```

</td>
</tr>
</table>

### 🗄️ Database Management

#### 🍃 **MongoDB Operations**
```bash
# Connect to MongoDB
mongosh "your-connection-string"

# Database operations
use your-database-name
db.collection.find()
db.collection.createIndex()

# Backup and restore
mongodump --uri="your-connection-string"
mongorestore --uri="your-connection-string" dump/
```

#### 🔄 **Redis Cache (if using)**
```bash
# Connect to Redis
redis-cli

# Basic operations
SET key value
GET key
FLUSHALL
INFO memory
```

---

## 🎨 Design System

<table>
<tr>
<td width="50%">

### 🎭 **Styling**
- 🌊 **Tailwind CSS 4** - Utility-first framework
- 🎨 **Custom Variables** - Theme-aware tokens
- 🧩 **shadcn/ui** - High-quality components
- ✨ **Animations** - Smooth micro-interactions

</td>
<td width="50%">

### 🌓 **Theme Support**
- ☀️ **Light Theme** - Clean, professional
- 🌙 **Dark Theme** - Modern, eye-friendly  
- 🔄 **Auto Switch** - System preference
- 🎨 **Brand Colors** - Custom palette

</td>
</tr>
</table>

---

## 🚀 Performance & Security

<table>
<tr>
<td width="50%">

### ⚡ **Optimization**
- 🚀 **Next.js 15** - Latest performance
- ⚡ **Turbopack** - Fast dev builds
- 🖼️ **Image Optimization** - Auto compression
- 📦 **Code Splitting** - Lazy loading
- 💾 **Smart Caching** - Strategic caching
- 🌐 **CDN Ready** - Optimized delivery

</td>
<td width="50%">

### 🔒 **Security**
- 🔐 **Better Auth** - Modern authentication
- 🎟️ **JWT Tokens** - Secure token-based auth
- 🛡️ **Input Validation** - Zod schemas
- 🚫 **SQL Injection Prevention** - Parameterized queries
- 🛡️ **XSS Protection** - Content sanitization
- 🔒 **CSRF Protection** - Request forgery prevention

</td>
</tr>
</table>

---

## 📊 Analytics & Monitoring

- 📈 **Vercel Analytics** - Performance monitoring
- ⚡ **Speed Insights** - Core Web Vitals
- 📊 **Custom Metrics** - Blog engagement analytics
- 🔍 **Error Tracking** - Real-time error monitoring

---

## 🚀 Deployment

### 🌐 Vercel (Recommended)

<table>
<tr>
<td>

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

</td>
<td>

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FShardenduMishra22%2Fportfolio-frontend)

</td>
</tr>
</table>

### ✅ Production Checklist

- [ ] 🔧 Environment variables configured (both frontend and backend)
- [ ] 🍃 MongoDB cluster set up and secured
- [ ] 🔄 Redis cache configured
- [ ] 🔒 SSL certificates installed
- [ ] 🌐 CDN configured
- [ ] 🤖 AI services configured
- [ ] 📊 Monitoring set up
- [ ] 💾 Database backup strategy implemented
- [ ] 🐹 Go backend deployed and running
- [ ] ⚛️ Next.js frontend deployed

---

## 🤝 Contributing

<table>
<tr>
<td>

### 🔄 **Process**
1. 🍴 Fork the repository
2. 🌿 Create feature branch
3. ✅ Commit your changes
4. 📤 Push to branch
5. 📬 Open Pull Request

</td>
<td>

### 📋 **Guidelines**
- 📝 Follow TypeScript best practices
- 📏 Use conventional commits
- ✍️ Write meaningful messages
- 🧪 Add tests for new features
- 📚 Update documentation

</td>
</tr>
</table>

---

## 👨‍💻 Author

<div align="center">

### Shardendu Mishra

[![Email](https://img.shields.io/badge/📧_Email-mishrashardendu22@gmail.com-red?style=for-the-badge)](mailto:mishrashardendu22@gmail.com)
[![GitHub](https://img.shields.io/badge/🐙_GitHub-ShardenduMishra22-black?style=for-the-badge)](https://github.com/ShardenduMishra22)
[![LinkedIn](https://img.shields.io/badge/💼_LinkedIn-Shardendu_Mishra-blue?style=for-the-badge)](https://linkedin.com/in/shardendumishra22/)
[![Portfolio](https://img.shields.io/badge/🌐_Portfolio-Visit_Site-green?style=for-the-badge)](https://mishrashardendu22.is-a.dev)

</div>

---

## 🙏 Acknowledgments

<div align="center">

**Special thanks to these amazing projects:**

[![Next.js](https://img.shields.io/badge/Next.js-Framework-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Components-black?style=flat-square)](https://ui.shadcn.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-green?style=flat-square)](https://orm.drizzle.team/)
[![TipTap](https://img.shields.io/badge/TipTap-Editor-blue?style=flat-square)](https://tiptap.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployment-black?style=flat-square&logo=vercel)](https://vercel.com/)

</div>

---

## 📞 Support & Feedback

<div align="center">

**Need help or have questions?**

[![Create Issue](https://img.shields.io/badge/🐛_Create_Issue-GitHub-black?style=for-the-badge)](https://github.com/ShardenduMishra22/portfolio-frontend/issues/new)
[![Email Support](https://img.shields.io/badge/📧_Email_Support-Direct_Contact-red?style=for-the-badge)](mailto:mishrashardendu22@gmail.com)
[![LinkedIn Message](https://img.shields.io/badge/💼_LinkedIn-Message_Me-blue?style=for-the-badge)](https://linkedin.com/in/shardendumishra22/)

</div>

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### ⭐ Found this helpful? Give it a star!

[![GitHub stars](https://img.shields.io/github/stars/MishraShardendu22/MishraShardendu?style=social)](https://github.com/MishraShardendu22/MishraShardendu/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/MishraShardendu22/MishraShardendu?style=social)](https://github.com/MishraShardendu22/MishraShardendu/network/members)

**Made with ❤️ by [Shardendu Mishra](https://mishrashardendu22.is-a.dev)**

</div>
