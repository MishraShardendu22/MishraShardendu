## 5-Chan Live Demo
### Check out the live demo of the project [5-Chan](https://5-chan-shardendu-mishra.vercel.app)
### Check out a video of the project [YouTube Video](https://youtu.be/FIjMpPrWSkM)

A platform where users can share and receive the nicest and the meanest thing about them in a safe and harmless manner. Non-logged-in users can write about others, while logged-in users can write after a verification process using OTP (One-Time Password) during signup.

## Tech - Features
- **Non-Logged-In Users:** Can provide feedback for other users.
- **Logged-In Users:** Can receive feedback after completing OTP verification during signup.
- **OTP Verification:** Ensures that only verified users can receive feedback.
- **Username Management:** If a logged-in user is not verified, their username can be taken away.

## Non-Tech Features
- **Server-Side Rendering**: Leveraged Next.js best practices for server-side rendering, optimizing performance and SEO by serving static files and enhancing crawler indexing.  
- **Best Coding Practices**: The project follows a well-structured codebase with clear separation between models and schemas, ensuring organization and eliminating clutter.
- **Search Engine Optimization (SEO)**: Enhanced SEO by customizing metadata, including page titles and descriptions, to improve search engine visibility and ranking.
- **Prettier Integration**: Prettier has been integrated to enforce consistent code formatting, ensuring readability and uniformity throughout the project.  
- **Linting**: A robust linting configuration was implemented to maintain code quality, catch errors early, and enforce best practices across the project.
- **Clean Code**: All redundant and unnecessary code has been removed, ensuring a clean, efficient, and straightforward codebase.  
- **Sample Files**: A sample file (TemporaryPrepPages) was created to provide a practice resource and facilitate learning.  


  
## Tech Stack
The platform is built using the following technologies:
- **Frontend:** 
  - Next.js
  - React
  - Tailwind CSS
  - Embla Carousel (for showcasing feedback)
- **Backend:**
  - Node.js
  - npm (package installer)
  - NodeMailer (for OTP-based email verification)
  - Gemini API (for integration with LLM)
  - ZOD (as a Schema Validation Library)
- **Testing:**
  - Postman (for API testing)

## Setup Instructions

### Prerequisites
Before you begin, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)
- [Postman](https://www.postman.com/) (for API testing)
  
### Steps to Run the Application Locally

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/5-chan.git
   ```

2. Navigate to the project directory:

   ```bash
   cd 5-chan
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the root directory and configure the following environment variables:
     - `NEXT_PUBLIC_API_URL` - API endpoint URL
     - `NEXT_PUBLIC_GEMINI_API_KEY` - Gemini API key for LLM integration
     - `NODEMAILER_USER` - Your NodeMailer email account
     - `NODEMAILER_PASS` - Password for NodeMailer account

5. Start the development server:

   ```bash
   npm run dev
   ```

   This will start the app on `http://localhost:3000`.

6. Open the app in your browser and test the functionality.

## How It Works

- **Feedback Mechanism:** 
  - Users can provide feedback on other users' profiles, even if they are not logged in.
  - Logged-in users can view feedback only after confirming their identity via OTP.

- **OTP Verification Process:**
  - Upon signup, users will receive an OTP email.
  - If the user fails to verify their email, their username will be temporarily removed until verified.

- **LLM Integration:** 
  - The Gemini API integrates a Language Learning Model to provide an interactive and personalized feedback experience.

## Contributing

We welcome contributions! If you want to contribute to this project, please fork the repository and create a pull request with a detailed description of the changes. Make sure to follow the project's coding standards.


Thanks for checking out 5-Chan. We hope you enjoy using it!
