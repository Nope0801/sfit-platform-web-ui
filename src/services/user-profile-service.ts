import apiClient from "@/libs/http";
import { ResponseTemplate } from "@/types/response-template";
import {
  UserProfileResponse,
  UserProfileUpdateRequest,
  UserProfileUpdateResponse,
} from "@/types/user-profile";

class UserProfileService {
  // get user profile by userId
  async getUserProfile(
    userId?: string
  ): Promise<ResponseTemplate<UserProfileResponse | null>> {
    const trimmedUserId = userId?.trim();
    if (!trimmedUserId) {
      return {
        status: "error",
        message: "User ID is required",
        data: null,
      };
    }

    const response = await apiClient.get<ResponseTemplate<UserProfileResponse>>(
      `/user-profiles/${trimmedUserId}`
    );

    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  // update user profile by userId
  async updateUserProfile(
    profileData: Partial<UserProfileUpdateRequest>
  ): Promise<ResponseTemplate<UserProfileUpdateResponse | null>> {
    const response = await apiClient.put<ResponseTemplate<UserProfileUpdateResponse>>(
      `/user-profiles`,
      profileData
    );

    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  // create user profile
  async createUserProfile(
    profileData: Partial<UserProfileUpdateRequest>
  ): Promise<ResponseTemplate<UserProfileUpdateResponse | null>> {
    const response = await apiClient.post<ResponseTemplate<UserProfileUpdateResponse>>(
      `/user-profiles`,
      profileData
    );

    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }
}

export const userProfileService = new UserProfileService();
