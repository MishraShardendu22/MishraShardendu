import { AlertCircle, RefreshCw } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'

export interface ErrorStateProps {
  /** Error title */
  title?: string
  /** Error message to display */
  message: string
  /** Show retry button */
  showRetry?: boolean
  /** Retry button handler */
  onRetry?: () => void
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Additional className */
  className?: string
}

const sizeConfig = {
  sm: {
    container: 'min-h-[20vh] gap-4 px-2',
    icon: 'w-10 h-10',
    iconInner: 'h-5 w-5',
    title: 'text-base',
    message: 'text-xs',
  },
  md: {
    container: 'min-h-[40vh] gap-6 px-4',
    icon: 'w-16 h-16',
    iconInner: 'h-8 w-8',
    title: 'text-xl',
    message: 'text-sm',
  },
  lg: {
    container: 'min-h-[70vh] gap-6 px-4',
    icon: 'w-20 h-20',
    iconInner: 'h-10 w-10',
    title: 'text-2xl',
    message: 'text-base',
  },
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  showRetry = true,
  onRetry,
  size = 'md',
  className,
}: ErrorStateProps) {
  const config = sizeConfig[size]

  const handleRetry = () => {
    if (onRetry) {
      onRetry()
    } else {
      window.location.reload()
    }
  }

  return (
    <div className={cn('flex flex-col items-center justify-center', config.container, className)}>
      {/* Error icon with visual emphasis */}
      <div className="relative">
        <div
          className={cn(
            'rounded-full bg-linear-to-br from-destructive/20 via-destructive/10 to-transparent',
            'flex items-center justify-center shadow-lg shadow-destructive/10',
            'ring-2 ring-destructive/20 ring-offset-2 ring-offset-background',
            config.icon
          )}
        >
          <AlertCircle className={cn('text-destructive', config.iconInner)} />
        </div>
      </div>

      <div className="text-center space-y-3 max-w-md">
        <h2 className={cn('font-bold text-foreground tracking-tight', config.title)}>{title}</h2>
        <p className={cn('text-muted-foreground leading-relaxed', config.message)}>{message}</p>
        {showRetry && (
          <Button
            onClick={handleRetry}
            variant="outline"
            className="mt-4 gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  )
}

/** Simple inline error message */
export function InlineError({ message, className }: { message: string; className?: string }) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 text-destructive bg-destructive/10 px-3 py-2 rounded-md border border-destructive/20',
        className
      )}
    >
      <AlertCircle className="w-4 h-4 flex-shrink-0" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  )
}

export default ErrorState
