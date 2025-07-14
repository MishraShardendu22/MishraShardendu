import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface User {
    id: string;
}
    
interface State {
        user: User | null;
        setUser: (userData: User | null) => void;
    }
export const useUserStore = create<State>()(
        persist(
            (set) => ({
                user: null,
                setUser: (userData: User | null) => set({ user: userData }),
            }),
            { 
                name: 'user-store' }
            )
);