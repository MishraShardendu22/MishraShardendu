import { Check } from 'lucide-react'
import type { JSX } from 'preact'
import { forwardRef } from 'preact/compat'
import { cn } from '../../lib/utils'

export interface CheckboxProps extends Omit<JSX.HTMLAttributes<HTMLInputElement>, 'type'> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => (
    <div className="relative inline-flex">
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        onChange={(e) => onCheckedChange?.((e.target as HTMLInputElement).checked)}
        className="sr-only peer"
        {...props}
      />
      <div
        className={cn(
          'h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 peer-checked:bg-primary peer-checked:text-primary-foreground flex items-center justify-center',
          className
        )}
      >
        {checked && <Check className="h-4 w-4" />}
      </div>
    </div>
  )
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
