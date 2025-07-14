# Portfolio Backend (Go + Fiber)

## Setup

1. Clone the repo and enter the backend directory:
   ```bash
   cd backend
   ```

2. Copy the example env file and fill in your secrets:
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

3. Install Go dependencies:
   ```bash
   go mod tidy
   ```

4. Run the server:
   ```bash
   go run main.go
   ```

## Environment Variables

- `MONGO_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - JWT signing secret
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` - Cloudinary credentials
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` - SMTP credentials for email
- `ADMIN_EMAIL` - Email for admin actions
- `PORT` - Port to run the server (default: 8080)

## Deployment

You can deploy the backend to any platform that supports Go, such as **Railway**, **Render**, **Fly.io**, or **Heroku**.

1. Set all environment variables in your deployment platform (see `.env.example`).
2. Make sure your MongoDB and SMTP services are accessible from your deployment.
3. Deploy using your platform's instructions (e.g., `railway up`, `fly deploy`, or via GitHub integration).
4. Ensure the backend is accessible via HTTPS and CORS is configured if needed.

## Project Structure
- `main.go` - Entry point
- More files and folders will be added as features are implemented 