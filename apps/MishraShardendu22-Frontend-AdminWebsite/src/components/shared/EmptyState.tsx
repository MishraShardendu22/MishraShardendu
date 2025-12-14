import { FileQuestion, Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '../../lib/utils'
import type { ComponentChildren } from 'preact'
import type { LucideIcon } from 'lucide-react'

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
        'flex flex-col items-center justify-center text-center border rounded-lg bg-muted/20',
        config.container,
        className
      )}
    >
      <div className={cn('rounded-lg bg-muted flex items-center justify-center mb-4', config.icon)}>
        <Icon className={cn('text-muted-foreground', config.iconInner)} />
      </div>
      <h3 className={cn('font-medium text-foreground mb-1', config.title)}>{title}</h3>
      {description && (
        <p className={cn('text-muted-foreground max-w-sm', config.description)}>{description}</p>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-4">
          <Plus className="w-4 h-4 mr-2" />
          {actionLabel}
        </Button>
      )}
      {children}
    </div>
  )
}

export default EmptyState
