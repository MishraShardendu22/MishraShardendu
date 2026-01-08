# Package.json Configuration Guide

## Standard Package.json Structure

Every package in the monorepo should include the following metadata for optimal SEO and professional presentation:

```json
{
  "name": "package-name",
  "version": "1.0.0",
  "private": false,
  "description": "Clear, concise description of the package (used for SEO)",
  "author": {
    "name": "Shardendu Mishra",
    "email": "mishrashardendu22@gmail.com",
    "url": "https://github.com/MishraShardendu22"
  },
  "homepage": "https://mishrashardendu22.is-a.dev/",
  "repository": {
    "type": "git",
    "url": "https://github.com/MishraShardendu22/repository-name.git"
  },
  "bugs": {
    "url": "https://github.com/MishraShardendu22/repository-name/issues"
  },
  "license": "MIT",
  "keywords": [
    "portfolio",
    "nextjs",
    "react",
    "typescript",
    "web development",
    "software engineering"
  ],
  "contributors": [
    {
      "name": "Shardendu Mishra",
      "email": "mishrashardendu22@gmail.com",
      "url": "https://www.linkedin.com/in/shardendumishra22/"
    }
  ],
  "social": {
    "website": "https://mishrashardendu22.is-a.dev/",
    "linkedin": "https://www.linkedin.com/in/shardendumishra22/",
    "github": "https://github.com/MishraShardendu22",
    "twitter": "https://x.com/Shardendu_M",
    "leetcode": "https://leetcode.com/u/ShardenduMishra22/"
  },
  "engines": {
    "node": ">=22.0.0"
  },
  "scripts": {
    "dev": "development start command",
    "build": "production build command",
    "start": "start production server",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "type-check": "typescript type checking",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

## Application-Specific Examples

### Personal Website (Next.js)

```json
{
  "name": "ms22-main",
  "version": "2.10.0",
  "private": false,
  "description": "Portfolio site for Shardendu Mishra - Engineer and software developer passionate about Go, AI, and building impactful tools.",
  "author": {
    "name": "Shardendu Mishra",
    "email": "mishrashardendu22@gmail.com",
    "url": "https://github.com/MishraShardendu22"
  },
  "homepage": "https://mishrashardendu22.is-a.dev/",
  "repository": {
    "type": "git",
    "url": "https://github.com/MishraShardendu22/MishraShardendu.git"
  },
  "bugs": {
    "url": "https://github.com/MishraShardendu22/MishraShardendu/issues"
  },
  "license": "MIT",
  "keywords": [
    "portfolio",
    "nextjs",
    "react",
    "typescript",
    "engineer",
    "software developer",
    "go",
    "ai",
    "open source"
  ],
  "social": {
    "website": "https://mishrashardendu22.is-a.dev/",
    "linkedin": "https://www.linkedin.com/in/shardendumishra22/",
    "github": "https://github.com/MishraShardendu22",
    "twitter": "https://x.com/Shardendu_M",
    "leetcode": "https://leetcode.com/u/ShardenduMishra22/"
  },
  "engines": {
    "node": ">=22.0.0"
  }
}
```

### Blog Website (Svelte)

```json
{
  "name": "ms22-blog",
  "version": "2.10.0",
  "private": false,
  "description": "Blog platform for Shardendu Mishra - Technical articles about web development, programming, and software engineering insights.",
  "author": {
    "name": "Shardendu Mishra",
    "email": "mishrashardendu22@gmail.com",
    "url": "https://github.com/MishraShardendu22"
  },
  "homepage": "https://mishrashardendu22.is-a.dev/blog",
  "repository": {
    "type": "git",
    "url": "https://github.com/MishraShardendu22/MishraShardendu.git"
  },
  "bugs": {
    "url": "https://github.com/MishraShardendu22/MishraShardendu/issues"
  },
  "license": "MIT",
  "keywords": [
    "blog",
    "articles",
    "technical writing",
    "web development",
    "programming",
    "software engineering",
    "svelte",
    "vite",
    "typescript"
  ],
  "social": {
    "website": "https://mishrashardendu22.is-a.dev/blog",
    "linkedin": "https://www.linkedin.com/in/shardendumishra22/",
    "github": "https://github.com/MishraShardendu22",
    "twitter": "https://x.com/Shardendu_M",
    "leetcode": "https://leetcode.com/u/ShardenduMishra22/"
  },
  "engines": {
    "node": ">=22.0.0"
  }
}
```

### Admin Dashboard (Preact)

```json
{
  "name": "ms22-admin",
  "version": "2.10.0",
  "private": true,
  "description": "Admin dashboard for Shardendu Mishra's portfolio - Manage content, projects, and site data.",
  "author": {
    "name": "Shardendu Mishra",
    "email": "mishrashardendu22@gmail.com",
    "url": "https://github.com/MishraShardendu22"
  },
  "homepage": "https://github.com/MishraShardendu22/MishraShardendu",
  "repository": {
    "type": "git",
    "url": "https://github.com/MishraShardendu22/MishraShardendu.git"
  },
  "bugs": {
    "url": "https://github.com/MishraShardendu22/MishraShardendu/issues"
  },
  "license": "MIT",
  "keywords": ["admin", "dashboard", "portfolio", "cms", "preact", "vite", "typescript"],
  "social": {
    "linkedin": "https://www.linkedin.com/in/shardendumishra22/",
    "github": "https://github.com/MishraShardendu22"
  },
  "engines": {
    "node": ">=22.0.0"
  }
}
```

## Required Fields Explained

### Core Metadata

- **name**: Package identifier (kebab-case)
- **version**: Semantic versioning (MAJOR.MINOR.PATCH)
- **private**: Set to false for public packages, true for internal
- **description**: Under 160 characters, SEO-friendly

### Author and Contributors

- **author**: Primary package maintainer
- **contributors**: Array of additional maintainers

### Repository Information

- **homepage**: Main URL for the package
- **repository**: Git repository configuration
- **bugs**: Issue tracker URL

### Discovery and SEO

- **license**: License type (MIT recommended)
- **keywords**: Array of searchable terms for npm/GitHub
- **social**: Custom field with social media links

### Environment

- **engines**: Node.js version requirements
- **packageManager**: Specify pnpm version if needed

## Custom Social Links Field

The social field is a custom addition that helps with documentation and profile linking:

```json
"social": {
  "website": "https://mishrashardendu22.is-a.dev/",
  "linkedin": "https://www.linkedin.com/in/shardendumishra22/",
  "github": "https://github.com/MishraShardendu22",
  "twitter": "https://x.com/Shardendu_M",
  "leetcode": "https://leetcode.com/u/ShardenduMishra22/"
}
```

This can be accessed programmatically for footer links, about pages, or documentation generation.

## Scripts Best Practices

Always include these standard scripts:

- **dev**: Start development server
- **build**: Production build
- **start**: Start production server
- **lint**: Run linter
- **lint:fix**: Auto-fix linting issues
- **type-check**: TypeScript type checking
- **format**: Format code with Prettier
- **format:check**: Check code formatting

## Keywords Selection

Choose keywords that:

- Describe the technology stack
- Indicate the package purpose
- Match common search terms
- Include framework names
- Mention key features

Example for a Next.js portfolio:

```json
"keywords": [
  "portfolio",
  "nextjs",
  "react",
  "typescript",
  "tailwind",
  "web development",
  "engineer",
  "software developer"
]
```

## Version Management

Follow semantic versioning:

- MAJOR: Breaking changes
- MINOR: New features, backward compatible
- PATCH: Bug fixes, backward compatible

Example: 2.10.0

- Version 2: Major version
- .10: Ten minor releases
- .0: No patches yet
