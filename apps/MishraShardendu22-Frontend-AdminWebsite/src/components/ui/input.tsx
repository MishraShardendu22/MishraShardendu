import type { JSX } from 'preact'
import { forwardRef } from 'preact/compat'
import { cn } from '../../lib/utils'

export interface InputProps extends JSX.HTMLAttributes<HTMLInputElement> {
  type?: string
  disabled?: boolean
  value?: string | number
  onChange?: JSX.GenericEventHandler<HTMLInputElement>
  required?: boolean
  placeholder?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', disabled, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input }
