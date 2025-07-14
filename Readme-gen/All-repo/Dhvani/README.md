# Comprehensive Health Management Platform

## 1. Overview

This project is a multi-faceted health management platform designed to provide a wide range of services to users, healthcare organizations, and administrators. It integrates several backend microservices built with Go, Node.js, and Python, along with a React-based frontend. The platform offers features like user and organization management, blood bank operations, an AI-powered chatbot, AI-driven medical image analysis (including TB detection), and personalized nutrition advice.

## 2. Key Features

The platform is composed of several key modules and services:

*   **Frontend Client (`client/`)**:
    *   User-friendly interface built with React, TypeScript, Tailwind CSS, and Shadcn/UI.
    *   Role-based access and dashboards for:
        *   **Users/Patients**: Registration, login, profile management, access to AI chatbot, viewing medical reports, and nutrition plans.
        *   **Organizations (e.g., Hospitals, Blood Banks)**: Registration, login, dashboard for managing blood donations, inventory, requests, and donation locations.
        *   **Administrators**: Platform oversight, user management, and system configuration.
    *   Interactive maps (Leaflet) and charts (Recharts).
    *   File uploads via Filestack.

*   **Main API Server (`server/`)**:
    *   Node.js/Express backend with TypeScript.
    *   Core user, organization, and admin authentication (JWT) and data management.
    *   MongoDB for data persistence (user profiles, blood requests, donations, inventory, medical reports like stroke and TB).
    *   Handles blood bank functionalities: requests, donations, inventory, and donation locations.
    *   Manages storage of various medical reports and files.

*   **Go API Server (`go-server/`)**:
    *   Go/Fiber backend also providing services for admins, donors, patients, and organizations.
    *   Connects to MongoDB.
    *   Includes functionalities for patient surveys and donor management.
    *   Features a "NormalChat" capability, potentially for non-AI chat interactions or specific communication channels.

*   **AI Chatbot Service (`ChatBot-Pakcage-main/`)**:
    *   **NPM Package (`chatbot-npm-package/`)**: A reusable React chatbot widget (`@mishrashardendu22/chatbot-widget`) for easy frontend integration.
    *   **Go Backend (`go-backend/`)**: Powers the chatbot using Go/Fiber.
        *   Integrates with Large Language Models (LLMs) like Google Gemini and DeepSeek.
        *   Uses Redis (via Upstash) for caching conversations and session management.

*   **Medical Image Analysis Server (`python-server/`)**:
    *   Python/Flask backend dedicated to AI-powered medical image analysis.
    *   **Tuberculosis (TB) Detection**: Utilizes a Vision Transformer (ViT) model to detect TB from medical images (e.g., chest X-rays). Provides confidence scores and Grad-CAM heatmaps for explainability.
    *   **Medical Image Segmentation**: Incorporates MedSAM (Medical Segment Anything Model) for general-purpose medical image segmentation.
    *   Provides a REST API for image submission and result retrieval.
    *   (See `python-server/README.md` for detailed setup and API usage).

*   **Nutrition Service (`go-back-nutri/`)**:
    *   Go/Fiber backend offering personalized nutrition analysis and diet planning.
    *   Calculates nutritional scores for food items.
    *   Uses an LLM (OpenAI) to parse natural language diet descriptions and generate dietary recommendations and timetables based on user parameters (weight, height, gender, blood group).

## 3. Technology Stack

*   **Frontend**:
    *   React, TypeScript, Vite
    *   Tailwind CSS, Shadcn/UI, Framer Motion (Animations)
    *   React Router, Zustand (State Management), Axios
    *   Leaflet (Maps), Recharts (Charts)
*   **Backend (Node.js - `server/`)**:
    *   Node.js, Express.js, TypeScript
    *   MongoDB, Mongoose
    *   JWT, Bcryptjs, Nodemailer, Multer
*   **Backend (Go - `go-server/`, `ChatBot-Pakcage-main/go-backend/`, `go-back-nutri/`)**:
    *   Go, Fiber (Web Framework)
    *   MongoDB (for `go-server/`)
    *   Redis (for `ChatBot-Pakcage-main/go-backend/`)
    *   Google Gemini, DeepSeek API, OpenAI API (LLM integrations)
*   **Backend (Python - `python-server/`)**:
    *   Python, Flask
    *   PyTorch, Torchvision, OpenCV, Hugging Face Hub
    *   Grad-CAM (Explainable AI)
*   **Database**: MongoDB, Redis
*   **DevOps/Tooling**: Git, Docker (implied for deployment, though not explicitly configured in files reviewed), ESLint, Prettier.

## 4. Project Structure

The repository is organized into several main directories, each representing a distinct part of the application:

