import { TokenPayload } from "@/types/token";

class TokenService {
  getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken");
    }
    return null;
  }
  // Decode JWT token and return its payload
  getPayload(token: string): TokenPayload | null {
    try {
      const payload = JSON.parse(atob(token.split(".")[1])) as TokenPayload;
      return payload;
    } catch {
      return null;
    }
  }

  // Get the subject (user ID) from the token payload
  getSubject(token: string): string | null {
    const payload = this.getPayload(token);
    return payload ? payload.sub : null;
  }

  // Get the expiration time from the token payload
  getExpiration(token: string): number | null {
    const payload = this.getPayload(token);
    return payload ? payload.exp : null;
  }
}

export const tokenService = new TokenService();
