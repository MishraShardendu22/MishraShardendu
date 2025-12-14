# Blog Backend API Integration Guide

This guide provides comprehensive information about integrating with the Blog Backend API, including pagination support and best practices.

## Base URL

```
Production: https://mishrashardendu22-backend-blogwebsite.onrender.com/api
Development: http://localhost:3000/api
```

## Authentication

### JWT Token

Include the JWT token in the Authorization header for protected endpoints:

```
Authorization: Bearer <your_jwt_token>
```

### Token Storage

Store tokens securely:

- Web: `localStorage.getItem('authToken')`
- Mobile: Secure storage (KeyChain/KeyStore)

## Pagination

All list endpoints support pagination with the following query parameters:

### Query Parameters

| Parameter | Type   | Default | Description                    |
| --------- | ------ | ------- | ------------------------------ |
| `page`    | number | 1       | Page number (1-indexed)        |
| `limit`   | number | 10      | Items per page (max: 100)      |
| `search`  | string | -       | Search query (optional)        |
| `tag`     | string | -       | Filter by tag (optional)       |
| `author`  | number | -       | Filter by author ID (optional) |

### Response Format

All paginated endpoints return responses in this format:

```typescript
interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number // Current page number
    limit: number // Items per page
    total: number // Total number of items
    totalPages: number // Total number of pages
  }
}
```

## Blog Endpoints

### Get All Blogs

**Endpoint:** `GET /blogs`

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search in title and content
- `tag` (optional): Filter by tag
- `author` (optional): Filter by author ID

**Example Request:**

```bash
curl "https://mishrashardendu22-backend-blogwebsite.onrender.com/api/blogs?page=1&limit=10&search=react&tag=javascript"
```

**Example Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Introduction to React Hooks",
      "image": "https://example.com/image.jpg",
      "content": "React Hooks are...",
      "tags": ["react", "javascript", "hooks"],
      "authorId": 1,
      "createdAt": "2025-10-14T10:30:00.000Z",
      "updatedAt": "2025-10-14T10:30:00.000Z",
      "author": {
        "id": 1,
        "email": "owner@example.com",
        "name": "Jane Smith",
        "image": "https://example.com/avatar.jpg"
      },
      "authorProfile": {
        "firstName": "Jane",
        "lastName": "Smith",
        "avatar": "https://example.com/avatars/jane.jpg"
      },
      "comments": 15
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

### Get Single Blog

**Endpoint:** `GET /blogs/:id`

**Example Request:**

```bash
curl "https://mishrashardendu22-backend-blogwebsite.onrender.com/api/blogs/1"
```

**Example Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Introduction to React Hooks",
    "image": "https://example.com/image.jpg",
    "content": "Full blog content...",
    "tags": ["react", "javascript", "hooks"],
    "authorId": 1,
    "createdAt": "2025-10-14T10:30:00.000Z",
    "updatedAt": "2025-10-14T10:30:00.000Z",
    "author": {
      "id": 1,
      "email": "owner@example.com",
      "name": "Jane Smith",
      "image": "https://example.com/avatar.jpg"
    },
    "authorProfile": {
      "firstName": "Jane",
      "lastName": "Smith",
      "avatar": "https://example.com/avatars/jane.jpg"
    },
    "comments": 15
  }
}
```

### Create Blog

**Endpoint:** `POST /blogs`  
**Auth Required:** Yes (Owner only)

**Request Body:**

```json
{
  "title": "My New Blog Post",
  "content": "Blog content here...",
  "tags": ["technology", "programming"],
  "image": "https://example.com/thumbnail.jpg"
}
```

**Example Response:**

```json
{
  "success": true,
  "data": {
    "id": 3,
    "title": "My New Blog Post",
    "content": "Blog content here...",
    "tags": ["technology", "programming"],
    "image": "https://example.com/thumbnail.jpg",
    "authorId": 1,
    "orderId": 3,
    "createdAt": "2025-10-14T15:45:00.000Z",
    "updatedAt": "2025-10-14T15:45:00.000Z"
  }
}
```

### Update Blog

**Endpoint:** `PUT /blogs/:id`  
**Auth Required:** Yes (Owner only)

**Request Body:**

```json
{
  "title": "Updated Title",
  "content": "Updated content...",
  "tags": ["updated", "tags"],
  "image": "https://example.com/new-image.jpg"
}
```

### Partially Update Blog

**Endpoint:** `PATCH /blogs/:id`  
**Auth Required:** Yes (Owner only)

**Request Body:**

```json
{
  "tags": ["new", "tags"]
}
```

### Delete Blog

**Endpoint:** `DELETE /blogs/:id`  
**Auth Required:** Yes (Owner only)

**Example Response:**

```json
{
  "success": true,
  "message": "Blog deleted successfully"
}
```

### Get Blog Statistics

**Endpoint:** `GET /blogs/stats`

**Example Response:**

```json
{
  "success": true,
  "data": {
    "totalBlogs": 25,
    "totalComments": 150,
    "totalTags": 15,
    "recentBlogs": 5
  }
}
```

## Comment Endpoints

### Get Comments for Blog

**Endpoint:** `GET /blogs/:id/comments`

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example Request:**

```bash
curl "https://mishrashardendu22-backend-blogwebsite.onrender.com/api/blogs/1/comments?page=1&limit=10"
```

**Example Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "content": "Great article!",
      "userId": 2,
      "blogId": 1,
      "createdAt": "2025-10-14T11:00:00.000Z",
      "user": {
        "id": 2,
        "email": "user@example.com",
        "name": "John Doe",
        "isVerified": true,
        "profileImage": "https://example.com/avatar.jpg"
      },
      "userProfile": {
        "firstName": "John",
        "lastName": "Doe",
        "avatar": "https://example.com/avatars/john.jpg"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "totalPages": 2
  }
}
```

