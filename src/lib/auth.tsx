import type { ReactNode } from "react";

export interface AuthState { isAuthenticated: boolean; }
export const authState: AuthState = { isAuthenticated: true };

export function AuthGuard({ children }: { children: ReactNode }) {
  return children;
}