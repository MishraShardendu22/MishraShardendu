# Portfolio Frontend

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a complete admin panel for managing portfolio content and a beautiful public-facing portfolio.

## Features

### Public Portfolio
- **Hero Section**: Professional introduction with call-to-action buttons
- **Skills Showcase**: Organized by categories (Programming Languages, Frameworks, DevOps)
- **Projects Gallery**: Card-based layout with links to repositories, live demos, and videos
- **Experience Timeline**: Work history with company logos and certificates
- **Contact Information**: Professional contact details and social links
- **Responsive Design**: Optimized for all device sizes

### Admin Panel
- **Authentication**: Secure JWT-based login system
- **Dashboard**: Overview with statistics and quick actions
- **Projects Management**: Full CRUD operations with rich forms
- **Experiences Management**: Work experience management with project associations
- **Skills Management**: Add, view, and delete technical skills
- **Profile Settings**: Account information and security settings
- **Protected Routes**: Automatic redirection for unauthenticated users

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Fredoka, Poppins, Inter)

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Backend API running on `http://localhost:5000`

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Add your API URL:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin panel pages
│   │   ├── dashboard/     # Admin dashboard
│   │   ├── projects/      # Projects management
│   │   ├── experiences/   # Experiences management
│   │   ├── skills/        # Skills management
│   │   ├── profile/       # Profile settings
│   │   ├── login/         # Admin login
│   │   ├── register/      # Admin registration
│   │   └── layout.tsx     # Admin layout with navigation
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Public portfolio homepage
├── components/            # Reusable components
│   ├── auth/             # Authentication components
│   └── ui/               # shadcn/ui components
├── data/                 # Type definitions and static data
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
└── util/                 # API utilities and helpers
```

## API Integration

The frontend integrates with the Go backend API using the following endpoints:

### Authentication
- `POST /api/admin/auth` - Admin login/register

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Experiences
- `GET /api/experiences` - Get all experiences
- `POST /api/experiences` - Create experience
- `PUT /api/experiences/:id` - Update experience
- `DELETE /api/experiences/:id` - Delete experience

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Add skills

## Key Features

### Authentication Flow
- JWT token storage in localStorage
- Automatic token injection in API requests
- Protected route components
- Automatic logout on token expiration

### Form Validation
- React Hook Form for form management
- Zod schema validation
- Real-time error feedback
- Optimistic updates

### Responsive Design
- Mobile-first approach
- Tailwind CSS for styling
- shadcn/ui components for consistency
- Smooth animations and transitions

### Error Handling
- Error boundaries for React errors
- API error handling with user feedback
- Loading states and skeleton screens
- Graceful fallbacks

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

### Code Style

- TypeScript strict mode enabled
- ESLint configuration for code quality
- Prettier for consistent formatting
- Conventional commit messages

### Component Guidelines

- Use TypeScript interfaces for props
- Implement proper error boundaries
- Follow React best practices
- Use semantic HTML elements
- Ensure accessibility compliance

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions:
- Email: mishrashardendu22@gmail.com
- GitHub Issues: [Create an issue](https://github.com/MishraShardendu22/MishraShardendu/issues)
- LinkedIn: [Shardendu Mishra](https://linkedin.com/in/shardendumishra22/)
