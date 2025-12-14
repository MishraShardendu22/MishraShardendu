# Admin Website API Integration Update - December 13, 2025

## Overview

Updated the admin website API utilities to support the new pagination features added to the blog backend. Added comprehensive blog and comment management APIs with full pagination support.

## Changes Made

### 1. API Utilities Enhancement

**File:** `apps/MishraShardendu22-Frontend-AdminWebsite/src/utils/apiResponse.util.ts`

#### Added Blog API Functions

- `getAllBlogs(page, limit, options)` - Get all blogs with pagination and filters
  - Supports filtering by `tag`, `author`, and `search` query
  - Returns paginated results with metadata
- `getBlogById(id)` - Get single blog by ID
- `createBlog(blog)` - Create new blog (owner only)
  - Requires: title, content
  - Optional: tags, image
- `updateBlog(id, blog)` - Full blog update (owner only)
- `patchBlog(id, blog)` - Partial blog update (owner only)
- `deleteBlog(id)` - Delete blog (owner only)
- `getBlogStats()` - Get blog statistics
  - Returns: totalBlogs, totalComments, totalTags, recentBlogs
- `getReorderList()` - Get blog reorder list (owner only)
- `updateReorder(payload)` - Update blog order (owner only)

#### Added Comment API Functions

- `getCommentsByBlogId(blogId, page, limit)` - Get comments with pagination
  - Returns comments with user information and pagination metadata
- `createComment(blogId, comment)` - Create new comment (authenticated users only)
  - Requires email verification
- `deleteComment(blogId, commentId)` - Delete comment
  - Allowed for comment author or blog owner

#### Added TypeScript Interfaces

```typescript
interface Blog {
  id: number
  title: string
  image: string | null
  content: string
  tags: string[]
  authorId: number
  createdAt: string
  updatedAt: string
  author: { ... }
  authorProfile: { ... }
  comments: number
}

interface Comment {
  id: number
  content: string
  userId: number
  blogId: number
  createdAt: string
  user: { ... }
  userProfile: { ... }
}

interface PaginationResponse {
  page: number
  limit: number
  total: number
  totalPages: number
}

interface BlogsResponse {
  success: boolean
  data: Blog[]
  pagination: PaginationResponse
}

interface CommentsResponse {
  success: boolean
  data: Comment[]
  pagination: PaginationResponse
}
```

### 2. Documentation Updates

#### Updated Files

1. **`docs/BACKEND_BLOG_README.md`**
   - Updated blog endpoints with pagination query parameters
   - Added response format examples with pagination metadata
   - Documented comment endpoints with pagination support
   - Added authentication requirements

2. **`apps/MishraShardendu22-Frontend-AdminWebsite/README.md`**
   - Updated blog API section with comprehensive function list
   - Added pagination response format documentation
   - Included usage examples for fetching blogs and comments
   - Added TypeScript interface for paginated responses

3. **`docs/README.md`**
   - Added link to new Blog API Integration Guide
   - Added link to Backend Blog Documentation

#### New Documentation

4. **`docs/BLOG_API_INTEGRATION.md`** (New)
   - Comprehensive guide for blog backend API integration
   - Detailed pagination documentation
   - Complete endpoint reference with request/response examples
   - Frontend integration examples (React/Preact)
   - Pagination component example
   - Best practices for:
     - Error handling
     - Loading states
     - Pagination state management
     - Debounce search queries
     - Response caching
   - Rate limiting information
   - Common error codes reference

## API Changes Summary

### Pagination Support

All list endpoints now support pagination:

**Query Parameters:**

- `page` (number, default: 1) - Page number
- `limit` (number, default: 10) - Items per page
- `search` (string, optional) - Search query
- `tag` (string, optional) - Filter by tag
- `author` (number, optional) - Filter by author ID

**Response Format:**

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

### Endpoint Updates

#### Blog Endpoints

- `GET /api/blogs` - Now with pagination and filters
- `GET /api/blogs/:id` - Unchanged
- `POST /api/blogs` - Unchanged (owner only)
- `PUT /api/blogs/:id` - Unchanged (owner only)
- `PATCH /api/blogs/:id` - Unchanged (owner only)
- `DELETE /api/blogs/:id` - Unchanged (owner only)
- `GET /api/blogs/stats` - New endpoint
- `GET /api/blogs/reorder` - Unchanged (owner only)
- `POST /api/blogs/reorder` - Unchanged (owner only)

