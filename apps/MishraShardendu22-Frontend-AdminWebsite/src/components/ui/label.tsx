import type { JSX } from 'preact'
import { forwardRef } from 'preact/compat'
import { cn } from '../../lib/utils'

export interface LabelProps extends JSX.HTMLAttributes<HTMLLabelElement> {
  htmlFor?: string
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  )
})

Label.displayName = 'Label'

export { Label }
