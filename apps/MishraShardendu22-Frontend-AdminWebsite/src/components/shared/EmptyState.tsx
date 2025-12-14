import type { LucideIcon } from 'lucide-react'
import { FileQuestion, Plus } from 'lucide-react'
import type { ComponentChildren } from 'preact'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'

export interface EmptyStateProps {
  /** Title text */
  title: string
  /** Description text */
  description?: string
  /** Icon component (lucide-react icon) */
  icon?: LucideIcon
  /** Action button text */
  actionLabel?: string
  /** Action button handler */
  onAction?: () => void
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Additional className */
  className?: string
  /** Custom children content */
  children?: ComponentChildren
}

const sizeConfig = {
  sm: {
    container: 'py-8',
    icon: 'w-12 h-12',
    iconInner: 'h-6 w-6',
    title: 'text-base',
    description: 'text-xs',
  },
  md: {
    container: 'py-12',
    icon: 'w-16 h-16',
    iconInner: 'h-8 w-8',
    title: 'text-lg',
    description: 'text-sm',
  },
  lg: {
    container: 'py-16',
    icon: 'w-20 h-20',
    iconInner: 'h-10 w-10',
    title: 'text-xl',
    description: 'text-base',
  },
}

export function EmptyState({
  title,
  description,
  icon: Icon = FileQuestion,
  actionLabel,
  onAction,
  size = 'md',
  className,
  children,
}: EmptyStateProps) {
  const config = sizeConfig[size]

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        'border border-dashed border-border/60 rounded-xl',
        'bg-gradient-to-b from-muted/30 via-muted/10 to-transparent',
        'backdrop-blur-sm',
        config.container,
        className
      )}
    >
      {/* Icon with subtle gradient background */}
      <div
        className={cn(
          'rounded-xl bg-linear-to-br from-muted/80 to-muted/40',
          'flex items-center justify-center mb-5',
          'shadow-sm ring-1 ring-border/50',
          config.icon
        )}
      >
        <Icon className={cn('text-muted-foreground/70', config.iconInner)} />
      </div>

      <h3 className={cn('font-semibold text-foreground mb-2 tracking-tight', config.title)}>
        {title}
      </h3>
      {description && (
        <p className={cn('text-muted-foreground max-w-sm leading-relaxed', config.description)}>
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="mt-5 gap-2 shadow-md hover:shadow-lg transition-shadow"
        >
          <Plus className="w-4 h-4" />
          {actionLabel}
        </Button>
      )}
      {children}
    </div>
  )
}

export default EmptyState
