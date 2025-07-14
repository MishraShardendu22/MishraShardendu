# [Cloudinary SaaS Application](https://cloudianry-saas.vercel.app)
## [Project Account](https://github.com/MishraShardendu22)

Welcome to the **Cloudinary SaaS Application**! This innovative web application empowers users to upload and manage images and videos effortlessly. With advanced features for image resizing tailored for social media and Cloudinary AI for video processing, this app ensures users can showcase their content in the best possible light.

## Features

- **Image Upload**: 
  - Users can upload images quickly and efficiently.
  - Resize images to various ratios and dimensions, ensuring optimal viewing for platforms like Instagram, Facebook, and Twitter.

- **Video Upload**: 
  - Seamlessly upload videos and utilize Cloudinary’s powerful processing features.
  - Preview the best part of the video automatically, enhancing user experience and engagement.
  - Compress videos without significant loss of quality, with detailed information on the compression applied, making file management easier.
  - **Download Option**: Users can download uploaded images and videos for offline access.

- **User Authentication**: 
  - Secure and reliable user authentication through **Clerk**, ensuring that user data is protected and only accessible to authorized individuals.

- **Responsive Design**: 
  - Built with **Tailwind CSS**, the application features a modern, user-friendly interface that adapts beautifully to all screen sizes, enhancing usability across devices.

## Tech Stack

| Technology       | Icon                                           | Description                                                                                   |
|------------------|------------------------------------------------|-----------------------------------------------------------------------------------------------|
| **Next.js**      | <img src="https://img.icons8.com/color/48/000000/nextjs.png" width="60" height="40"/> | A React framework for server-rendered applications, enabling efficient routing and SEO.      |
| **TypeScript**   | <img src="https://img.icons8.com/color/48/000000/typescript.png" width="60" height="40"/> | A superset of JavaScript that adds static types, improving code quality and maintainability. |
| **Tailwind CSS** | <img src="https://img.icons8.com/color/48/000000/tailwindcss.png" width="60" height="40"/> | A utility-first CSS framework that facilitates rapid UI design with customizable components.   |
| **Prisma**       | <img src="https://imgs.search.brave.com/cRK8F1OGWghDRsC81lgwNXUtBcQ5-hrtgSSsCdcnVos/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pY29u/cy52ZXJ5aWNvbi5j/b20vcG5nL28vYnVz/aW5lc3MvdnNjb2Rl/LXByb2dyYW0taXRl/bS1pY29uL3ByaXNt/YS5wbmc" width="60" height="40"/> | An ORM (Object-Relational Mapping) tool that simplifies database management and queries.     |
| **Neon**         | <img src="https://2023.allthingsopen.org/wp-content/uploads/2023/07/Presenting_Neon.jpg" width="60" height="40"/> | A serverless database platform designed for modern applications with automatic scaling.       |
| **Cloudinary**   | <img src="https://tse2.mm.bing.net/th?id=OIP.bWgmv2jg_WjLuIMESDqFBQAAAA&pid=Api&P=0&h=180" width="60" height="40"/> | A cloud service for managing and optimizing images and videos with powerful AI capabilities. |
| **Clerk**        | <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK7Aw5Oer_-ealLmVOFDzWpvQG77YmCs70rg&s" width="60" height="40"/> | A user authentication service that provides a secure, hassle-free way to manage user sign-ins. |

## Installation

To run the application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/MishraShardendu22
   cd your-repo-name
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add your Cloudinary, Neon, and Clerk credentials:

   ```
   NEXT_PUBLIC_CLOUDINARY_URL=your_cloudinary_url
   NEXT_PUBLIC_NEON_URL=your_neon_url
   NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:3000`.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to create an issue or submit a pull request.
