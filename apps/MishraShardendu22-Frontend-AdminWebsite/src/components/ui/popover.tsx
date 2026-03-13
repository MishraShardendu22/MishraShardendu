import type { JSX } from 'preact'
import { forwardRef } from 'preact/compat'
import { cn } from '../../lib/utils'

interface PopoverProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: JSX.Element | JSX.Element[]
}

const Popover = ({ open, children }: PopoverProps) => {
  if (!open) return null
  return <div>{children}</div>
}

const PopoverTrigger = ({
  children,
  onClick,
}: {
  children: JSX.Element | JSX.Element[]
  onClick?: () => void
}) => {
  return <div onClick={onClick}>{children}</div>
}

interface PopoverContentProps extends JSX.HTMLAttributes<HTMLDivElement> {
  align?: 'center' | 'start' | 'end'
  sideOffset?: number
}

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, align: _align = 'center', sideOffset = 4, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
        className
      )}
      style={{ marginTop: `${sideOffset}px` }}
      {...props}
    />
  )
)
PopoverContent.displayName = 'PopoverContent'

export { Popover, PopoverContent, PopoverTrigger }
