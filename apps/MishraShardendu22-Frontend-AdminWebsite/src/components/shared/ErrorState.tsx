import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '../../lib/utils'

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
      <div
        className={cn(
          'rounded-full bg-destructive/10 flex items-center justify-center',
          config.icon
        )}
      >
        <AlertCircle className={cn('text-destructive', config.iconInner)} />
      </div>
      <div className="text-center space-y-2 max-w-md">
        <h2 className={cn('font-semibold text-foreground', config.title)}>{title}</h2>
        <p className={cn('text-muted-foreground', config.message)}>{message}</p>
        {showRetry && (
          <Button onClick={handleRetry} variant="outline" className="mt-4">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        )}
      </div>
    </div>
  )
}

/** Simple inline error message */
export function InlineError({ message, className }: { message: string; className?: string }) {
  return (
    <div className={cn('flex items-center gap-2 text-destructive', className)}>
      <AlertCircle className="w-4 h-4" />
      <span className="text-sm">{message}</span>
    </div>
  )
}

export default ErrorState
