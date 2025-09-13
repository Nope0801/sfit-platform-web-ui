import { userProfileService } from "@/services/user-profile-service";
import { HookCallback, HookTemplate } from "@/types/hook-template";
import { ResponseTemplate } from "@/types/response-template";
import {
  CreateUserProfileRequest,
  UserProfileResponse,
  UserProfileUpdateRequest,
  UserProfileUpdateResponse,
} from "@/types/user-profile";
import { AxiosError } from "axios";
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
        const axiosError = error as AxiosError<ResponseTemplate<null>>;
        setProfile({
          isLoading: false,
          error: new Error(
            axiosError.response?.data.message || "Failed to fetch profile"
          ),
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
      const axiosError = error as AxiosError<ResponseTemplate<null>>;
      setUpdateProfile({
        isLoading: false,
        error: new Error(
          axiosError.response?.data.message || "Failed to update profile"
        ),
        data: null,
      });
    }
  }

  return { updateUserProfile, ...updateProfile };
}

export function useCreateUserProfile(): HookCallback<CreateUserProfileRequest> {
  const [isLoading, setisLoading] = useState(false);

  async function createUserProfile(profileData: CreateUserProfileRequest) {
    setisLoading(true);
    try {
      const response = await userProfileService.createUserProfile(profileData);
      if (response.status !== "success") {
        throw new Error(response.message || "Failed to create profile");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ResponseTemplate<null>>;
      throw new Error(
        axiosError.response?.data.message || "Failed to create profile"
      );
    } finally {
      setisLoading(false);
    }
  }

  return { func: createUserProfile, isLoading };
}
