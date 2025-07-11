# Postman Testing Guide for Portfolio Backend API

## Overview
This guide provides comprehensive instructions for testing the Portfolio Backend API using Postman. It includes collection setup, environment configuration, and detailed test scenarios.

## Prerequisites
- Postman installed on your machine
- Portfolio Backend API running locally
- MongoDB database connected and running

## Quick Setup

### 1. Environment Setup
Create a new environment in Postman with these variables:

**Environment Name**: `Portfolio API Development`

| Variable | Initial Value | Current Value |
|----------|---------------|---------------|
| `base_url` | `http://localhost:5000` | `http://localhost:5000` |
| `jwt_token` | | (Will be set automatically) |
| `admin_email` | `admin@example.com` | `admin@example.com` |
| `admin_password` | `yourpassword` | `yourpassword` |
| `admin_pass` | `your_admin_password` | `your_admin_password` |
| `project_id` | | (Will be set automatically) |
| `experience_id` | | (Will be set automatically) |

### 2. Collection Structure
Create a new collection named `Portfolio Backend API` with the following folder structure:

```
Portfolio Backend API/
├── 01. Authentication/
│   └── Admin Register/Login
├── 02. Skills/
│   ├── Get Skills
│   └── Add Skills
├── 03. Projects/
│   ├── Get All Projects
│   ├── Get Project by ID
│   ├── Add Project
│   ├── Update Project
│   └── Delete Project
├── 04. Experiences/
│   ├── Get All Experiences
│   ├── Get Experience by ID
│   ├── Add Experience
│   ├── Update Experience
│   └── Delete Experience
└── 05. Utility/
    └── Test Endpoint
```

## Detailed Endpoint Testing

### 1. Authentication

#### Admin Register/Login
- **Method**: POST
- **URL**: `{{base_url}}/api/admin/auth`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body** (raw JSON):
  ```json
  {
    "email": "{{admin_email}}",
    "password": "{{admin_password}}",
    "admin_pass": "{{admin_pass}}"
  }
  ```

**Test Script** (Tests tab):
```javascript
pm.test("Status code is 201 or 202", function () {
    pm.expect(pm.response.code).to.be.oneOf([201, 202]);
});

pm.test("Response has token", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.token).to.not.be.undefined;
    pm.environment.set("jwt_token", jsonData.token);
});

pm.test("Response has user data", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.not.be.undefined;
    pm.expect(jsonData.data.email).to.eql(pm.environment.get("admin_email"));
});
```

### 2. Skills Management

#### Get Skills
- **Method**: GET
- **URL**: `{{base_url}}/api/skills`
- **Headers**: 
  ```
  Authorization: Bearer {{jwt_token}}
  ```

**Test Script**:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has skills data", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.not.be.undefined;
});
```

#### Add Skills
- **Method**: POST
- **URL**: `{{base_url}}/api/skills`
- **Headers**: 
  ```
  Authorization: Bearer {{jwt_token}}
  Content-Type: application/json
  ```
- **Body** (raw JSON):
  ```json
  {
    "skills": ["JavaScript", "Go", "React", "MongoDB", "Docker", "Kubernetes"]
  }
  ```

**Test Script**:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Skills added successfully", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.message).to.include("Skills added successfully");
    pm.expect(jsonData.data).to.be.an('array');
});
```

### 3. Projects Management

#### Get All Projects
- **Method**: GET
- **URL**: `{{base_url}}/api/projects`
- **Headers**: 
  ```
  Authorization: Bearer {{jwt_token}}
  ```

**Test Script**:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has projects data", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.not.be.undefined;
});
```

#### Add Project
- **Method**: POST
- **URL**: `{{base_url}}/api/projects`
- **Headers**: 
  ```
  Authorization: Bearer {{jwt_token}}
  Content-Type: application/json
  ```
- **Body** (raw JSON):
  ```json
  {
    "project_name": "Portfolio Website",
    "small_description": "Personal portfolio website showcasing my work",
    "description": "A full-stack portfolio website built with React frontend and Go backend, featuring responsive design and modern UI components",
    "skills": ["React", "Go", "MongoDB", "Fiber", "JWT"],
    "project_repository": "https://github.com/MishraShardendu22/portfolio",
    "project_live_link": "https://portfolio.mishrashardendu.com",
    "project_video": "https://youtube.com/watch?v=dQw4w9WgXcQ"
  }
  ```

**Test Script**:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Project added successfully", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.message).to.include("Project added successfully");
    pm.expect(jsonData.data.id).to.not.be.undefined;
    pm.environment.set("project_id", jsonData.data.id);
});
```

