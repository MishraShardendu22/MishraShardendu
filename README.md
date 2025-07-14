# MishraShardendu Portfolio

A modern, full-stack portfolio website for Shardendu Mishra — Engineer and software developer passionate about Go, AI, and building impactful tools.

## ✨ Features

- **Showcases**: Projects, skills, experiences, certifications, and education.
- **Admin Dashboard**: Secure (JWT-protected) admin panel to manage portfolio content.
- **Responsive UI**: Beautiful, mobile-friendly design with dark mode support.
- **API**: RESTful backend for portfolio data (projects, skills, experiences, certifications).
- **Live Stats**: GitHub, LeetCode, and other integrations.
- **Markdown Editor**: Rich content editing for project/experience descriptions.
- **Modern Animations**: Smooth transitions and interactive UI elements.

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** (App Router, React 19)
- **TypeScript**
- **Tailwind CSS** (custom themes, dark mode)
- **Radix UI** & **shadcn/ui** components
- **Zustand** (state management)
- **TipTap** (rich text/markdown editor)
- **Chart.js**, **Recharts** (data visualization)
- **Vercel Analytics**, **Speed Insights**

### Backend
- **Go** (Golang)
- **Fiber** (web framework)
- **MongoDB** (database, via mgm ODM)
- **JWT** (authentication)
- **REST API** (public and protected endpoints)
- **Docker-ready** (easy deployment)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Go (v1.24+)
- MongoDB

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
go mod tidy
go run main.go
```

> Configure environment variables in a `.env` file (see `backend/API_DOCS.md` for required variables).

## 🧑‍💻 Development Notes

- Built using [Cursor](https://www.cursor.so/) and [Wrap](https://www.wrap.so/) for rapid, AI-assisted development and refactoring.
- Modular, scalable codebase with clear separation of concerns.
- All content (projects, skills, etc.) is managed via the admin dashboard.

## 📄 API Documentation

See [`backend/API_DOCS.md`](backend/API_DOCS.md) for full API details and usage examples.

> Made with ❤️ by [Shardendu Mishra](https://github.com/MishraShardendu22)