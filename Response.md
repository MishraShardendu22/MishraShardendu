### Admin Auth Response

```json
{
  "data": {
    "inline": {
      "id": "686f9f3a910cc13a3498be5d",
      "created_at": "2025-07-10T11:08:42.621Z",
      "updated_at": "2025-07-10T12:41:13.508Z"
    },
    "email": "shardendumishraupsc@gmail.com",
    "password": "$2a$10$8GHBtxMTuPINj/AOoRexUeCEw45d2geRdHukdmzT4AduIqb68bGxy",
    "admin_pass": "",
    "skills": ["C", "CPP", "NextJS", "JS"],
    "projects": null,
    "experiences": null,
    "certifications": null
  },
  "message": "User already exists",
  "status": 202,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
````

---

### Get Skills Response

```json
{
  "data": ["C", "CPP", "NextJS", "JS"],
  "message": "Skills retrieved successfully",
  "status": 200
}
```

---

### Add Skills Response

```json
{
  "data": ["C", "CPP", "NextJS", "JS", "C++", "MYSQL", "Gofr-dev"],
  "message": "Skills added successfully",
  "status": 200
}
```

---

### Get Projects Response

```json
{
  "data": [
    {
      "inline": {
        "id": "686fb7d7cbc4fbcfa0c66271",
        "created_at": "2025-07-10T12:53:43.201Z",
        "updated_at": "2025-07-10T12:53:43.201Z"
      },
      "project_name": "My Project",
      "small_description": "Short desc",
      "description": "Longer projecadsssssssssssssssssssssssssssssssssssssssssssssssst description",
      "skills": ["Go", "MongoDB"],
      "project_repository": "https://github.com/your/repo",
      "project_live_link": "https://your.live.link",
      "project_video": "https://your.video.link"
    }
  ],
  "message": "Projects retrieved successfully",
  "status": 200
}
```

---

### Add Project Response

```json
{
  "data": {
    "inline": {
      "id": "686fb7d7cbc4fbcfa0c66271",
      "created_at": "2025-07-10T12:53:43.201301736Z",
      "updated_at": "2025-07-10T12:53:43.201302519Z"
    },
    "project_name": "My Project",
    "small_description": "Short desc",
    "description": "Longer projecadsssssssssssssssssssssssssssssssssssssssssssssssst description",
    "skills": ["Go", "MongoDB"],
    "project_repository": "https://github.com/your/repo",
    "project_live_link": "https://your.live.link",
    "project_video": "https://your.video.link"
  },
  "message": "Project added successfully",
  "status": 200
}
```

---

### Get One Project Response

```json
{
  "data": {
    "inline": {
      "id": "686fb7cbcbc4fbcfa0c66270",
      "created_at": "2025-07-10T12:53:31.896Z",
      "updated_at": "2025-07-10T12:53:31.896Z"
    },
    "project_name": "My Project",
    "small_description": "Short desc",
    "description": "Longer projecadsssssssssssssssssssssssssssssssssssssssssssssssst description",
    "skills": ["Go", "MongoDB"],
    "project_repository": "https://github.com/your/repo",
    "project_live_link": "https://your.live.link",
    "project_video": "https://your.video.link"
  },
  "message": "Project retrieved successfully",
  "status": 200
}
```

---

### Update Project Response

```json
{
  "data": {
    "inline": {
      "id": "000000000000000000000000",
      "created_at": "0001-01-01T00:00:00Z",
      "updated_at": "0001-01-01T00:00:00Z"
    },
    "project_name": "Updated Project",
    "small_description": "Updated desc",
    "description": "Updated ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo description",
    "skills": ["Fiber", "Golang"],
    "project_repository": "https://github.com/updated/repo",
    "project_live_link": "https://updated.live.link",
    "project_video": "https://updated.video.link"
  },
  "message": "Project updated successfully",
  "status": 200
}
```

---

### Delete Project Response

```json
{
  "data": null,
  "message": "Project removed successfully",
  "status": 200
}
```

---

### Add Experience Response

```json
{
  "data": {
    "inline": {
      "id": "686fb816cbc4fbcfa0c66272",
      "created_at": "2025-07-10T12:54:46.433590807Z",
      "updated_at": "2025-07-10T12:54:46.433591203Z"
    },
    "company_name": "OpenAI",
    "position": "Backend Developer",
    "start_date": "2024-01-01",
    "end_date": "2024-06-30",
    "description": "Worked on Fiber-based backend services",
    "technologies": ["Go", "MongoDB", "Fiber"],
    "created_by": "",
    "projects": ["686ebf5b741f2bb9248b479f", "686ec16e741f2bb9248b47a1"],
    "company_logo": "https://company.logo/link",
    "certificate_url": "https://certificate.link",
    "images": ["https://img1.link", "https://img2.link"]
  },
  "message": "Experience added successfully",
  "status": 200
}
```

---

### Get Experiences (Empty) Response

```json
{
  "data": null,
  "message": "No experiences found",
  "status": 200
}
```

---

### Get One Experience Response

```json
{
  "data": {
    "inline": {
      "id": "686fb816cbc4fbcfa0c66272",
      "created_at": "2025-07-10T12:54:46.433Z",
      "updated_at": "2025-07-10T12:54:46.433Z"
    },
    "company_name": "OpenAI",
    "position": "Backend Developer",
    "start_date": "2024-01-01",
    "end_date": "2024-06-30",
    "description": "Worked on Fiber-based backend services",
    "technologies": ["Go", "MongoDB", "Fiber"],
    "created_by": "",
    "projects": ["686ebf5b741f2bb9248b479f", "686ec16e741f2bb9248b47a1"],
    "company_logo": "https://company.logo/link",
    "certificate_url": "https://certificate.link",
    "images": ["https://img1.link", "https://img2.link"]
  },
  "message": "Experience retrieved successfully",
  "status": 200
}
```

---

### Update Experience Response

```json
{
  "data": {
    "inline": {
      "id": "000000000000000000000000",
      "created_at": "0001-01-01T00:00:00Z",
      "updated_at": "0001-01-01T00:00:00Z"
    },
    "company_name": "OpenAI Inc.",
    "position": "Senior Backenqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeed Developer",
    "start_date": "2024-01-01",
    "end_date": "2024-12-31",
    "description": "Upgraded backend systems",
    "technologies": ["Go", "MongoDB", "Redis"],
    "created_by": "",
    "projects": ["686ebf5b741f2bb9248b479f"],
    "company_logo": "https://company.logo/updated",
    "certificate_url": "https://cert.link/updated",
    "images": ["https://img.link/1", "https://img.link/2"]
  },
  "message": "Experience updated successfully",
  "status": 200
}
```

---

### Delete Experience Response

```json
{
  "data": null,
  "message": "Experience removed successfully",
  "status": 200
}
```