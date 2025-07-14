import Link from 'next/link'
import { Github, Linkedin, Heart } from 'lucide-react'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/30 bg-background py-6 px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          <div className="text-sm text-muted-foreground order-2 md:order-1 text-center md:text-left">
            <span>{year} © Keploy. All rights reserved.</span>
          </div>

          <div className="flex justify-center items-center gap-1.5 order-1 md:order-2">
            <span className="text-sm">Made with</span>
            <Heart
              size={16}
              className="fill-primary text-primary animate-pulse"
            />
            <span className="text-sm">
              by{' '}
              <span className="font-medium text-foreground hover:text-primary transition-colors">
                Shardendu Mishra
              </span>
            </span>
          </div>

          <div className="flex justify-center md:justify-end items-center gap-4 order-3 md:order-3">
            <Link
              href="https://github.com/MishraShardendu22"
              target="_blank"
              rel="noopener noreferrer"
              className="flex px-4 items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub Profile"
            >
              <Github size={20} />
              <span>GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/shardendumishra22/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex px-4 items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
