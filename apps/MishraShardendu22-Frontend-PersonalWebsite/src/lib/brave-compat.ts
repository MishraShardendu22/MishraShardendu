/**
 * Brave Browser Compatibility Utilities
 *
 * This module provides utilities to ensure consistent hover and focus behavior
 * across Brave and Chrome browsers. Brave's Chromium variant sometimes has
 * subtle differences in event handling, particularly with pointer events.
 */

import { useEffect, useState, useCallback, useRef } from 'react'

/**
 * Detects if the browser is Brave
 * Brave has a navigator.brave object and specific API
 */
export function isBrave(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false)

  // Check for Brave's specific API
  if ((navigator as any).brave && (navigator as any).brave.isBrave) {
    return (navigator as any).brave.isBrave()
  }

  return Promise.resolve(false)
}

/**
 * Detects if the browser supports hover interactions
 * Uses media query to detect if hover is available (not touch-only device)
 */
export function supportsHover(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

/**
 * Type guard for mouse events vs touch/pen events
 * Brave sometimes fires mouseenter with pointerType !== 'mouse'
 */
export function isMousePointer(
  event: MouseEvent | PointerEvent | React.MouseEvent | React.PointerEvent
): boolean {
  // For PointerEvent, check pointerType
  if ('pointerType' in event) {
    return event.pointerType === 'mouse'
  }

  // For MouseEvent, check that it's not from touch
  // Touch events shouldn't trigger mouse events, but some browsers synthesize them
  if ('sourceCapabilities' in event && event.sourceCapabilities) {
    return !(event.sourceCapabilities as any).firesTouchEvents
  }

  return true
}

/**
 * Hook to detect if hover should be enabled
 * Combines device capability check with browser detection
 */
export function useHoverEnabled(): boolean {
  const [hoverEnabled, setHoverEnabled] = useState(false)

  useEffect(() => {
    // Check if device supports hover
    const hasHover = supportsHover()
    setHoverEnabled(hasHover)

    // Listen for changes in hover capability (e.g., external mouse connected)
    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const handleChange = (e: MediaQueryListEvent) => setHoverEnabled(e.matches)

    hoverQuery.addEventListener('change', handleChange)
    return () => hoverQuery.removeEventListener('change', handleChange)
  }, [])

  return hoverEnabled
}

/**
 * Creates a hover handler that only triggers for real mouse events
 * Prevents touch, pen, or synthetic events from triggering hover
 */
export function createSafeHoverHandler<T extends HTMLElement>(
  onHover: (isHovering: boolean) => void,
  delay = 0
): {
  onMouseEnter: (e: React.MouseEvent<T>) => void
  onMouseLeave: (e: React.MouseEvent<T>) => void
  onPointerEnter: (e: React.PointerEvent<T>) => void
  onPointerLeave: (e: React.PointerEvent<T>) => void
} {
  let timeoutId: NodeJS.Timeout | null = null

  const handleEnter = (e: React.MouseEvent<T> | React.PointerEvent<T>) => {
    // Only proceed if it's a real mouse pointer
    if (!isMousePointer(e)) return

    // Only proceed if device supports hover
    if (!supportsHover()) return

    // Clear any pending timeout
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    // Apply delay to prevent instant activation (Brave issue)
    if (delay > 0) {
      timeoutId = setTimeout(() => onHover(true), delay)
    } else {
      onHover(true)
    }
  }

  const handleLeave = (e: React.MouseEvent<T> | React.PointerEvent<T>) => {
    // Only proceed if it's a real mouse pointer
    if (!isMousePointer(e)) return

    // Clear any pending timeout
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }

    onHover(false)
  }

  return {
    onMouseEnter: handleEnter as (e: React.MouseEvent<T>) => void,
    onMouseLeave: handleLeave as (e: React.MouseEvent<T>) => void,
    onPointerEnter: handleEnter as (e: React.PointerEvent<T>) => void,
    onPointerLeave: handleLeave as (e: React.PointerEvent<T>) => void,
  }
}

