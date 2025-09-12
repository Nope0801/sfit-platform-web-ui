import { userProfileService } from "@/services/user-profile-service";
import { HookTemplate } from "@/types/hook-template";
import {
  UserProfileResponse,
  UserProfileUpdateRequest,
  UserProfileUpdateResponse,
} from "@/types/user-profile";
import { useEffect, useState } from "react";

// get user profile by userId
export default function useUserProfile(
  userId?: string | undefined
): HookTemplate<UserProfileResponse> {
  const [profile, setProfile] = useState<HookTemplate<UserProfileResponse>>({
    isLoading: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userProfileService.getUserProfile(userId);
        setProfile({
          isLoading: false,
          error: null,
          data: response.data,
        });
      } catch (error) {
        setProfile({
          isLoading: false,
          error: error as Error,
          data: null,
        });
      }
    };
    fetchProfile();
  }, [userId]);

  return profile;
}

export function useUpdateUserProfile(): HookTemplate<UserProfileUpdateResponse> & {
  updateUserProfile: (
    profileData: Partial<UserProfileUpdateRequest>
  ) => Promise<void>;
} {
  const [updateProfile, setUpdateProfile] = useState<
    HookTemplate<UserProfileUpdateResponse>
  >({
    isLoading: false,
    error: null,
    data: null,
  });

  async function updateUserProfile(
    profileData: Partial<UserProfileUpdateRequest>
  ): Promise<void> {
    setUpdateProfile({
      isLoading: true,
      error: null,
      data: null,
    });

    try {
      const response = await userProfileService.updateUserProfile(profileData);
      if (response.status !== "success") {
        throw new Error(response.message || "Failed to update profile");
      }
      setUpdateProfile({
        isLoading: false,
        error: null,
        data: response.data,
      });
    } catch (error) {
      setUpdateProfile({
        isLoading: false,
        error: error as Error,
        data: null,
      });
    }
  }

  return { updateUserProfile, ...updateProfile };
}
