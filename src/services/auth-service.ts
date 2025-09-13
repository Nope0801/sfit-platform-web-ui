import apiClient from "@/libs/http";
import { LoginRequest, RegisterRequest } from "@/types/auth";
import { ResponseTemplate } from "@/types/response-template";

class AuthService {
  async login(req: LoginRequest): Promise<ResponseTemplate<string>> {
    const response = await apiClient.post<ResponseTemplate<string>>(
      "/auth/login",
      req
    );

    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async logout(): Promise<ResponseTemplate<null>> {
    const response = await apiClient.post<ResponseTemplate<null>>(
      "/auth/logout"
    );

    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async register(req: RegisterRequest): Promise<ResponseTemplate<string>> {
    const response = await apiClient.post<ResponseTemplate<string>>(
      "/auth/register",
      req
    );

    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }
}

export const authService = new AuthService();
