import type { JSX } from 'preact'
import { forwardRef } from 'preact/compat'
import { cn } from '../../lib/utils'

interface TooltipProviderProps {
  children: JSX.Element | JSX.Element[]
}

const TooltipProvider = ({ children }: TooltipProviderProps) => {
  return <div>{children}</div>
}

interface TooltipProps {
  open?: boolean
  children?: JSX.Element | JSX.Element[]
}

const Tooltip = ({ children }: TooltipProps) => {
  return <div className="relative inline-block">{children}</div>
}

const TooltipTrigger = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return <div>{children}</div>
}

interface TooltipContentProps extends JSX.HTMLAttributes<HTMLDivElement> {
  sideOffset?: number
}

const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md',
        className
      )}
      style={{ marginTop: `${sideOffset}px` }}
      {...props}
    />
  )
)
TooltipContent.displayName = 'TooltipContent'

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
