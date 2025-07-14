# AI-Powered Ticketing Platform

A full-stack ticketing platform built using the **MERN Stack**, powered by **Inngest** for background workflows and **Agentic AI** for automated ticket analysis and routing.

---

## 🔧 Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Express.js + Node.js
- **Database**: MongoDB (Mongoose)
- **Workflow Orchestration**: Inngest
- **AI Layer**: Agentic AI (LLM-based ticket analysis)

---

## 🚀 Features

- User authentication (Signup/Login)
- Ticket creation with title + description
- AI-powered skill-based moderator assignment
- Inngest workers for:
  - Ticket analysis using AI
  - Moderator selection & notification
  - Email workflows (sendMail utils)
- Modular Inngest functions with retries and error handling

---

## 📂 Folder Structure

```bash
backend/
  ├── controllers/
  ├── model/
  ├── routes/
  ├── utils/
  ├── inngest/
  │   ├── index.inngest.js
  │   └── workers/
frontend/
  └── src/
      ├── components/
      ├── pages/
      └── auth/
````

---

## 🧠 AI Integration

* Uses LLM (via Agentic AI util) to:

  * Analyze ticket description
  * Extract related skills
  * Match suitable moderators using `$elemMatch` in MongoDB

---

## 🔁 Inngest Workflow

Example pipeline:

```
User Signup → inngest emits `user/signup` → send welcome email

Ticket Created → inngest emits `ticket/create`
    → Step 1: Analyze with AI
    → Step 2: Select best-fit moderator
    → Step 3: Notify moderator
```

---

## 🛠 Setup Instructions

1. **Clone repo**
   `git clone <repo_url>`

2. **Install dependencies**

```bash
cd backend && npm install
cd frontend && npm install
```

3. **Environment Setup**
   Create `.env` in backend with:

```
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<secret>
INNGEST_EVENT_KEY=<key>
AI_API_KEY=<agentic-ai-key>
```

4. **Run the app**

```bash
# Backend
npm run dev

# Frontend
npm run dev
```

---

## 📬 API Routes (Sample)

* `POST /api/tickets` - Create Ticket
* `GET /api/tickets` - Get All Tickets
* `POST /api/auth/signup` - Signup
* `POST /api/auth/login` - Login
