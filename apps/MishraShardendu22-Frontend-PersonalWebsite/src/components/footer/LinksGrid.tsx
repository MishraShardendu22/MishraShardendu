import { Star, Zap, Code, Globe } from 'lucide-react'
import { LinkGroup } from './LinkGroup'
import { quickLinks, socialLinks, codingProfiles, additionalProfiles, websiteLinks } from './data'

interface LinksGridProps {
  isMobile: boolean
}

export const LinksGrid = ({ isMobile }: LinksGridProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-10 mb-12">
      <div className="space-y-4 lg:space-y-6">
        <h4 className="text-base lg:text-lg font-semibold text-foreground flex items-center space-x-2 justify-center lg:justify-start">
          <Zap className="w-4 lg:w-5 h-4 lg:h-5 text-primary" />
          <span>Quick Links</span>
        </h4>
        <LinkGroup items={quickLinks} isMobile={isMobile} />
      </div>

      <div className="space-y-4 lg:space-y-6">
        <h4 className="text-base lg:text-lg font-semibold text-foreground flex items-center space-x-2 justify-center lg:justify-start">
          <Globe className="w-4 lg:w-5 h-4 lg:h-5 text-primary" />
          <span>My Websites</span>
        </h4>
        <LinkGroup items={websiteLinks} isMobile={isMobile} />
      </div>

      <div className="space-y-4 lg:space-y-6">
        <h4 className="text-base lg:text-lg font-semibold text-foreground flex items-center space-x-2 justify-center lg:justify-start">
          <Star className="w-4 lg:w-5 h-4 lg:h-5 text-secondary" />
          <span>Social Media</span>
        </h4>
        <LinkGroup items={socialLinks} isMobile={isMobile} />
      </div>

      <div className="space-y-4 lg:space-y-6">
        <h4 className="text-base lg:text-lg font-semibold text-foreground flex items-center space-x-2 justify-center lg:justify-start">
          <Code className="w-4 lg:w-5 h-4 lg:h-5 text-accent" />
          <span>Coding Profiles</span>
        </h4>
        <LinkGroup items={codingProfiles} isMobile={isMobile} />
      </div>

      <div className="space-y-4 lg:space-y-6">
        <h4 className="text-base lg:text-lg font-semibold text-foreground flex items-center space-x-2 justify-center lg:justify-start">
          <Star className="w-4 lg:w-5 h-4 lg:h-5 text-accent" />
          <span>More Profiles</span>
        </h4>
        <LinkGroup items={additionalProfiles} isMobile={isMobile} />
      </div>
    </div>
  )
}
