# Internship Authentication - Career Cafe

## Tech Stack

### Backend
- **Node.js**
- **Nodemailer**
- **Crons**
- **Mongoose**
- **JWT**

### Frontend
- **Vite**
- **Tailwind CSS**
- **Lucide-react**
- **Sahdcn**
- **React**

## Features

1. **User Authentication**
   - Signup and Login functionality.
   - JWT stored in cookies for session management.

2. **Protected Routes**
   - Access to specific pages restricted based on JWT authentication.

3. **Password Recovery**
   - OTP-based reset for verified users.

4. **Account Verification**
   - Unverified accounts are automatically deleted after 24 hours.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```

3. Install dependencies for both backend and frontend:
   ```bash
   npm install
   ```

4. Set up environment variables for backend:
   - `MONGO_URI`: MongoDB connection string
   - `JWT_SECRET`: Secret key for JWT
   - `SMTP_HOST`: SMTP host for Nodemailer
   - `SMTP_PORT`: SMTP port
   - `SMTP_USER`: SMTP user for authentication
   - `SMTP_PASS`: SMTP password for authentication

5. Run the backend:
   ```bash
   npm start
   ```

6. Run the frontend:
   ```bash
   npm run dev
   ```

## Usage

1. **Signup/Login**
   - Create an account or log in with valid credentials.

2. **Password Reset**
   - Request an OTP to reset the password for verified accounts.

3. **Account Deletion**
   - Accounts not verified within 24 hours are automatically removed via cron jobs.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
