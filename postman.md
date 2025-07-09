# Portfolio Backend API Documentation

This document provides all the API routes for testing the Portfolio Backend with Postman.

## Base URL
```
http://localhost:5000
```

## Authentication
Most protected routes require a JWT token. First, get a token by logging in as admin.

### Headers for Protected Routes
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

---

## 1. Admin Authentication

### Admin Login/Register
**POST** `/api/admin/auth`

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "your_password",
  "adminPass": "your_admin_password_from_env"
}
```

**Response:**
```json
{
  "status": 201,
  "message": "Admin registered successfully",
  "data": {
    "id": "user_id",
    "email": "admin@example.com"
  },
  "token": "jwt_token_here"
}
```

---

## 2. Projects API

### Create Project (Protected)
**POST** `/api/projects`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "project_name": "My Awesome Project",
  "small_description": "A brief description",
  "description": "Detailed description of the project",
  "skills": ["React", "Node.js", "MongoDB"],
  "project_repository": "https://github.com/user/repo",
  "project_live_link": "https://project.com",
  "project_video": "https://youtube.com/watch?v=..."
}
```

### Get All Projects (Public)
**GET** `/api/public/projects`

### Get Project by ID (Public)
**GET** `/api/public/projects/:id`

### Update Project (Protected)
**PUT** `/api/projects/:id`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "project_name": "Updated Project Name",
  "small_description": "Updated brief description",
  "description": "Updated detailed description",
  "skills": ["React", "Node.js", "MongoDB", "TypeScript"],
  "project_repository": "https://github.com/user/updated-repo",
  "project_live_link": "https://updated-project.com",
  "project_video": "https://youtube.com/watch?v=updated..."
}
```

### Delete Project (Protected)
**DELETE** `/api/projects/:id`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

---

## 3. Experience API

### Create Experience (Protected)
**POST** `/api/experience`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "company_name": "Tech Company Inc.",
  "position": "Software Engineer",
  "start_date": "2023-01-15",
  "end_date": "2024-01-15",
  "description": "Worked on various projects and technologies",
  "technologies": ["React", "Node.js", "PostgreSQL"]
}
```

### Get All Experiences (Public)
**GET** `/api/public/experience`

### Get Experience by ID (Public)
**GET** `/api/public/experience/:id`

### Update Experience (Protected)
**PUT** `/api/experience/:id`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "company_name": "Updated Tech Company Inc.",
  "position": "Senior Software Engineer",
  "start_date": "2023-01-15",
  "end_date": "2024-06-15",
  "description": "Updated description of work experience",
  "technologies": ["React", "Node.js", "PostgreSQL", "Docker"]
}
```

### Archive Experience (Protected)
**PATCH** `/api/experience/:id/archive`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

---

## 4. Skills API

### Create Skill (Protected)
**POST** `/api/skills`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "technologies": ["JavaScript", "TypeScript", "React", "Node.js", "MongoDB"]
}
```

### Get All Skills (Public)
**GET** `/api/public/skills`

---

## 5. Test Route

### Test Endpoint (Public)
**GET** `/api/test`

**Response:**
```json
{
  "status": 200,
  "message": "Test endpoint",
  "data": null,
  "token": ""
}
```

---

## Sample Testing Flow

1. **First, test the admin authentication:**
   - POST `/api/admin/auth` with admin credentials
   - Copy the JWT token from the response

2. **Test protected routes:**
   - Use the JWT token in Authorization header for protected routes
   - Create some projects, experiences, and skills

3. **Test public routes:**
   - Test all the public GET endpoints without authentication
   - Verify that data is returned correctly

4. **Test CRUD operations:**
   - Create resources using POST endpoints
   - Retrieve them using GET endpoints
   - Update them using PUT endpoints
   - Delete projects using DELETE endpoint

---

## Error Responses

All endpoints return standardized error responses:

```json
{
  "status": 400,
  "message": "Error message description",
  "data": null,
  "token": ""
}
```

Common status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

---

## Environment Variables Required

Make sure these environment variables are set:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
DB_NAME=your_database_name
ADMIN_PASS=your_admin_password
JWT_SECRET=your_jwt_secret_key
CORS_ALLOW_ORIGINS=*
LOG_LEVEL=info
ENVIRONMENT=development
```
