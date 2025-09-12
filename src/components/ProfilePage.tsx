"use client";

import { useTokenSubject } from "@/hooks/token-hooks";
import useUserProfile, {
  useUpdateUserProfile,
} from "@/hooks/user-profile-hooks";
import {
  UserProfileResponse,
  UserProfileUpdateRequest,
} from "@/types/user-profile";
import {
  AcademicCapIcon,
  CalendarIcon,
  CameraIcon,
  ChartBarIcon,
  CheckCircleIcon,
  CogIcon,
  EnvelopeIcon,
  MapPinIcon,
  PencilIcon,
  PhoneIcon,
  TrophyIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import AvatarUploadModal from "./AvatarUploadModal";
import CoverImageUploadModal from "./CoverImageModal";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const {
    updateUserProfile,
    isLoading: updateLoading,
    error: updateError,
  } = useUpdateUserProfile();
  const [showAvatarModal, setShowAvatarModal] = useState<boolean>(false);
  const [showCoverImageModal, setShowCoverImageModal] =
    useState<boolean>(false);
  const tokenSub = useTokenSubject();
  const { data, error, isLoading } = useUserProfile(tokenSub || undefined);
  const [profileData, setProfileData] = useState<typeof data | null>(null);

  const [formData, setFormData] = useState<Partial<UserProfileUpdateRequest>>(
    {}
  );

  function resetForm(data: UserProfileResponse | null) {
    setFormData({
      full_name: data?.full_name,
      introduction: data?.introduction,
      phone: data?.phone,
      location: data?.location,
      social_link: {
        ...data?.social_link,
      },
      avatar: data?.avatar,
      cover_image: data?.cover_image,
      class_name: data?.class_name,
      email: data?.email,
      khoa: data?.khoa,
      msv: data?.msv,
    });
  }

  useEffect(() => {
    resetForm(data);
    setProfileData(data);
  }, [data]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    if (field === "github" || field === "linkedin" || field === "facebook") {
      setFormData((prev) => ({
        ...prev,
        social_link: {
          ...prev.social_link,
          [field]: value,
        },
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!profileData) return;
    updateUserProfile(formData)
      .then(() => {
        setProfileData({
          ...profileData,
          user_id: profileData.user_id,
          full_name: formData.full_name ?? profileData.full_name,
          introduction: formData.introduction ?? profileData.introduction,
          phone: formData.phone ?? profileData.phone,
          location: formData.location ?? profileData.location,
          social_link: {
            ...profileData.social_link,
            ...formData.social_link,
          },
          avatar: formData.avatar ?? profileData.avatar,
          cover_image: formData.cover_image ?? profileData.cover_image,
          class_name: formData.class_name ?? profileData.class_name,
          email: formData.email ?? profileData.email,
          khoa: formData.khoa ?? profileData.khoa,
          msv: formData.msv ?? profileData.msv,
          created_at: profileData.created_at,
          updated_at: profileData.updated_at,
          completed_course: profileData.completed_course,
          joined_event: profileData.joined_event,
          completed_task: profileData.completed_task,
        });
      })
      .finally(() => {
        setIsEditing(false);
      });
  };

  const handleCancel = () => {
    resetForm(profileData);
    setIsEditing(false);
  };

  const handleImageUpload = (
    field: "avatar" | "cover_image",
    imageURL: string
  ) => {
    handleInputChange(field, imageURL || "");
    formData[field] = imageURL || "";
    handleSave();
  };

  const tabs = [
    { id: "overview", label: "Tổng quan", icon: UserIcon },
    // {
    //   id: "achievements",
    //   label: "Thành tích",
    //   icon: TrophyIcon,
    //   link: "/profile/achievements",
    // },
    // { id: "skills", label: "Kỹ năng", icon: AcademicCapIcon },
    { id: "statistics", label: "Thống kê", icon: ChartBarIcon },
    // {
    //   id: "activity",
    //   label: "Hoạt động",
    //   icon: ChartBarIcon,
    //   link: "/profile/activity",
    // },
    {
      id: "settings",
      label: "Cài đặt",
      icon: CogIcon,
      link: "/profile/settings",
    },
  ];

  if (!mounted) return null;
  if (!tokenSub) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Vui lòng đăng nhập để xem hồ sơ.
      </div>
    );
  }

  if (isLoading || updateLoading) {
    return (
      <div className="animate-pulse text-center mt-20 text-gray-500">
        Đang tải hồ sơ...
      </div>
    );
  } else if (error || updateError) {
    return (
      <div className="text-center mt-20 text-red-500">
        Lỗi khi tải hồ sơ: {error?.message || updateError?.message}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cover and Profile Picture */}
      <div className="relative mb-8">
        {/* Cover Image */}
        <div className="w-full h-48 md:h-64 bg-gradient-to-br from-[#267452] to-[#1f5e42] rounded-lg overflow-hidden relative">
          {profileData && profileData.cover_image ? (
            <img
              src={profileData.cover_image}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          )}
          <button
            onClick={() => setShowCoverImageModal(true)}
            className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-lg transition-all duration-200"
          >
            <CameraIcon className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Profile Picture */}
        <div className="absolute -bottom-16 left-8">
          <div className="relative">
            <div className="w-32 h-32 bg-gray-300 rounded-full border-4 border-white overflow-hidden">
              {profileData && profileData.avatar ? (
                <img
                  src={profileData.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#267452] to-[#1f5e42] flex items-center justify-center">
                  <UserIcon className="w-16 h-16 text-white" />
                </div>
              )}
            </div>
            <button
              onClick={() => setShowAvatarModal(true)}
              className="absolute bottom-2 right-2 bg-white border border-gray-300 p-2 rounded-full hover:bg-gray-50 transition-all duration-200"
            >
              <CameraIcon className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="absolute bottom-4 right-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-primary flex items-center"
            >
              <PencilIcon className="w-4 h-4 mr-2" />
              Chỉnh sửa hồ sơ
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="btn-primary flex items-center"
              >
                <CheckCircleIcon className="w-4 h-4 mr-2" />
                Lưu
              </button>
              <button
                onClick={handleCancel}
                className="btn-secondary flex items-center"
              >
                <XMarkIcon className="w-4 h-4 mr-2" />
                Hủy
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-20 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="text-center mb-6">
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) =>
                      handleInputChange("full_name", e.target.value)
                    }
                    className="text-2xl font-bold text-gray-900 text-center w-full border-b border-gray-300 focus:border-[#267452] outline-none"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-900">
                    {profileData?.full_name}
                  </h1>
                )}
                <p className="text-gray-600 mt-1">
                  {profileData?.msv} • K{profileData?.khoa}
                </p>
                <p className="text-gray-500 text-sm">
                  {profileData?.class_name}
                </p>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Giới thiệu
                </h3>
                {isEditing ? (
                  <textarea
                    value={formData.introduction}
                    onChange={(e) =>
                      handleInputChange("introduction", e.target.value)
                    }
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#267452] focus:border-transparent outline-none text-sm"
                  />
                ) : (
                  <p className="text-gray-600 text-sm">
                    {profileData?.introduction}
                  </p>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <EnvelopeIcon className="w-4 h-4 mr-3 text-[#267452]" />
                  <span>{profileData?.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <PhoneIcon className="w-4 h-4 mr-3 text-[#267452]" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="flex-1 border-b border-gray-300 focus:border-[#267452] outline-none"
                    />
                  ) : (
                    <span>{profileData?.phone}</span>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPinIcon className="w-4 h-4 mr-3 text-[#267452]" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      className="flex-1 border-b border-gray-300 focus:border-[#267452] outline-none"
                    />
                  ) : (
                    <span>{profileData?.location}</span>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CalendarIcon className="w-4 h-4 mr-3 text-[#267452]" />
                  <span>
                    Tham gia từ{" "}
                    {data &&
                      new Date(data.created_at).toLocaleDateString("vi-VN")}
                  </span>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Liên kết xã hội
                </h3>
                <div className="space-y-2">
                  {["github", "linkedin", "facebook"].map((platform) => (
                    <div key={platform} className="flex items-center text-sm">
                      <span className="w-16 text-gray-600 capitalize">
                        {platform}:
                      </span>
                      {isEditing ? (
                        <input
                          type="url"
                          value={
                            formData.social_link?.[
                              platform as keyof typeof formData.social_link
                            ]
                          }
                          onChange={(e) =>
                            handleInputChange(platform, e.target.value)
                          }
                          className="flex-1 ml-2 border-b border-gray-300 focus:border-[#267452] outline-none text-[#267452]"
                        />
                      ) : (
                        <a
                          href={
                            profileData?.social_link?.[
                              platform as keyof typeof profileData.social_link
                            ]
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-[#267452] hover:underline"
                        >
                          {
                            profileData?.social_link?.[
                              platform as keyof typeof profileData.social_link
                            ]
                          }
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Tabs Content */}
          <div className="lg:col-span-2">
            {/* Tabs Navigation */}
            <div className="flex flex-wrap border-b border-gray-200 mb-6">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;

                if (tab.link) {
                  return (
                    <Link
                      key={tab.id}
                      href={tab.link}
                      className="flex items-center px-4 py-2 text-sm font-medium border-b-2 border-transparent text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {tab.label}
                    </Link>
                  );
                }

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
                      activeTab === tab.id
                        ? "border-[#267452] text-[#267452]"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Quick Stats */}
                  <div className="card">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Thống kê nhanh
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#267452]">
                          {profileData?.completed_course}
                        </p>
                        <p className="text-sm text-gray-600">
                          Khóa học hoàn thành
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#267452]">
                          {profileData?.joined_event}
                        </p>
                        <p className="text-sm text-gray-600">
                          Sự kiện tham gia
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#267452]">
                          {profileData?.completed_task}
                        </p>
                        <p className="text-sm text-gray-600">
                          Nhiệm vụ hoàn thành
                        </p>
                      </div>
                      {/* <div className="text-center">
                        <p className="text-2xl font-bold text-[#267452]">
                          {userData.statistics.totalPoints}
                        </p>
                        <p className="text-sm text-gray-600">Tổng điểm</p>
                      </div> */}
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="card">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Liên kết nhanh
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                      {/* <Link
                        href="/profile/achievements"
                        className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg hover:shadow-md transition-all duration-200 group"
                      >
                        <div className="p-3 bg-yellow-200 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                          <TrophyIcon className="w-6 h-6 text-yellow-700" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            Thành tích
                          </h4>
                          <p className="text-sm text-gray-600">
                            Xem chi tiết thành tích và huy hiệu
                          </p>
                        </div>
                      </Link>

                      <Link
                        href="/profile/activity"
                        className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:shadow-md transition-all duration-200 group"
                      >
                        <div className="p-3 bg-blue-200 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                          <ChartBarIcon className="w-6 h-6 text-blue-700" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            Hoạt động
                          </h4>
                          <p className="text-sm text-gray-600">
                            Lịch sử hoạt động và tiến độ
                          </p>
                        </div>
                      </Link> */}

                      <Link
                        href="/profile/settings"
                        className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:shadow-md transition-all duration-200 group"
                      >
                        <div className="p-3 bg-gray-200 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                          <CogIcon className="w-6 h-6 text-gray-700" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            Cài đặt
                          </h4>
                          <p className="text-sm text-gray-600">
                            Quản lý tài khoản và tùy chọn
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Recent Achievements */}
                  {/* <div className="card">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Thành tích gần đây
                    </h3>
                    <div className="space-y-3">
                      {userData.achievements.slice(0, 3).map((achievement) => (
                        <div
                          key={achievement.id}
                          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <span className="text-2xl">{achievement.badge}</span>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">
                              {achievement.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {achievement.description}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(achievement.date).toLocaleDateString(
                                "vi-VN"
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div> */}
                </div>
              )}

              {/* Achievements Tab */}
              {/* {activeTab === "achievements" && (
                <div className="card">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Tất cả thành tích
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userData.achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="text-3xl">{achievement.badge}</span>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {achievement.title}
                            </h4>
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                              {achievement.type}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {achievement.description}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(achievement.date).toLocaleDateString(
                            "vi-VN"
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}

              {/* Skills Tab */}
              {activeTab === "skills" && (
                <div className="card">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Kỹ năng
                  </h3>
                  <div className="space-y-4">
                    {/* {userData.skills.map((skill, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">
                              {skill.name}
                            </span>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              {skill.category}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#267452] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))} */}
                  </div>
                </div>
              )}

              {/* Statistics Tab */}
              {activeTab === "statistics" && (
                <div className="space-y-6">
                  <div className="card">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Thống kê chi tiết
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <AcademicCapIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-blue-600">
                          {profileData?.completed_course}
                        </p>
                        <p className="text-sm text-gray-600">
                          Khóa học hoàn thành
                        </p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <TrophyIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-green-600">
                          {profileData?.joined_event}
                        </p>
                        <p className="text-sm text-gray-600">
                          Số sự kiện tham gia
                        </p>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <ChartBarIcon className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-yellow-600">
                          {profileData?.completed_task}
                        </p>
                        <p className="text-sm text-gray-600">
                          Nhiệm vụ đã hoàn thành
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Avatar Upload Modal */}
      <AvatarUploadModal
        isOpen={showAvatarModal}
        onClose={() => setShowAvatarModal(false)}
        currentAvatar={profileData?.avatar || undefined}
        onSave={(imageURL) => handleImageUpload("avatar", imageURL || "")}
      />
      <CoverImageUploadModal
        isOpen={showCoverImageModal}
        onClose={() => setShowCoverImageModal(false)}
        currentCoverImage={profileData?.cover_image || undefined}
        onSave={(imageURL) => handleImageUpload("cover_image", imageURL || "")}
      />
    </div>
  );
}
