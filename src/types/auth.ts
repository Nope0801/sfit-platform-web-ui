export interface LoginRequest {
  email?: string;
  username?: string;
  password: string;
}

export interface RegisterRequest {
  full_name: string;
  class_name: string;
  username: string;
  khoa: string;
  email: string;
  password: string;
  phone: string;
  msv: string;
}