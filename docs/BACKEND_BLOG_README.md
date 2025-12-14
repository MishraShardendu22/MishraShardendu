# MishraShardendu22 Backend - Blog Website API

## Overview

Backend API for the blog platform providing content management, authentication, and comment functionality. Optimized for fast content delivery and SEO-friendly URL generation.

## Technology Stack

- Runtime: Node.js 18+ or Go 1.21+
- Database: PostgreSQL 15+
- ORM: Drizzle (Node.js) or GORM (Go)
- Authentication: JWT tokens
- Caching: Redis (optional)
- API Documentation: OpenAPI 3.0 / Swagger

## Features

- Blog post CRUD operations with rich text support
- Category and tag management
- Comment system with moderation
- User authentication and authorization
- Dynamic sitemap generation for blog posts
- RSS feed generation
- Full-text search capabilities

## API Endpoints

### Health Check

```
GET /health
GET /api/health
```

### Blog Posts

```
GET /api/blogs?page=1&limit=10&search=keyword&tag=tagName&author=authorId
GET /api/blogs/:id
POST /api/blogs (authenticated, owner only)
PUT /api/blogs/:id (authenticated, owner only)
PATCH /api/blogs/:id (authenticated, owner only)
DELETE /api/blogs/:id (authenticated, owner only)
GET /api/blogs/stats
GET /api/blogs/reorder (authenticated, owner only)
POST /api/blogs/reorder (authenticated, owner only)
```

**Pagination Response Format:**

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

### Categories and Tags

```
GET /api/categories
GET /api/tags
GET /api/blogs?tag=:tagName
GET /api/blogs?author=:authorId
GET /api/blogs?search=:searchQuery
```

### Comments

```
GET /api/blogs/:id/comments?page=1&limit=10
POST /api/blogs/:id/comments (authenticated, verified users only)
DELETE /api/blogs/:id/comments/:commentId (authenticated, comment author or blog owner)
```

