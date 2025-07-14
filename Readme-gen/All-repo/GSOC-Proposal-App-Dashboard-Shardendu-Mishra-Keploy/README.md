# GitHub User Stats Application

This application displays detailed statistics for GitHub users and their repositories. It is built using a combination of modern web technologies to provide a responsive, user-friendly interface and robust backend support.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Profile & Stats:** Fetch and display all relevant details and statistics of a GitHub user.
- **Repository Insights:** View detailed information and stats for each repository.
- **Secure Authentication:** Integrated authentication using **auth.js**.
- **Modern UI:** Responsive design built with **Next.js**, **React.js**, **Tailwind CSS**, and **Shadcn UI**.
- **Fast Backend:** Server built with **Go** using the **Go-Fiber** framework.

## Tech Stack
- **Frontend:**
  - Next.js
  - React.js
  - Tailwind CSS
  - Shadcn UI
- **Authentication:**
  - auth.js
- **Backend:**
  - Go
  - Go-Fiber

## Demo
- **Demo Video:** [Watch the demo on Loom](https://www.loom.com/share/dee0f5f41ba242cca0c3e43f1fc198aa?sid=e228765b-fa4b-4f3b-bd79-7a790ad453ad)
- **Live Dashboard:** [View the live dashboard](https://keploy-dashboard-shardendu-mishra-gsoc.vercel.app/)
- **Roadmap of App:** [Notion Roadmap](https://www.notion.so/GSoC-1c5a76fcf2f98076ad1afd3c43ad3ba8)

## Installation

### Prerequisites
- Node.js (v14 or above)
- Go (v1.16 or above)
- Git

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/github-user-stats.git
   cd github-user-stats
   ```
2. **Install dependencies for the frontend:**
   ```bash
   cd frontend
   npm install --legacy-peer-deps
   ```
3. **Install dependencies for the backend:**
   ```bash
   cd ../backend
   go mod download
   ```
4. **Environment Variables:**
   - Create a `.env` file in both the `frontend` and `backend` directories with the necessary environment variables. Refer to the sample files (`.env.example`) for guidance.

## Usage

### Running the Frontend
1. Navigate to the `frontend` directory.
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open your browser and visit `http://localhost:3000`.

### Running the Backend
1. Navigate to the `backend` directory.
2. Run the Go server:
   ```bash
   go run main.go
   ```
3. The backend server should now be running and accessible at the specified port.

## Contributing
Contributions are welcome! Please fork this repository and submit a pull request for any improvements or bug fixes. For major changes, please open an issue first to discuss what you would like to change.
