"use client";

import {
  BellIcon,
  CogIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  EyeIcon,
  MoonIcon,
  PaintBrushIcon,
  ShieldCheckIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

interface NotificationSettings {
  email: {
    newCourses: boolean;
    assignments: boolean;
    events: boolean;
    announcements: boolean;
    newsletter: boolean;
  };
  push: {
    reminders: boolean;
    messages: boolean;
    achievements: boolean;
    deadlines: boolean;
  };
}

interface PrivacySettings {
  profileVisibility: "public" | "members" | "private";
  showEmail: boolean;
  showPhone: boolean;
  showActivity: boolean;
  allowMessages: boolean;
}

interface AppearanceSettings {
  theme: "light" | "dark" | "system";
  language: "vi" | "en";
  fontSize: "small" | "medium" | "large";
  compactMode: boolean;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "notifications" | "privacy" | "appearance" | "security"
  >("notifications");

  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
      email: {
        newCourses: true,
        assignments: true,
        events: true,
        announcements: true,
        newsletter: false,
      },
      push: {
        reminders: true,
        messages: true,
        achievements: true,
        deadlines: true,
      },
    });

  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    profileVisibility: "members",
    showEmail: false,
    showPhone: false,
    showActivity: true,
    allowMessages: true,
  });

  const [appearanceSettings, setAppearanceSettings] =
    useState<AppearanceSettings>({
      theme: "system",
      language: "vi",
      fontSize: "medium",
      compactMode: false,
    });

  const handleSave = () => {
    // Handle save settings
    alert("Cài đặt đã được lưu!");
  };

  const tabs = [
    { id: "notifications", label: "Thông báo", icon: BellIcon },
    { id: "privacy", label: "Quyền riêng tư", icon: EyeIcon },
    { id: "appearance", label: "Giao diện", icon: PaintBrushIcon },
    { id: "security", label: "Bảo mật", icon: ShieldCheckIcon },
  ] as const;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Link href="/profile" className="hover:text-primary">
            Hồ sơ
          </Link>
          <span>/</span>
          <span className="text-gray-900">Cài đặt</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Cài đặt tài khoản
        </h1>
        <p className="text-gray-600">
          Quản lý tùy chọn cá nhân và cài đặt ứng dụng
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="bg-white rounded-lg shadow-sm border p-4">
            <ul className="space-y-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-primary text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                      {tab.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border">
            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Cài đặt thông báo
                </h2>

                <div className="space-y-8">
                  {/* Email Notifications */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Thông báo Email
                    </h3>
                    <div className="space-y-4">
                      {Object.entries(notificationSettings.email).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {key === "newCourses" && "Khóa học mới"}
                                {key === "assignments" && "Bài tập và deadline"}
                                {key === "events" && "Sự kiện và workshop"}
                                {key === "announcements" &&
                                  "Thông báo quan trọng"}
                                {key === "newsletter" && "Bản tin hàng tuần"}
                              </p>
                              <p className="text-sm text-gray-500">
                                {key === "newCourses" &&
                                  "Nhận thông báo khi có khóa học mới"}
                                {key === "assignments" &&
                                  "Nhắc nhở về bài tập và deadline"}
                                {key === "events" &&
                                  "Thông báo về sự kiện sắp diễn ra"}
                                {key === "announcements" &&
                                  "Các thông báo từ ban quản lý"}
                                {key === "newsletter" &&
                                  "Tổng hợp tin tức hàng tuần"}
                              </p>
                            </div>
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) =>
                                setNotificationSettings((prev) => ({
                                  ...prev,
                                  email: {
                                    ...prev.email,
                                    [key]: e.target.checked,
                                  },
                                }))
                              }
                              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Push Notifications */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Thông báo đẩy
                    </h3>
                    <div className="space-y-4">
                      {Object.entries(notificationSettings.push).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {key === "reminders" && "Nhắc nhở"}
                                {key === "messages" && "Tin nhắn"}
                                {key === "achievements" && "Thành tích"}
                                {key === "deadlines" && "Deadline"}
                              </p>
                              <p className="text-sm text-gray-500">
                                {key === "reminders" &&
                                  "Nhắc nhở về các hoạt động"}
                                {key === "messages" &&
                                  "Tin nhắn từ thành viên khác"}
                                {key === "achievements" &&
                                  "Thông báo khi đạt thành tích mới"}
                                {key === "deadlines" &&
                                  "Nhắc nhở deadline sắp tới"}
                              </p>
                            </div>
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) =>
                                setNotificationSettings((prev) => ({
                                  ...prev,
                                  push: {
                                    ...prev.push,
                                    [key]: e.target.checked,
                                  },
                                }))
                              }
                              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === "privacy" && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Quyền riêng tư
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hiển thị hồ sơ
                    </label>
                    <select
                      value={privacySettings.profileVisibility}
                      onChange={(e) =>
                        setPrivacySettings((prev) => ({
                          ...prev,
                          profileVisibility: e.target.value as any,
                        }))
                      }
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    >
                      <option value="public">Công khai</option>
                      <option value="members">Chỉ thành viên CLB</option>
                      <option value="private">Riêng tư</option>
                    </select>
                    <p className="text-sm text-gray-500 mt-1">
                      Quyết định ai có thể xem hồ sơ của bạn
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Thông tin cá nhân
                    </h3>

                    {Object.entries(privacySettings)
                      .slice(1)
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {key === "showEmail" && "Hiển thị email"}
                              {key === "showPhone" && "Hiển thị số điện thoại"}
                              {key === "showActivity" && "Hiển thị hoạt động"}
                              {key === "allowMessages" &&
                                "Cho phép nhận tin nhắn"}
                            </p>
                            <p className="text-sm text-gray-500">
                              {key === "showEmail" &&
                                "Cho phép thành viên khác xem email"}
                              {key === "showPhone" &&
                                "Cho phép thành viên khác xem SĐT"}
                              {key === "showActivity" &&
                                "Hiển thị lịch sử hoạt động"}
                              {key === "allowMessages" &&
                                "Nhận tin nhắn từ thành viên khác"}
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={value as boolean}
                            onChange={(e) =>
                              setPrivacySettings((prev) => ({
                                ...prev,
                                [key]: e.target.checked,
                              }))
                            }
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Giao diện
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Chủ đề
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { value: "light", label: "Sáng", icon: SunIcon },
                        { value: "dark", label: "Tối", icon: MoonIcon },
                        {
                          value: "system",
                          label: "Hệ thống",
                          icon: ComputerDesktopIcon,
                        },
                      ].map((theme) => {
                        const IconComponent = theme.icon;
                        return (
                          <button
                            key={theme.value}
                            onClick={() =>
                              setAppearanceSettings((prev) => ({
                                ...prev,
                                theme: theme.value as any,
                              }))
                            }
                            className={`p-4 rounded-lg border-2 transition-colors ${
                              appearanceSettings.theme === theme.value
                                ? "border-primary bg-primary/5"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <IconComponent className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                            <p className="text-sm font-medium text-gray-900">
                              {theme.label}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ngôn ngữ
                    </label>
                    <select
                      value={appearanceSettings.language}
                      onChange={(e) =>
                        setAppearanceSettings((prev) => ({
                          ...prev,
                          language: e.target.value as any,
                        }))
                      }
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    >
                      <option value="vi">Tiếng Việt</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kích thước chữ
                    </label>
                    <select
                      value={appearanceSettings.fontSize}
                      onChange={(e) =>
                        setAppearanceSettings((prev) => ({
                          ...prev,
                          fontSize: e.target.value as any,
                        }))
                      }
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    >
                      <option value="small">Nhỏ</option>
                      <option value="medium">Vừa</option>
                      <option value="large">Lớn</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Chế độ thu gọn
                      </p>
                      <p className="text-sm text-gray-500">
                        Hiển thị giao diện compact hơn
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={appearanceSettings.compactMode}
                      onChange={(e) =>
                        setAppearanceSettings((prev) => ({
                          ...prev,
                          compactMode: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Bảo mật
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Đổi mật khẩu
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mật khẩu hiện tại
                        </label>
                        <input
                          type="password"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mật khẩu mới
                        </label>
                        <input
                          type="password"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Xác nhận mật khẩu mới
                        </label>
                        <input
                          type="password"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        />
                      </div>
                      <button className="btn-primary">Cập nhật mật khẩu</button>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Phiên đăng nhập
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <DevicePhoneMobileIcon className="h-5 w-5 text-gray-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Chrome - Windows 11
                            </p>
                            <p className="text-sm text-gray-500">
                              Hiện tại • Ho Chi Minh City, Vietnam
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-green-600 font-medium">
                          Hiện tại
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <DevicePhoneMobileIcon className="h-5 w-5 text-gray-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Mobile App - iPhone
                            </p>
                            <p className="text-sm text-gray-500">
                              2 giờ trước • Ho Chi Minh City, Vietnam
                            </p>
                          </div>
                        </div>
                        <button className="text-sm text-red-600 hover:text-red-700">
                          Đăng xuất
                        </button>
                      </div>
                    </div>

                    <button className="mt-4 text-sm text-red-600 hover:text-red-700">
                      Đăng xuất tất cả thiết bị khác
                    </button>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Xóa tài khoản
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Việc xóa tài khoản sẽ không thể hoàn tác. Tất cả dữ liệu
                      của bạn sẽ bị xóa vĩnh viễn.
                    </p>
                    <button className="btn-secondary text-red-600 border-red-300 hover:bg-red-50">
                      Xóa tài khoản
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex justify-end gap-3">
                <button className="btn-secondary">Hủy</button>
                <button onClick={handleSave} className="btn-primary">
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