#### Get Project by ID
- **Method**: GET
- **URL**: `{{base_url}}/api/projects/{{project_id}}`
- **Headers**: 
  ```
  Authorization: Bearer {{jwt_token}}
  ```

**Test Script**:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Project retrieved successfully", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.message).to.include("Project retrieved successfully");
    pm.expect(jsonData.data.project_name).to.not.be.undefined;
});
```

#### Update Project
- **Method**: PUT
- **URL**: `{{base_url}}/api/projects/{{project_id}}`
- **Headers**: 
  ```
  Authorization: Bearer {{jwt_token}}
  Content-Type: application/json
  ```
- **Body** (raw JSON):
  ```json
  {
    "project_name": "Updated Portfolio Website",
    "small_description": "Updated personal portfolio website with new features",
    "description": "An updated full-stack portfolio website with enhanced features, built with React frontend and Go backend",
    "skills": ["React", "Go", "MongoDB", "Fiber", "JWT", "Docker"],
    "project_repository": "https://github.com/MishraShardendu22/portfolio",
    "project_live_link": "https://portfolio.mishrashardendu.com",
    "project_video": "https://youtube.com/watch?v=dQw4w9WgXcQ"
  }
  ```

**Test Script**:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Project updated successfully", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.message).to.include("Project updated successfully");
    pm.expect(jsonData.data.project_name).to.include("Updated");
});
```

#### Delete Project
- **Method**: DELETE
- **URL**: `{{base_url}}/api/projects/{{project_id}}`
- **Headers**: 
  ```
  Authorization: Bearer {{jwt_token}}
  ```

**Test Script**:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Project removed successfully", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.message).to.include("Project removed successfully");
});
```

### 4. Experiences Management

#### Get All Experiences
- **Method**: GET
- **URL**: `{{base_url}}/api/experiences`
- **Headers**: 
  ```
  Authorization: Bearer {{jwt_token}}
  ```

**Test Script**:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has experiences data", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.not.be.undefined;
});
```

#### Add Experience
- **Method**: POST
- **URL**: `{{base_url}}/api/experiences`
- **Headers**: 
  ```
  Authorization: Bearer {{jwt_token}}
  Content-Type: application/json
  ```
- **Body** (raw JSON):
  ```json
  {
    "company_name": "Tech Innovation Corp",
    "position": "Software Developer and Engineer",
    "start_date": "2023-01-01",
    "end_date": "2023-12-31",
    "description": "Developed and maintained web applications using modern technologies. Collaborated with cross-functional teams to deliver high-quality software solutions.",
    "technologies": ["React", "Node.js", "MongoDB", "Docker", "AWS"],
    "company_logo": "https://example.com/tech-innovation-logo.png",
    "certificate_url": "https://example.com/certificates/tech-innovation-cert.pdf",
    "images": ["https://example.com/images/office1.jpg", "https://example.com/images/team.jpg"]
  }
  ```

**Test Script**:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Experience added successfully", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.message).to.include("Experience added successfully");
    pm.expect(jsonData.data.id).to.not.be.undefined;
    pm.environment.set("experience_id", jsonData.data.id);
});
```

#### Get Experience by ID
- **Method**: GET
- **URL**: `{{base_url}}/api/experiences/{{experience_id}}`
- **Headers**: 
  ```
  Authorization: Bearer {{jwt_token}}
  ```

**Test Script**:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Experience retrieved successfully", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.message).to.include("Experience retrieved successfully");
    pm.expect(jsonData.data.company_name).to.not.be.undefined;
});
```

#### Update Experience
- **Method**: PUT
- **URL**: `{{base_url}}/api/experiences/{{experience_id}}`
- **Headers**: 
  ```
  Authorization: Bearer {{jwt_token}}
  Content-Type: application/json
  ```
- **Body** (raw JSON):
  ```json
  {
    "company_name": "Updated Tech Innovation Corp",
    "position": "Senior Software Developer and Engineer",
    "start_date": "2023-01-01",
    "end_date": "2024-12-31",
    "description": "Updated: Led development of web applications using cutting-edge technologies. Mentored junior developers and architected scalable solutions.",
    "technologies": ["React", "Node.js", "MongoDB", "Docker", "AWS", "Kubernetes"],
    "company_logo": "https://example.com/updated-tech-innovation-logo.png",
    "certificate_url": "https://example.com/certificates/updated-tech-innovation-cert.pdf",
    "images": ["https://example.com/images/new-office.jpg", "https://example.com/images/updated-team.jpg"]
  }
  ```

