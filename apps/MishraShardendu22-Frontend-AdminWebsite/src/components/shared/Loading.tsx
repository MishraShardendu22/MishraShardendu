import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface LoadingProps {
  /** Custom title text */
  title?: string
  /** Custom description text */
  description?: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Full height of viewport */
  fullHeight?: boolean
  /** Additional className */
  className?: string
}

const sizeConfig = {
  sm: {
    container: 'min-h-[20vh]',
    icon: 'h-6 w-6',
    title: 'text-sm',
    description: 'text-xs',
  },
  md: {
    container: 'min-h-[40vh]',
    icon: 'h-10 w-10',
    title: 'text-base',
    description: 'text-sm',
  },
  lg: {
    container: 'min-h-[70vh]',
    icon: 'h-12 w-12',
    title: 'text-lg',
    description: 'text-base',
  },
}

export function Loading({
  title = 'Loading',
  description = 'Please wait...',
  size = 'md',
  fullHeight = false,
  className,
}: LoadingProps) {
  const config = sizeConfig[size]

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center space-y-4',
        fullHeight ? 'min-h-screen' : config.container,
        className
      )}
    >
      <Loader2 className={cn('text-primary animate-spin', config.icon)} />
      <div className="space-y-1 text-center">
        <p className={cn('font-medium text-foreground', config.title)}>{title}</p>
        {description && (
          <p className={cn('text-muted-foreground', config.description)}>{description}</p>
        )}
      </div>
    </div>
  )
}

/** Simple inline spinner */
export function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full h-5 w-5 border-t-2 border-primary border-solid',
        className
      )}
    />
  )
}

/** Full page loading overlay */
export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <Loading size="lg" />
    </div>
  )
}

export default Loading
