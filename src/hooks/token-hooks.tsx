"use client";

import { tokenService } from "@/services/token-service";
import { TokenPayload } from "@/types/token";

export function useToken(): string | null {
  return tokenService.getToken();
}

export function useTokenPayload(): TokenPayload | null {
  const token = useToken();
  return token ? tokenService.getPayload(token) : null;
}

export function useTokenSubject(): string | null {
  const token = useToken();
  return token ? tokenService.getSubject(token) : null;
}

export function useTokenExpiration(): number | null {
  const token = useToken();
  return token ? tokenService.getExpiration(token) : null;
}
