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
    iconWrapper: 'w-12 h-12',
    icon: 'h-5 w-5',
    title: 'text-sm',
    description: 'text-xs',
  },
  md: {
    container: 'min-h-[40vh]',
    iconWrapper: 'w-16 h-16',
    icon: 'h-8 w-8',
    title: 'text-base',
    description: 'text-sm',
  },
  lg: {
    container: 'min-h-[70vh]',
    iconWrapper: 'w-20 h-20',
    icon: 'h-10 w-10',
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
        'flex flex-col items-center justify-center space-y-6',
        fullHeight ? 'min-h-screen' : config.container,
        className
      )}
    >
      {/* Animated spinner with linear ring */}
      <div className="relative">
        <div
          className={cn(
            'rounded-full bg-linear-to-br from-primary/20 via-primary/10 to-transparent',
            'flex items-center justify-center shadow-lg shadow-primary/10',
            'ring-2 ring-primary/20 ring-offset-2 ring-offset-background',
            config.iconWrapper
          )}
        >
          <Loader2 className={cn('text-primary animate-spin', config.icon)} />
        </div>
        {/* Pulsing ring effect */}
        <div
          className={cn(
            'absolute inset-0 rounded-full bg-primary/5 animate-ping',
            config.iconWrapper
          )}
          style={{ animationDuration: '2s' }}
        />
      </div>

      <div className="space-y-2 text-center">
        <p className={cn('font-semibold text-foreground tracking-tight', config.title)}>{title}</p>
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