### Create Comment

**Endpoint:** `POST /blogs/:id/comments`  
**Auth Required:** Yes (Verified users only)

**Request Body:**

```json
{
  "content": "Great post! Thanks for sharing."
}
```

**Example Response:**

```json
{
  "success": true,
  "data": {
    "id": 16,
    "content": "Great post! Thanks for sharing.",
    "userId": 2,
    "blogId": 1,
    "createdAt": "2025-10-14T16:30:00.000Z",
    "user": {
      "id": 2,
      "name": "John Doe",
      "email": "user@example.com",
      "profileImage": "https://example.com/avatar.jpg"
    }
  }
}
```

### Delete Comment

**Endpoint:** `DELETE /blogs/:id/comments/:commentId`  
**Auth Required:** Yes (Comment author or blog owner)

**Example Response:**

```json
{
  "success": true,
  "message": "Comment deleted successfully"
}
```

## Frontend Integration Examples

### React/Preact Example

```typescript
import axios from 'axios'

const BASE_URL = 'https://mishrashardendu22-backend-blogwebsite.onrender.com/api'

// Get auth token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken')
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

// Fetch blogs with pagination
const fetchBlogs = async (page = 1, limit = 10, filters = {}) => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters,
    })

    const response = await axios.get(`${BASE_URL}/blogs?${params}`, {
      headers: getAuthHeaders(),
    })

    return response.data
  } catch (error) {
    console.error('Error fetching blogs:', error)
    throw error
  }
}

// Usage in component
const BlogList = () => {
  const [blogs, setBlogs] = useState([])
  const [pagination, setPagination] = useState({})
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const loadBlogs = async () => {
      const result = await fetchBlogs(currentPage, 10, {
        search: 'react',
        tag: 'javascript',
      })

      setBlogs(result.data)
      setPagination(result.pagination)
    }

    loadBlogs()
  }, [currentPage])

  return (
    <div>
      {blogs.map(blog => (
        <BlogCard key={blog.id} blog={blog} />
      ))}

      <Pagination
        current={pagination.page}
        total={pagination.totalPages}
        onChange={setCurrentPage}
      />
    </div>
  )
}
```

### Pagination Component Example

```typescript
interface PaginationProps {
  current: number
  total: number
  onChange: (page: number) => void
}

const Pagination = ({ current, total, onChange }: PaginationProps) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1)

  return (
    <div className="pagination">
      <button
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
      >
        Previous
      </button>

      {pages.map(page => (
        <button
          key={page}
          className={page === current ? 'active' : ''}
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        disabled={current === total}
        onClick={() => onChange(current + 1)}
      >
        Next
      </button>
    </div>
  )
}
```

## Best Practices

### 1. Error Handling

Always handle errors properly:

```typescript
try {
  const response = await blogsAPI.getAllBlogs(page, limit)
  // Handle success
} catch (error) {
  if (error.response?.status === 401) {
    // Handle unauthorized - redirect to login
  } else if (error.response?.status === 404) {
    // Handle not found
  } else {
    // Handle other errors
    console.error('Error:', error.message)
  }
}
```

### 2. Loading States

Show loading indicators during API calls:

```typescript
const [loading, setLoading] = useState(false)

const loadData = async () => {
  setLoading(true)
  try {
    const data = await blogsAPI.getAllBlogs()
    setBlogs(data.data)
  } finally {
    setLoading(false)
  }
}
```

### 3. Pagination State Management

Keep track of pagination state:

```typescript
interface PaginationState {
  page: number
  limit: number
  total: number
  totalPages: number
}

const [pagination, setPagination] = useState<PaginationState>({
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
})
```

### 4. Debounce Search Queries

Debounce search input to avoid excessive API calls:

```typescript
const [searchQuery, setSearchQuery] = useState('')
const [debouncedQuery] = useDebounce(searchQuery, 500)

useEffect(() => {
  if (debouncedQuery) {
    fetchBlogs(1, 10, { search: debouncedQuery })
  }
}, [debouncedQuery])
```

### 5. Cache Responses

Consider caching responses to improve performance:

```typescript
const cache = new Map()

const fetchBlogsWithCache = async (page, limit, filters) => {
  const key = JSON.stringify({ page, limit, filters })

  if (cache.has(key)) {
    return cache.get(key)
  }

  const response = await blogsAPI.getAllBlogs(page, limit, filters)
  cache.set(key, response)

  return response
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **Anonymous users**: 100 requests per 15 minutes
- **Authenticated users**: 1000 requests per 15 minutes
- **Owner**: Unlimited

Rate limit headers are included in responses:

- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Requests remaining
- `X-RateLimit-Reset`: Time when limit resets (Unix timestamp)

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

### Common Error Codes

| Code | Description                          |
| ---- | ------------------------------------ |
| 400  | Bad Request - Invalid parameters     |
| 401  | Unauthorized - Invalid token         |
| 403  | Forbidden - Insufficient permissions |
| 404  | Not Found - Resource doesn't exist   |
| 429  | Too Many Requests - Rate limited     |
| 500  | Internal Server Error                |

## Support

For issues or questions about the API:

- GitHub Issues: [MishraShardendu22-Backend-BlogWebsite](https://github.com/MishraShardendu22/MishraShardendu22-Backend-BlogWebsite/issues)
- Email: mishrashardendu22@gmail.com
