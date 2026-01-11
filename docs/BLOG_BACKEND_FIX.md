# Blog Backend API Fix - 404 Error Resolution

## Problem
The admin website was getting a 404 error when calling `/blogs/reorder`:
```
Request failed with status code 404
URL: https://portfolio-backend-2iw4.onrender.com/api/blogs/reorder
```

## Root Cause
The admin website was configured to call only one backend (`portfolio-backend-2iw4.onrender.com`), but blog-related endpoints are hosted on a separate backend server (`mishrashardendu22-backend-blogwebsite.onrender.com`).

## Solution Implemented
Created a separate API client specifically for blog-related endpoints that points to the correct backend.

### Files Modified

#### 1. `/apps/MishraShardendu22-Frontend-AdminWebsite/src/utils/api.ts`
- Added `blogBaseURL` configuration
- Created new `blogApi` axios instance for blog endpoints
- Configured to use `VITE_BLOG_BACKEND` env variable or fallback to production URL
- Applied same interceptors (auth, error handling) to both API clients

#### 2. `/apps/MishraShardendu22-Frontend-AdminWebsite/src/utils/apiResponse.util.ts`
- Updated import to include `blogApi`
- Changed all blog-related API calls to use `blogApi`:
  - `getAllBlogs()`
  - `getBlogById()`
  - `createBlog()`
  - `updateBlog()`
  - `patchBlog()`
  - `deleteBlog()`
  - `getBlogStats()`
  - `getReorderList()` ✅ (This fixes the 404 error)
  - `updateReorder()`
- Changed all comment-related API calls to use `blogApi`:
  - `getCommentsByBlogId()`
  - `createComment()`
  - `deleteComment()`

#### 3. `/apps/MishraShardendu22-Frontend-AdminWebsite/.env.example` (Created)
```env
VITE_BACKEND_1=https://portfolio-backend-2iw4.onrender.com
VITE_BLOG_BACKEND=https://mishrashardendu22-backend-blogwebsite.onrender.com
```

## Backend URLs

### Portfolio/Personal Backend
- **URL**: `https://portfolio-backend-2iw4.onrender.com/api`
- **Endpoints**: Projects, Skills, Experience, Volunteer, Certifications, Admin Auth

### Blog Backend  
- **URL**: `https://mishrashardendu22-backend-blogwebsite.onrender.com/api`
- **Endpoints**: Blogs, Comments, Blog Stats, Blog Reorder

## How It Works

1. **Development**: The `blogApi` client uses absolute URLs, so it bypasses Vite's proxy
2. **Production**: Same behavior - direct calls to the blog backend
3. **Configuration**: Optional `VITE_BLOG_BACKEND` env variable for custom backend URL

## Testing

After deployment, the admin website will now:
- ✅ Successfully call `/blogs/reorder` on the correct backend
- ✅ Authenticate using the same JWT token across both backends
- ✅ Handle errors consistently with the same interceptors

## Next Steps

1. **Rebuild and redeploy** the admin website
2. **Verify** the blog reorder page loads without 404 errors
3. **(Optional)** Create a `.env` file locally if you need to override backend URLs for development

## Migration Notes

- No breaking changes for existing functionality
- All non-blog endpoints continue using the original `api` client
- Blog and comment endpoints now use the dedicated `blogApi` client
- Both clients share the same authentication and error handling logic