**Comment Pagination Response Format:**

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "totalPages": 2
  }
}
```

### Sitemap Generation

```
GET /sitemap.xml
GET /blog-sitemap.xml
```

### RSS Feed

```
GET /rss.xml
GET /feed.xml
```

## Sitemap Generation Implementation

### Pseudocode Example

```
function generateBlogSitemap(request, response):
    baseURL = "https://mishrashardendu22.is-a.dev/blog"

    # Initialize XML structure
    xml = createXMLDocument()
    urlset = xml.createElement("urlset")
    urlset.setAttribute("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9")

    # Add blog home
    addURLToSitemap(urlset, {
        loc: baseURL,
        lastmod: getCurrentDate(),
        changefreq: "daily",
        priority: "1.0"
    })

    # Add published blog posts from database
    posts = database.query("
        SELECT slug, updated_at, published_at
        FROM posts
        WHERE status = 'published'
        AND published_at <= NOW()
        ORDER BY published_at DESC
    ")

    for each post in posts:
        addURLToSitemap(urlset, {
            loc: baseURL + "/" + post.slug,
            lastmod: post.updated_at,
            changefreq: "weekly",
            priority: "0.8"
        })

    # Add category pages
    categories = database.query("SELECT slug FROM categories")
    for each category in categories:
        addURLToSitemap(urlset, {
            loc: baseURL + "/categories/" + category.slug,
            lastmod: getCurrentDate(),
            changefreq: "weekly",
            priority: "0.6"
        })

    # Add tag pages
    tags = database.query("SELECT slug FROM tags")
    for each tag in tags:
        addURLToSitemap(urlset, {
            loc: baseURL + "/tags/" + tag.slug,
            lastmod: getCurrentDate(),
            changefreq: "weekly",
            priority: "0.5"
        })

    # Set response headers
    response.setHeader("Content-Type", "application/xml")
    response.setHeader("Cache-Control", "public, max-age=1800")

    return xml.toString()
```

### Node.js Express Example

```javascript
const express = require('express')
const router = express.Router()
const db = require('./database')

router.get('/sitemap.xml', async (req, res) => {
  try {
    const baseURL = 'https://mishrashardendu22.is-a.dev/blog'
    const currentDate = new Date().toISOString().split('T')[0]

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

    // Blog home
    sitemap += `
  <url>
    <loc>${baseURL}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`

    // Published blog posts
    const posts = await db.query(`
      SELECT slug, updated_at, published_at 
      FROM posts 
      WHERE status = 'published' 
      AND published_at <= NOW()
      ORDER BY published_at DESC
    `)

    posts.rows.forEach((post) => {
      const lastmod = new Date(post.updated_at).toISOString().split('T')[0]
      sitemap += `
  <url>
    <loc>${baseURL}/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    })

    // Category pages
    const categories = await db.query('SELECT slug FROM categories')
    categories.rows.forEach((category) => {
      sitemap += `
  <url>
    <loc>${baseURL}/categories/${category.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
    })

    // Tag pages
    const tags = await db.query('SELECT slug FROM tags')
    tags.rows.forEach((tag) => {
      sitemap += `
  <url>
    <loc>${baseURL}/tags/${tag.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`
    })

    sitemap += `
</urlset>`

    res.header('Content-Type', 'application/xml')
    res.header('Cache-Control', 'public, max-age=1800')
    res.send(sitemap)
  } catch (error) {
    console.error('Blog sitemap generation error:', error)
    res.status(500).send('Error generating sitemap')
  }
})

module.exports = router
```

## Canonical URL Configuration

All blog post URLs follow this pattern:

- Base URL: `https://mishrashardendu22.is-a.dev/blog`
- Blog post: `https://mishrashardendu22.is-a.dev/blog/post-slug`
- Category: `https://mishrashardendu22.is-a.dev/blog/categories/category-slug`
- Tag: `https://mishrashardendu22.is-a.dev/blog/tags/tag-slug`

Ensure all API responses include full canonical URLs for proper SEO.

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/blog

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# API Configuration
API_PORT=8081
NODE_ENV=production

# CORS
ALLOWED_ORIGINS=https://mishrashardendu22.is-a.dev

# Canonical URL
CANONICAL_URL=https://mishrashardendu22.is-a.dev/blog

# Redis Cache (optional)
REDIS_URL=redis://localhost:6379

# Email Service for notifications
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

## Installation

```bash
# Install dependencies
npm install
# or
go mod download

# Set up environment variables
cp .env.example .env

# Run database migrations
npm run migrate
# or
go run migrations/migrate.go

# Start development server
npm run dev
# or
go run main.go
```

## RSS Feed Generation

The API also provides an RSS feed endpoint:

```javascript
router.get('/rss.xml', async (req, res) => {
  try {
    const baseURL = 'https://mishrashardendu22.is-a.dev/blog'

    const posts = await db.query(`
      SELECT title, slug, summary, published_at, updated_at, author
      FROM posts 
      WHERE status = 'published' 
      AND published_at <= NOW()
      ORDER BY published_at DESC
      LIMIT 20
    `)

    let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Shardendu Mishra Blog</title>
    <link>${baseURL}</link>
    <description>Technical articles about web development, programming, and software engineering insights</description>
    <language>en-us</language>`

    posts.rows.forEach((post) => {
      const pubDate = new Date(post.published_at).toUTCString()
      rss += `
    <item>
      <title>${escapeXML(post.title)}</title>
      <link>${baseURL}/${post.slug}</link>
      <description>${escapeXML(post.summary)}</description>
      <pubDate>${pubDate}</pubDate>
      <guid>${baseURL}/${post.slug}</guid>
    </item>`
    })

    rss += `
  </channel>
</rss>`

    res.header('Content-Type', 'application/rss+xml')
    res.header('Cache-Control', 'public, max-age=3600')
    res.send(rss)
  } catch (error) {
    console.error('RSS generation error:', error)
    res.status(500).send('Error generating RSS feed')
  }
})
```

## API Documentation

Access full API documentation at `/api/docs` when running the server.

## Contact

**Shardendu Mishra**

- GitHub: https://github.com/MishraShardendu22/MishraShardendu22-Backend-BlogWebsite
- Email: mishrashardendu22@gmail.com

## License

MIT License