/**
 * Hook for managing hover state with Brave compatibility
 * Returns hover state and safe event handlers
 */
export function useSafeHover<T extends HTMLElement>(
  delay = 0
): {
  isHovering: boolean
  hoverEnabled: boolean
  handlers: ReturnType<typeof createSafeHoverHandler<T>>
} {
  const [isHovering, setIsHovering] = useState(false)
  const hoverEnabled = useHoverEnabled()
  const handlersRef = useRef<ReturnType<typeof createSafeHoverHandler<T>> | null>(null)

  // Create handlers only once
  if (!handlersRef.current) {
    handlersRef.current = createSafeHoverHandler<T>(setIsHovering, delay)
  }

  // Reset hover state if hover becomes disabled
  useEffect(() => {
    if (!hoverEnabled && isHovering) {
      setIsHovering(false)
    }
  }, [hoverEnabled, isHovering])

  return {
    isHovering: hoverEnabled ? isHovering : false,
    hoverEnabled,
    handlers: handlersRef.current,
  }
}

/**
 * Normalizes focus behavior across browsers
 * Brave sometimes has different focus-visible behavior
 */
export function normalizeFocus(element: HTMLElement | null): void {
  if (!element) return

  // Ensure focus-visible is properly set
  element.addEventListener('focus', (e) => {
    // Check if focus came from keyboard
    const isKeyboard =
      e instanceof FocusEvent && (e as any).sourceCapabilities?.firesTouchEvents === false

    if (isKeyboard) {
      element.setAttribute('data-focus-visible', 'true')
    }
  })

  element.addEventListener('blur', () => {
    element.removeAttribute('data-focus-visible')
  })
}

/**
 * Hook to add Brave-specific event normalization on mount
 */
export function useBraveEventNormalization(): void {
  useEffect(() => {
    if (typeof window === 'undefined') return

    let isBraveFlag = false

    isBrave().then((result) => {
      isBraveFlag = result

      if (!isBraveFlag) return

      // Add global event listener to normalize pointer events in Brave
      const normalizePointerEvent = (e: PointerEvent) => {
        // If it's not a mouse pointer, prevent it from triggering hover-like states
        if (e.pointerType !== 'mouse') {
          // Mark the event as non-mouse
          ;(e as any).__nonMousePointer = true
        }
      }

      document.addEventListener('pointerenter', normalizePointerEvent, {
        capture: true,
      })
      document.addEventListener('pointerover', normalizePointerEvent, {
        capture: true,
      })

      return () => {
        document.removeEventListener('pointerenter', normalizePointerEvent, {
          capture: true,
        })
        document.removeEventListener('pointerover', normalizePointerEvent, {
          capture: true,
        })
      }
    })
  }, [])
}

/**
 * CSS class helpers for hover-enabled states
 */
export const hoverClasses = {
  /**
   * Only apply hover styles on devices that support hover
   * Usage: className={hoverClasses.onHover('hover:bg-accent')}
   */
  onHover: (classes: string): string => {
    if (typeof window !== 'undefined' && !supportsHover()) {
      return ''
    }
    return classes
  },

  /**
   * Apply base and hover classes conditionally
   * Usage: className={hoverClasses.conditional('bg-white', 'hover:bg-gray-100')}
   */
  conditional: (base: string, hover: string): string => {
    if (typeof window !== 'undefined' && !supportsHover()) {
      return base
    }
    return `${base} ${hover}`
  },
}

/**
 * Transition delay normalization for Brave
 * Brave sometimes activates hover states instantly, this adds consistent delay
 */
export const HOVER_TRANSITION_DELAY = 50 // ms
export const FOCUS_TRANSITION_DELAY = 0 // ms (focus should be instant)

/**
 * Get normalized transition duration based on browser
 */
export async function getTransitionDuration(baseMs: number): Promise<number> {
  const brave = await isBrave()

  // Brave sometimes needs slightly longer transitions for smooth hover
  return brave ? baseMs * 1.1 : baseMs
}
