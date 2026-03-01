import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getAccessToken } from './token-access';

interface AuthState {
  user: any;
  hasAccessToken: () => boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: (newValue: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      hasAccessToken: () => !!getAccessToken(),
      isAuthenticated: false,
      setIsAuthenticated: (newValue: boolean) => { set({ isAuthenticated: newValue }); }
    }),
    {
      name: 'auth-storage'
    },
  ),
)