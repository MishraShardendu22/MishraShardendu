import { writable } from 'svelte/store'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
}

interface ToastState {
  toasts: Toast[]
}

function createToastStore() {
  const { subscribe, update } = writable<ToastState>({ toasts: [] })

  const add = (type: ToastType, message: string, duration: number = 5000) => {
    const id = `toast-${Date.now()}-${Math.random()}`
    const toast: Toast = { id, type, message, duration }

    update((state) => ({
      toasts: [...state.toasts, toast],
    }))

    if (duration > 0) {
      setTimeout(() => {
        update((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }))
      }, duration)
    }

    return id
  }

  const remove = (id: string) => {
    update((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }))
  }

  const clear = () => {
    update(() => ({ toasts: [] }))
  }

  return {
    subscribe,
    add,
    remove,
    clear,
    success: (message: string, duration?: number) => add('success', message, duration),
    error: (message: string, duration?: number) => add('error', message, duration),
    warning: (message: string, duration?: number) => add('warning', message, duration),
    info: (message: string, duration?: number) => add('info', message, duration),
  }
}

export const toastStore = createToastStore()

// Convenience alias
export const toast = toastStore
