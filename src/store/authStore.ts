import { create } from 'zustand';
import { auth, db } from '../config/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  User
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  signIn: async (email, password) => {
    try {
      set({ loading: true, error: null });
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  signUp: async (email, password, userData) => {
    try {
      set({ loading: true, error: null });
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', user.uid), {
        ...userData,
        email,
        createdAt: new Date().toISOString(),
      });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      set({ user: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },
  setUser: (user) => set({ user }),
}));