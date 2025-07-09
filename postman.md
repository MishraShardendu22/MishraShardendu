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

**Required Fields:** `email`, `password`, `adminPass`

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

**Note:** All protected routes require JWT authorization. Users can only update/delete their own projects.

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

**Required Fields:** `project_name`, `description`

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

**Note:** All protected routes require JWT authorization. Users can only update/archive their own experiences.

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
  "technologies": ["React", "Node.js", "PostgreSQL"],
  "projects": [
    {
      "project_name": "Internal Dashboard",
      "description": "Built internal analytics dashboard",
      "skills": ["React", "Node.js"]
    }
  ],
  "company_logo": "https://example.com/logo.png",
  "certificate_url": "https://example.com/certificate.pdf",
  "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
}
```

**Required Fields:** `company_name`, `position`, `start_date`, `description`

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
  "technologies": ["React", "Node.js", "PostgreSQL", "Docker"],
  "projects": [
    {
      "project_name": "Updated Internal Dashboard",
      "description": "Enhanced analytics dashboard with new features",
      "skills": ["React", "Node.js", "Docker"]
    }
  ],
  "company_logo": "https://example.com/updated-logo.png",
  "certificate_url": "https://example.com/updated-certificate.pdf",
  "images": ["https://example.com/updated-image1.jpg", "https://example.com/updated-image2.jpg"]
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

**Note:** Skills creation requires JWT authorization.

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

**Required Fields:** At least one technology in the `technologies` array

### Get All Skills (Public)
**GET** `/api/public/skills`

---

## 5. Certifications & Achievements API

**Note:** All protected routes require JWT authorization. Users can only update/delete their own certifications.

### Create Certification (Protected)
**POST** `/api/certifications`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "AWS Certified Solutions Architect",
  "description": "Professional certification for AWS cloud architecture",
  "projects": [
    {
      "project_name": "Cloud Migration Project",
      "description": "Migrated legacy systems to AWS",
      "skills": ["AWS", "Docker", "Terraform"]
    }
  ],
  "skills": ["AWS", "Cloud Architecture", "EC2", "S3"],
  "certificate_url": "https://example.com/aws-cert.pdf",
  "images": ["https://example.com/cert-image1.jpg", "https://example.com/cert-image2.jpg"],
  "issuer": "Amazon Web Services",
  "issue_date": "2024-01-15",
  "expiry_date": "2027-01-15"
}
```

**Required Fields:** `title`, `description`

### Get All Certifications (Public)
**GET** `/api/public/certifications`

### Get Certification by ID (Public)
**GET** `/api/public/certifications/:id`

### Update Certification (Protected)
**PUT** `/api/certifications/:id`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated AWS Certified Solutions Architect",
  "description": "Updated professional certification for AWS cloud architecture",
  "projects": [
    {
      "project_name": "Advanced Cloud Migration Project",
      "description": "Enhanced migration with multi-region deployment",
      "skills": ["AWS", "Docker", "Terraform", "Kubernetes"]
    }
  ],
  "skills": ["AWS", "Cloud Architecture", "EC2", "S3", "Lambda"],
  "certificate_url": "https://example.com/updated-aws-cert.pdf",
  "images": ["https://example.com/updated-cert-image1.jpg"],
  "issuer": "Amazon Web Services",
  "issue_date": "2024-01-15",
  "expiry_date": "2027-01-15"
}
```

### Delete Certification (Protected)
**DELETE** `/api/certifications/:id`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

---

## 6. Test Route

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
   - Create some projects, experiences, skills, and certifications

3. **Test public routes:**
   - Test all the public GET endpoints without authentication
   - Verify that data is returned correctly

4. **Test CRUD operations:**
   - Create resources using POST endpoints
   - Retrieve them using GET endpoints
   - Update them using PUT endpoints
   - Delete projects and certifications using DELETE endpoints

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

