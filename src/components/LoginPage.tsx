"use client";

import { useLogin } from "@/hooks/auth-hook";
import { LoginRequest } from "@/types/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { func, isLoading } = useLogin();
  const [error, setError] = useState<Error | null>(null);
  const [formData, setFormData] = useState<LoginRequest>({
    password: "",
  });
  const router = useRouter();

  function handleChange(field: keyof LoginRequest, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit() {
    func(formData)
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        setError(err);
      });
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(); // Gọi submit khi ấn Enter
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="text-xl text-center text-gray-600 space-x-8 mb-8">
        Đăng nhập bằng tài khoản
      </div>
      <input
        type="text"
        value={formData.username || ""}
        className="border border-gray-300 rounded-md p-2"
        placeholder="Email hoặc Username"
        onChange={(e) => {
          handleChange("username", e.target.value);
          handleChange("email", e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
      <input
        type="password"
        value={formData.password || ""}
        className="border border-gray-300 rounded-md p-2"
        placeholder="Mật khẩu"
        onChange={(e) => handleChange("password", e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="flex items-center justify-end space-x-4">
        <Link
          href="/auth/forgot-password"
          className="text-sm text-gray-600 hover:underline hover:text-[#267452]"
        >
          Quên mật khẩu?
        </Link>
      </div>

      <div className="flex items-center justify-center w-full">
        {isLoading ? (
          <div className="bg-[#1f5e42] text-white text-center rounded-md p-2 w-full cursor-not-allowed">
            Đang xử lý ...
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-[#267452] text-white rounded-md p-2 w-full hover:bg-[#1f5e42] transition-colors duration-200"
          >
            Đăng nhập
          </button>
        )}
      </div>
      {error && (
        <div className="text-red-500 text-sm text-center">{error.message}</div>
      )}
      <div className="flex items-center">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="px-3 text-gray-500 text-sm">hoặc</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>
      <Link
        href="/auth/register"
        className="block w-full p-2 text-sm text-[#267452] text-center border border-[#267452] rounded-md hover:bg-[#c9c9c9] hover:text-black transition-colors duration-200"
      >
        Đăng ký
      </Link>
    </div>
  );
}
