import { authService } from "@/services/auth-service";
import { LoginRequest, RegisterRequest } from "@/types/auth";
import { HookCallback } from "@/types/hook-template";
import { ResponseTemplate } from "@/types/response-template";
import { AxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function useLogin(): HookCallback<LoginRequest> {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function login(req: LoginRequest): Promise<void> {
    setIsLoading(true);

    try {
      const response = await authService.login(req);

      localStorage.setItem("accessToken", response.data || "");
    } catch (err) {
      const error = err as AxiosError<ResponseTemplate<null>>;
      throw new Error(error.response?.data.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, func: login };
}

export function useRegister(): HookCallback<RegisterRequest> {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function register(req: RegisterRequest): Promise<void> {
    setIsLoading(true);

    try {
      const response = await authService.register(req);

      localStorage.setItem("accessToken", response.data || "");
    } catch (err) {
      const error = err as AxiosError<ResponseTemplate<null>>;
      throw new Error(error.response?.data.message || "Register failed");
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, func: register };
}

export function useLogout(): { isLoading: boolean; func: () => Promise<void> } {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  async function logout(): Promise<void> {
    setIsLoading(true);
    try {
      try {
        await authService.logout();
      } catch {
        // ignore API logout errors; still clear local state
      }
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
      }
      router.push("/auth/login");
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, func: logout };
}
