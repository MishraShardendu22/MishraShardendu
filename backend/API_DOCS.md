# Portfolio Backend API Documentation

## Overview
This backend provides JWT-protected endpoints for managing portfolio data including projects, skills, and experience.

## Authentication

### Admin Authentication
- **POST** `/api/admin/auth`
- **Body**: 
  ```json
  {
    "email": "admin@example.com",
    "password": "your_password",
    "adminPass": "your_admin_password_from_env"
  }
  ```
- **Response**: Returns JWT token for authenticated requests

## JWT Protection
All write operations (POST, PUT, DELETE) require JWT authentication.
Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Projects API

### Protected Routes (Require JWT)
- **POST** `/api/projects` - Create a new project
- **PUT** `/api/projects/:id` - Update a project
- **DELETE** `/api/projects/:id` - Delete a project

### Public Routes (No JWT required)
- **GET** `/api/public/projects` - Get all projects
- **GET** `/api/public/projects/:id` - Get project by ID

### Project Model
```json
{
  "project_name": "string",
  "small_description": "string",
  "description": "string",
  "skills": ["string"],
  "project_repository": "string",
  "project_live_link": "string",
  "project_video": "string"
}
```

## Skills API

### Protected Routes (Require JWT)
- **POST** `/api/skills` - Create a new skill entry

### Public Routes (No JWT required)
- **GET** `/api/public/skills` - Get all skills

### Skills Model
```json
{
  "technologies": ["string"]
}
```

## Experience API

### Protected Routes (Require JWT)
- **POST** `/api/experience` - Create a new experience
- **PUT** `/api/experience/:id` - Update an experience
- **PATCH** `/api/experience/:id/archive` - Archive an experience

### Public Routes (No JWT required)
- **GET** `/api/public/experience` - Get all experiences
- **GET** `/api/public/experience/:id` - Get experience by ID

### Experience Model
```json
{
  "company_name": "string",
  "position": "string",
  "start_date": "string",
  "end_date": "string",
  "description": "string",
  "technologies": ["string"]
}
```

## Design Decisions

### Why No Delete for Experience?
- **Historical Value**: Work experiences are career milestones that should be preserved
- **Portfolio Purpose**: Even old experiences add value to a professional portfolio
- **Reference Value**: Past experiences might be referenced in the future
- **Alternative**: Use the archive endpoint instead of deletion

### JWT Protection Strategy
- **Write Operations**: Protected (POST, PUT, DELETE)
- **Read Operations**: Public (GET endpoints under `/api/public/`)
- **Reasoning**: Portfolio data should be publicly viewable, but only the owner can modify it

## Error Responses
All endpoints return standardized error responses:
```json
{
  "error": "Error message",
  "message": "Detailed error description"
}
```

## Environment Variables Required
- `JWT_SECRET`: Secret key for JWT signing
- `ADMIN_PASS`: Admin password for authentication
- `MONGODB_URI`: MongoDB connection string
- `DB_NAME`: Database name

## Testing the API

1. **Get JWT Token**:
   ```bash
   curl -X POST http://localhost:5000/api/admin/auth \
   -H "Content-Type: application/json" \
   -d '{"email":"admin@example.com","password":"password","adminPass":"your_admin_pass"}'
   ```

2. **Create a Project**:
   ```bash
   curl -X POST http://localhost:5000/api/projects \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer <your_jwt_token>" \
   -d '{"project_name":"My Project","description":"Project description","skills":["Go","React"]}'
   ```

3. **Get All Projects** (Public):
   ```bash
   curl http://localhost:5000/api/public/projects
   ```
