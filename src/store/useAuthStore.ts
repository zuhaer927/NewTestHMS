import { create } from 'zustand';
import { User, UserRole } from '../types';

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  getCurrentUserRole: () => UserRole | null;
}

// In a real app, this would connect to a backend
// For demo purposes, we'll use hardcoded users
const demoUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@seastarresort.com',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Manager User',
    email: 'manager@seastarresort.com',
    role: 'manager',
  },
];

export const useAuthStore = create<AuthState>((set, get) => ({
  currentUser: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    // In a real app, this would validate against a backend
    // For demo, we'll accept any password and find a matching email
    const foundUser = demoUsers.find(user => user.email === email);
    
    if (foundUser) {
      set({ currentUser: foundUser, isAuthenticated: true });
      return true;
    }
    
    return false;
  },

  logout: () => {
    set({ currentUser: null, isAuthenticated: false });
  },

  getCurrentUserRole: () => {
    return get().currentUser?.role || null;
  },
}));