#### Comment Endpoints

- `GET /api/blogs/:id/comments` - Now with pagination
- `POST /api/blogs/:id/comments` - Unchanged (verified users only)
- `DELETE /api/blogs/:id/comments/:commentId` - Unchanged (author or owner)

## Usage Examples

### Fetching Blogs with Pagination

```typescript
import { blogsAPI } from './utils/apiResponse.util'

// Fetch first page with 10 items
const response = await blogsAPI.getAllBlogs(1, 10)

// Fetch with filters
const filteredResponse = await blogsAPI.getAllBlogs(1, 10, {
  search: 'react',
  tag: 'javascript',
})

// Access data
const blogs = response.data
const pagination = response.pagination
console.log(`Showing ${blogs.length} of ${pagination.total} blogs`)
```

### Fetching Comments with Pagination

```typescript
import { commentsAPI } from './utils/apiResponse.util'

// Fetch comments for blog ID 1
const response = await commentsAPI.getCommentsByBlogId(1, 1, 10)

const comments = response.data
const pagination = response.pagination
console.log(`Page ${pagination.page} of ${pagination.totalPages}`)
```

### Creating a Blog

```typescript
import { blogsAPI } from './utils/apiResponse.util'

const newBlog = await blogsAPI.createBlog({
  title: 'My New Blog Post',
  content: 'Blog content here...',
  tags: ['technology', 'programming'],
  image: 'https://example.com/thumbnail.jpg',
})
```

### Creating a Comment

```typescript
import { commentsAPI } from './utils/apiResponse.util'

const newComment = await commentsAPI.createComment(1, {
  content: 'Great post! Thanks for sharing.',
})
```

## Breaking Changes

### ⚠️ Important Notes

1. **Blog List Endpoint**: The `GET /blogs` endpoint now returns paginated results. Update all calls to handle the new response format.

2. **Comment List Endpoint**: The `GET /blogs/:id/comments` endpoint now returns paginated results. Update all calls accordingly.

3. **Response Structure**: All list endpoints now include a `pagination` object in the response.

## Migration Guide

### Before (Old Format)

```typescript
// Old way - no pagination
const blogs = await fetch('/api/blogs')
const data = await blogs.json()
console.log(data) // Array of blogs
```

### After (New Format)

```typescript
// New way - with pagination
const response = await blogsAPI.getAllBlogs(1, 10)
console.log(response.data) // Array of blogs
console.log(response.pagination) // Pagination metadata
```

## Testing

Test the new API functions by:

1. Running the admin website: `cd apps/MishraShardendu22-Frontend-AdminWebsite && pnpm dev`
2. Navigate to blog-related pages
3. Verify pagination works correctly
4. Test filtering by search, tag, and author
5. Test comment pagination

## Next Steps

### Recommended Updates

1. **Update UI Components**
   - Add pagination controls to blog list pages
   - Add pagination controls to comment sections
   - Implement infinite scroll (optional)

2. **Add Loading States**
   - Show loading indicators during API calls
   - Implement skeleton loaders

3. **Error Handling**
   - Display user-friendly error messages
   - Handle network errors gracefully

4. **Optimize Performance**
   - Implement response caching
   - Add debounce to search inputs
   - Lazy load images

5. **Analytics**
   - Track page views
   - Monitor API performance
   - Track user engagement

## Files Modified

- `apps/MishraShardendu22-Frontend-AdminWebsite/src/utils/apiResponse.util.ts`
- `docs/BACKEND_BLOG_README.md`
- `apps/MishraShardendu22-Frontend-AdminWebsite/README.md`
- `docs/README.md`

## Files Created

- `docs/BLOG_API_INTEGRATION.md`
- `docs/API_UPDATE_SUMMARY.md` (this file)

## References

- [Blog Backend API Documentation](../MishraShardendu22-Backend-BlogWebsite/README.md)
- [Blog API Integration Guide](./BLOG_API_INTEGRATION.md)
- [Admin Website README](../apps/MishraShardendu22-Frontend-AdminWebsite/README.md)

## Support

For questions or issues:

- GitHub: [MishraShardendu22/MishraShardendu](https://github.com/MishraShardendu22/MishraShardendu)
- Email: mishrashardendu22@gmail.com
