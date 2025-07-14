# Portfolio Frontend (Next.js + Tailwind CSS)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

## Features
- GSAP for advanced animations (page transitions, scroll, entrances)
- react-markdown for rendering blog content
- Responsive, modern, and accessible UI
- Dark/light mode toggle

## Project Structure
- `src/app/` - Main app pages and layout
- More files and folders will be added as features are implemented

## Environment Variables
- `NEXT_PUBLIC_API_URL` - The URL of your deployed backend (see `.env.example`)

## Deployment

The easiest way to deploy your Next.js app is to use **Vercel** (recommended) or **Netlify**.

1. Set the `NEXT_PUBLIC_API_URL` environment variable in your deployment platform (e.g., Vercel dashboard).
2. Deploy using your platform's instructions (e.g., `vercel --prod` or via GitHub integration).
3. Make sure the backend URL is reachable from the frontend.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
