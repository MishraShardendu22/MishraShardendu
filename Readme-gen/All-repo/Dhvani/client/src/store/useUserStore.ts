import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
    name: string
    email: string
    token: string
    address: string
    height?: number
    weight?: number
    bloodGroup?: string
    gender?: string
}

interface UserState {
    user: User | null
    setUser: (u: User) => void
    logout: () => void
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
        user: null,
        setUser: (userData) => set({ user: userData }),
        logout: () => set({ user: null }),
        }),
        {
        name: 'user-storage',       
        partialize: (state) => ({ 
            user: state.user,
        }),
        }
    )
)
