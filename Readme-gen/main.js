import fetch from 'node-fetch';

const url = 'https://portfolio-backend-i96y.onrender.com/api/projects';
const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pc2hyYXNoYXJkZW5kdTIyQGdtYWlsLmNvbSIsImV4cCI6MTc1MjY1NTk1NiwiaWQiOiI2ODcxNzQyOTU4ZDk3N2MwOTgzMTZhNGUifQ.DUYlUyCH_AFqhExOrpc9fRiY1MowqWbZfMDeguQvyac';

const projects = [
    {
    "project_name": "Dragon-Ball-Api - (Open Sourced To Keploy)",
    "small_description": "A RESTful API for Dragon Ball trivia with JWT authentication and comprehensive testing",
    "description": `
## Dragon Ball RESTful API - Keploy Collection

**Repository:** [Keploy Public APIs Collection](https://github.com/keploy/public-apis-collection#anime--manga)  
**Merged PR:** [#105 - Dragon Ball API Contribution](https://github.com/keploy/public-apis-collection/pull/105)

The **only solo developer-built API** featured in Keploy’s official public APIs collection, standing among submissions from organizations.

---

### 🏗️ Backend Architecture

- **Express.js + TypeScript**: Fully typed, production-grade REST API.
- **MongoDB + Mongoose**: Structured, scalable schema for characters, series, and trivia data.
- **JWT**: Secure role-based authentication and token management.
- **CORS**: Proper handling of cross-origin requests for safe frontend access.

---

### 📘 API Documentation

- **Swagger/OpenAPI 3.0**: Fully interactive, auto-generated API docs.
- **Structured Error Responses**: Descriptive, standardized error handling.
- **Rate Limiting**: Prevents brute-force and abuse scenarios.

---

### 🧪 Testing & QA

- **Keploy AI Testing**: Snapshot-based regression testing with AI verification.
- **Jest**: Coverage for both unit and integration layers.
- **Supertest**: Endpoint behavior validation with real HTTP assertions.
- **GitHub Actions**: CI/CD pipeline for automated test, build, and deploy.

---

### 🔥 Key Features

- **Comprehensive Trivia Dataset**: Covers Dragon Ball, Z, GT, and Super.
- **Dual Access Layer**: Public APIs plus gated admin management routes.
- **Dynamic Question System**: Admin interface to add/update trivia.
- **Performance Optimization**: Indexed queries and lean data responses.
"`,
    "skills": [
      "Keploy AI Testing", "TypeScript", "Express.js", "Mongoose", "JWT", "Swagger",
      "OpenAPI", "Keploy", "Jest", "Supertest", "GitHub Actions", "CORS",
      "Rate Limiting", "Nodemon"
    ],
    "project_repository": "https://github.com/MishraShardendu22/Dragon-Ball-Api",
    "project_live_link": "https://youtu.be/W11A4M4QZgU?si=W11A4M4QZgU?si=XFZLLlFZjplIQWaS",
    "project_video": "https://youtu.be/W11A4M4QZgU?si=XFZLLlFZjplIQWaS"
  },
];

async function sendJSON(project) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    console.log('Project sent successfully:', project.project_name);
  } catch (err) {
    console.error('Error sending project:', err);
  }
}

(async () => {
  for (const project of projects) {
    await sendJSON(project);
  }
})();
