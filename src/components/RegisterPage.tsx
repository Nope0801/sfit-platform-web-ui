"use client";

import { useRegister } from "@/hooks/auth-hook";
import { useCreateUserProfile } from "@/hooks/user-profile-hooks";
import { RegisterRequest } from "@/types/auth";
import { CreateUserProfileRequest } from "@/types/user-profile";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const { func, isLoading } = useRegister();
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterRequest>({
    username: "",
    email: "",
    password: "",
  });
  const { func: createUserProfile, isLoading: isCreating } =
    useCreateUserProfile();
  const [formUserProfile, setFormUserProfile] = useState<
    Partial<CreateUserProfileRequest>
  >({});

  function handleChange(field: keyof RegisterRequest, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleChangeUserProfile(
    field: keyof CreateUserProfileRequest,
    value: string
  ) {
    setFormUserProfile((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit() {
    func(formData)
      .then(() => {
        createUserProfile(formUserProfile as CreateUserProfileRequest)
          .then(() => {
            router.push("/");
          })
          .catch((err) => {
            setError(err);
          });
      })
      .catch((err) => {
        setError(err);
      });
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="text-xl text-center text-gray-600 space-x-8 mb-8">
        Tạo tài khoản mới
      </div>
      <input
        type="text"
        value={formUserProfile.full_name || ""}
        className="border border-gray-300 rounded-md p-2"
        placeholder="Full Name"
        onChange={(e) => handleChangeUserProfile("full_name", e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          value={formUserProfile.class_name || ""}
          className="col-span-2 border border-gray-300 rounded-md p-2"
          placeholder="Tên lớp"
          onChange={(e) =>
            handleChangeUserProfile("class_name", e.target.value)
          }
        />
        <input
          type="text"
          value={formUserProfile.khoa || ""}
          className="border border-gray-300 rounded-md p-2"
          placeholder="Khóa"
          onChange={(e) => handleChangeUserProfile("khoa", e.target.value)}
        />
      </div>
      <input
        type="text"
        value={formData.username || ""}
        className="border border-gray-300 rounded-md p-2"
        placeholder="Username"
        onChange={(e) => handleChange("username", e.target.value)}
      />
      <input
        type="email"
        value={formData.email || ""}
        className="border border-gray-300 rounded-md p-2"
        placeholder="Email"
        onChange={(e) => handleChange("email", e.target.value)}
      />
      <input
        type="password"
        value={formData.password || ""}
        className="border border-gray-300 rounded-md p-2"
        placeholder="Mật khẩu"
        onChange={(e) => handleChange("password", e.target.value)}
      />
      <div className="flex items-center justify-center w-full">
        {isLoading && isCreating ? (
          <div className="bg-[#1f5e42] text-white text-center rounded-md p-2 w-full cursor-not-allowed">
            Đang xử lý ...
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-[#267452] text-white rounded-md p-2 w-full hover:bg-[#1f5e42] transition-colors duration-200"
          >
            Đăng ký
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
        href="/auth/login"
        className="block w-full p-2 text-sm text-[#267452] text-center border border-[#267452] rounded-md hover:bg-[#c9c9c9] hover:text-black transition-colors duration-200"
      >
        Đăng nhập
      </Link>
    </div>
  );
}