*   `client/`: Contains the React frontend application.
*   `server/`: Node.js/Express backend for core user/organization management and blood bank functionalities.
*   `go-server/`: Go/Fiber backend providing additional API services for various user roles.
*   `python-server/`: Python/Flask backend for AI-based medical image analysis (TB detection, segmentation).
*   `ChatBot-Pakcage-main/`:
    *   `chatbot-npm-package/`: The source code for the callable NPM chatbot widget.
    *   `go-backend/`: The Go/Fiber backend that powers the chatbot AI.
    *   Contains procedural markdown files for Fiber, NPM, and Redis setup.
*   `go-back-nutri/`: Go/Fiber backend for nutrition analysis and diet planning.
*   `RulesForContribution.md`: Guidelines for developers contributing to the project.
*   `WorkFlow.jpg`: (Assumed to be a diagram illustrating the project workflow - content not reviewed).

## 5. Setup and Installation

Each service/module generally has its own dependencies and setup procedures. Refer to the specific READMEs and documentation within each module's directory where available.

*   **General Prerequisites**:
    *   Node.js and npm/yarn (for `client/` and `server/`)
    *   Go (for `go-server/`, `ChatBot-Pakcage-main/go-backend/`, `go-back-nutri/`)
    *   Python and pip/conda (for `python-server/`)
    *   Access to a MongoDB instance.
    *   Access to a Redis instance (specifically for `ChatBot-Pakcage-main/go-backend/`).
    *   API keys for external services (Google Gemini, DeepSeek, OpenAI).

*   **Frontend (`client/`)**:
    ```bash
    cd client
    npm install
    npm run dev
    ```
    (Note: The `client/README.md` mentions Zustand is used without persistence, meaning user state might be lost on page reload.)

*   **Node.js Backend (`server/`)**:
    ```bash
    cd server
    npm install
    # Configure .env file with database URI, JWT secret, etc.
    npm run start # (or relevant script from package.json)
    ```

*   **Go Backends** (General Steps, adapt for each Go module: `go-server/`, `ChatBot-Pakcage-main/go-backend/`, `go-back-nutri/`):
    ```bash
    cd <go_module_directory>
    # Configure .env file with database details, API keys, client URLs, etc.
    go get
    go mod tidy
    go run main.go
    ```
    (Refer to `ChatBot-Pakcage-main/Procedure_Fiber.md` and `ChatBot-Pakcage-main/Procedure_Redis.md` for specific setup patterns used).

*   **Python Backend (`python-server/`)**:
    *   This server has detailed setup instructions in `python-server/README.md`. Key steps involve:
        *   Creating a Conda environment.
        *   Installing PyTorch with CUDA.
        *   `pip install -r requirements.txt`
        *   `python download_models.py` (to fetch AI models)
        *   `python med-server.py` (to run the server, typically on `http://localhost:5001`)

## 6. Usage

Once all relevant backend services are running and the frontend is started:

1.  Access the frontend application through your browser (usually `http://localhost:xxxx` as specified by Vite).
2.  Register and log in as a user, organization, or admin to access different functionalities.
3.  Users can interact with the AI chatbot, submit data for nutrition analysis, and potentially upload medical images for analysis (depending on how the frontend integrates with the `python-server`).
4.  Organizations can manage blood bank related data.
5.  Admins can oversee the platform.

## 7. API Endpoints

Each backend service exposes its own set of API endpoints.

*   **`server/` (Node.js)**: Endpoints related to user/org/admin auth, blood bank data, and report management. Defined in `server/route/SourceRoutes/`.
*   **`go-server/` (Go)**: Endpoints for admin, donor, patient, organization interactions, and surveys. Defined in `go-server/route/`.
*   **`ChatBot-Pakcage-main/go-backend/` (Go)**: Endpoints for `/deepseek`, `/gemini`, and `/redis` interactions for the chatbot. Defined in `ChatBot-Pakcage-main/go-backend/route/`.
*   **`go-back-nutri/` (Go)**: Endpoints like `/api/food` and `/api/calculate-nutrition`. Defined in `go-back-nutri/main.go`.
*   **`python-server/` (Python)**: Endpoints like `/vit_analyze`, `/analyze`, `/models`, and `/health`. Refer to `python-server/README.md` for detailed API usage.

## 8. Contributing

Please refer to `RulesForContribution.md` for guidelines on:
*   Code comments and style.
*   Adherence to project structure.
*   Commit message conventions.
*   Specific frontend (Lucide React, Tailwind CSS, ShadCN, Framer Motion) and backend (TypeScript, modular structure, data encryption) practices.

Ensure that frontend and backend environments are run separately during development. All new features or modifications should be well-documented.

---