**Test Script**:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Experience updated successfully", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.message).to.include("Experience updated successfully");
    pm.expect(jsonData.data.company_name).to.include("Updated");
});
```

#### Delete Experience
- **Method**: DELETE
- **URL**: `{{base_url}}/api/experiences/{{experience_id}}`
- **Headers**: 
  ```
  Authorization: Bearer {{jwt_token}}
  ```

**Test Script**:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Experience removed successfully", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.message).to.include("Experience removed successfully");
});
```

### 5. Utility Endpoints

#### Test Endpoint
- **Method**: GET
- **URL**: `{{base_url}}/api/test`

**Test Script**:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Test endpoint working", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.message).to.include("Test endpoint");
});
```

## Testing Scenarios

### 1. Complete Authentication Flow
1. **Admin Register/Login**: Test both registration and login scenarios
2. **Token Validation**: Verify JWT token is returned and stored
3. **Unauthorized Access**: Test endpoints without token (should return 401)

### 2. Skills Management Flow
1. **Get Skills** (Initially empty)
2. **Add Skills** with valid data
3. **Get Skills** (Should return added skills)
4. **Add More Skills** (Should append to existing)

### 3. Projects CRUD Flow
1. **Get All Projects** (Initially empty)
2. **Add Project** with complete data
3. **Get All Projects** (Should return added project)
4. **Get Project by ID** using the returned project ID
5. **Update Project** with modified data
6. **Delete Project** using the project ID
7. **Get All Projects** (Should be empty again)

### 4. Experiences CRUD Flow
1. **Get All Experiences** (Initially empty)
2. **Add Experience** with complete data
3. **Get All Experiences** (Should return added experience)
4. **Get Experience by ID** using the returned experience ID
5. **Update Experience** with modified data
6. **Delete Experience** using the experience ID
7. **Get All Experiences** (Should be empty again)

## Error Testing Scenarios

### 1. Authentication Errors
- **Invalid Admin Password**: Use wrong admin_pass
- **Missing Fields**: Omit required fields in login
- **Invalid Credentials**: Use wrong email/password combination

### 2. Authorization Errors
- **Missing Token**: Remove Authorization header
- **Invalid Token**: Use malformed or expired token
- **Expired Token**: Test with old token (if JWT has expiration)

### 3. Validation Errors
- **Empty Skills Array**: Send empty skills array
- **Missing Required Fields**: Omit required fields in project/experience creation
- **Invalid Object ID**: Use invalid MongoDB ObjectID format

### 4. Resource Not Found
- **Non-existent Project**: Get project with invalid ID
- **Non-existent Experience**: Get experience with invalid ID
- **Delete Non-existent**: Try to delete non-existent resources

## Collection Variables for Dynamic Testing

Add these to your collection variables:

```javascript
// Pre-request Script for the collection
pm.globals.set("timestamp", Date.now());
pm.globals.set("random_string", Math.random().toString(36).substring(7));
```

## Pre-request Scripts

### For Authentication endpoints:
```javascript
// Clear token before authentication
pm.environment.unset("jwt_token");
```

### For authenticated endpoints:
```javascript
// Check if token exists
if (!pm.environment.get("jwt_token")) {
    throw new Error("JWT token not found. Please authenticate first.");
}
```

## Newman (CLI) Testing

To run the collection via command line:

```bash
# Install Newman
npm install -g newman

# Run collection
newman run "Portfolio Backend API.postman_collection.json" \
  -e "Portfolio API Development.postman_environment.json" \
  --reporters html,cli \
  --reporter-html-export newman-report.html
```

## Tips for Effective Testing

1. **Run Tests in Order**: Start with authentication, then proceed with other endpoints
2. **Use Environment Variables**: Store dynamic values like IDs and tokens
3. **Test Both Success and Error Cases**: Include negative test scenarios
4. **Validate Response Structure**: Check not just status codes but response format
5. **Monitor Performance**: Use Postman's performance monitoring features
6. **Automate with Newman**: Set up CI/CD integration for automated testing

## Common Issues and Solutions

### 1. Token Expiration
- **Issue**: 401 Unauthorized after some time
- **Solution**: Re-authenticate to get a new token

### 2. MongoDB Connection
- **Issue**: 500 Internal Server Error
- **Solution**: Ensure MongoDB is running and connection string is correct

### 3. CORS Issues
- **Issue**: CORS errors in browser
- **Solution**: Check CORS configuration in server

### 4. Invalid ObjectID
- **Issue**: 400 Bad Request for invalid ID
- **Solution**: Use valid MongoDB ObjectID format (24-character hex string)

## Environment-Specific Testing

### Development Environment
```
base_url: http://localhost:5000
```

### Staging Environment
```
base_url: https://staging-api.example.com
```

### Production Environment
```
base_url: https://api.example.com
```