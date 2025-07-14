/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

interface UserState {
  user: any;
  setUser: (user: any) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>((set) => 
  (
    {
      user: null,
      setUser: (user) => set({ user }),
      resetUser: () => set({ user: null }),
    }
  )
);