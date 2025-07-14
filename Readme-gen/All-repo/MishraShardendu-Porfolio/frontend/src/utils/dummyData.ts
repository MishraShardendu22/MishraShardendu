export const dummyProjects = [
  {
    _id: '1',
    title: 'Stunning Portfolio',
    description: 'A visually stunning developer portfolio built with Next.js, Tailwind, and GSAP.',
    githubUrl: 'https://github.com/MishraShardendu/portfolio',
    techStack: ['Next.js', 'Tailwind', 'GSAP', 'Go', 'Fiber', 'MongoDB'],
    role: 'Full Stack Developer',
    demoUrl: 'https://portfolio.mishrashardendu.com',
    image: 'https://placehold.co/600x400',
    featured: true,
    category: 'Web'
  },
  {
    _id: '2',
    title: 'Open Source Dashboard',
    description: 'A dashboard to track and visualize open source contributions.',
    githubUrl: 'https://github.com/MishraShardendu/oss-dashboard',
    techStack: ['React', 'Node.js', 'MongoDB'],
    role: 'Backend Lead',
    demoUrl: '',
    image: 'https://placehold.co/600x400',
    featured: true,
    category: 'Dashboard'
  }
];

export const dummyExperience = [
  {
    _id: '1',
    company: 'Tech Corp',
    role: 'Software Engineer',
    duration: 'Jan 2022 - Present',
    bullets: [
      'Built scalable web apps with React and Go',
      'Led a team of 4 developers',
    ],
    projects: ['1']
  },
  {
    _id: '2',
    company: 'StartupX',
    role: 'Full Stack Developer',
    duration: 'Jun 2020 - Dec 2021',
    bullets: [
      'Developed MVPs for 3 startups',
      'Integrated CI/CD pipelines',
    ],
    projects: ['2']
  }
];

export const dummyTechStack = [
  { _id: '1', category: 'Languages', name: 'JavaScript', icon: '' },
  { _id: '2', category: 'Languages', name: 'Go', icon: '' },
  { _id: '3', category: 'Frameworks', name: 'Next.js', icon: '' },
  { _id: '4', category: 'Frameworks', name: 'Fiber', icon: '' },
  { _id: '5', category: 'DevOps', name: 'Docker', icon: '' },
  { _id: '6', category: 'Cloud', name: 'Vercel', icon: '' },
  { _id: '7', category: 'Tools', name: 'VSCode', icon: '' },
];

export const dummyBlogs = [
  {
    _id: '1',
    title: 'How I Built My Portfolio',
    excerpt: 'A deep dive into building a modern, animated portfolio with Next.js, GSAP, and Go.',
    content: '# Building My Portfolio\nThis is the full content in MDX/Markdown.',
    author: 'Mishra Shardendu',
    date: '2024-07-01',
    published: true
  },
  {
    _id: '2',
    title: 'Open Source for Beginners',
    excerpt: 'Getting started with open source contributions.',
    content: 'Open source is a great way to learn and grow.',
    author: 'Mishra Shardendu',
    date: '2024-06-15',
    published: true
  }
];

export const dummyOSS = [
  { _id: '1', repo: 'vercel/next.js', description: 'Contributed to Next.js core features.' },
  { _id: '2', repo: 'gofiber/fiber', description: 'Improved Fiber documentation.' },
];

export const dummyAchievements = [
  { _id: '1', title: 'AWS Certified Developer', description: 'Amazon Web Services Certification', images: ['https://placehold.co/200x200'] },
  { _id: '2', title: 'Hackathon Winner', description: 'Won 1st place at DevFest', images: ['https://placehold.co/200x200', 'https://placehold.co/200x200'] },
]; 