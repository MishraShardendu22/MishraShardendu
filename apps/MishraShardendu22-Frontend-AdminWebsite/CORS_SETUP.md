# CORS Configuration for Admin Website

## Backend CORS Setup (Blog Backend)

The blog backend now properly handles CORS with improved configuration.

### What Changed:
- ✅ Better URL parsing with whitespace trimming
- ✅ Console logging to see allowed origins on startup  
- ✅ Better error messages when CORS blocks requests
- ✅ Removed deprecated `@types/bcryptjs` package

### Required Environment Variables on Backend:

```env
FRONTEND_URL="http://localhost:5173,http://localhost:3000,https://admin.mishrashardendu22.is-a.dev,https://mishrashardendu22.is-a.dev"
```

**Important**: 
- Include ALL domains that need access to the blog API
- No trailing slashes
- Comma-separated list
- No spaces (or they'll be auto-trimmed)

---

## Admin Website Setup

### Backend URLs Configured:

The admin website now uses two separate backend APIs:

1. **Portfolio/Personal Backend**: `https://portfolio-backend-2iw4.onrender.com/api`
   - Projects, Skills, Experience, Certifications

2. **Blog Backend**: `https://mishrashardendu22-backend-blogwebsite.onrender.com/api`
   - Blogs, Comments, Blog Reorder

### If You Get CORS Errors:

1. **Check backend environment variables** on Render.com:
   - Go to your blog backend on Render
   - Environment → Add `FRONTEND_URL` with admin URL
   - Example: `FRONTEND_URL=https://admin.mishrashardendu22.is-a.dev,https://mishrashardendu22.is-a.dev`

2. **Check backend logs** for CORS configuration:
   ```
   🔒 CORS Configuration:
      Allowed origins: https://admin.mishrashardendu22.is-a.dev, ...
   ```

3. **If origin is blocked**, you'll see:
   ```
   ⚠️  CORS blocked: https://your-domain.com
   ```

4. **Add your domain** to the `FRONTEND_URL` environment variable

---

## Testing

### Local Development:
```bash
# Blog backend should have:
FRONTEND_URL="http://localhost:5173,http://localhost:3000"
```

### Production:
```bash
# Blog backend should have:
FRONTEND_URL="https://admin.mishrashardendu22.is-a.dev,https://mishrashardendu22.is-a.dev"
```

---

## Quick Fixes

### CORS Error?
1. Add your domain to backend's `FRONTEND_URL`
2. Redeploy backend
3. Clear browser cache
4. Test again

### 404 on /blogs/reorder?
✅ Already fixed - admin website now uses correct blog backend URL

---

## Files Modified

### Blog Backend:
- `/src/index.ts` - Improved CORS handling
- `/package.json` - Removed deprecated package
- `/.env.example` - Added CORS documentation

### Admin Frontend:  
- `/src/utils/api.ts` - Added separate `blogApi` client
- `/src/utils/apiResponse.util.ts` - All blog APIs use `blogApi`
- `/.env.example` - Documented backend URLs
