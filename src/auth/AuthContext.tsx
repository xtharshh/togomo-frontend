import React, { createContext, useContext, useEffect, useState } from 'react';

import { fetchMe, loginWithPassword, logoutWithToken, registerWithPassword, type TogomoMe, type TogomoRegisterInput, type TogomoRole } from '../api/togomo';
import { clearAuthToken, loadAuthToken, saveAuthToken } from './tokenStore';

type AuthStatus = 'loading' | 'signed-out' | 'signed-in';

type AuthContextValue = {
  status: AuthStatus;
  token: string | null;
  me: TogomoMe | null;
  error: string | null;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (input: TogomoRegisterInput) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function roleLabel(role: TogomoRole | null) {
  switch (role) {
    case 'restaurant_owner':
      return 'Restaurant owner';
    case 'delivery_agent':
      return 'Delivery agent';
    case 'staff':
      return 'Staff';
    case 'admin':
      return 'Admin';
    default:
      return 'Customer';
  }
}

async function hydrateSession(token: string) {
  return fetchMe(token);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [token, setToken] = useState<string | null>(null);
  const [me, setMe] = useState<TogomoMe | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const boot = async () => {
      try {
        const storedToken = await loadAuthToken();
        if (!storedToken) {
          setStatus('signed-out');
          return;
        }
        setToken(storedToken);
        const session = await hydrateSession(storedToken);
        setMe(session);
        setStatus('signed-in');
      } catch (sessionError) {
        await clearAuthToken();
        setToken(null);
        setMe(null);
        setStatus('signed-out');
        setError(sessionError instanceof Error ? sessionError.message : 'Unable to restore session');
      }
    };

    void boot();
  }, []);

  const signIn = async (username: string, password: string) => {
    setError(null);
    const session = await loginWithPassword(username, password);
    await saveAuthToken(session.token);
    setToken(session.token);
    const profile = await hydrateSession(session.token);
    setMe(profile);
    setStatus('signed-in');
  };

  const signUp = async (input: TogomoRegisterInput) => {
    setError(null);
    const session = await registerWithPassword(input);
    await saveAuthToken(session.token);
    setToken(session.token);
    const profile = await hydrateSession(session.token);
    setMe(profile);
    setStatus('signed-in');
  };

  const signOut = async () => {
    if (token) {
      try {
        await logoutWithToken(token);
      } catch {
        // Clear local session even if remote logout fails.
      }
    }
    await clearAuthToken();
    setToken(null);
    setMe(null);
    setStatus('signed-out');
  };

  return <AuthContext.Provider value={{ status, token, me, error, signIn, signUp, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
