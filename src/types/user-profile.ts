export interface SocialLink {
  facebook?: string;
  github?: string;
  [key: string]: string | undefined;
}

export interface UserProfileResponse {
  user_id: string;
  avatar: string;
  cover_image: string;
  full_name: string;
  class_name: string;
  khoa: string;
  phone: string;
  email: string;
  introduction: string;
  location: string;
  msv: string;
  completed_course: number;
  joined_event: number;
  completed_task: number;
  social_link: SocialLink;
  created_at: string;
  updated_at: string;
}

export interface UserProfileUpdateRequest {
    full_name: string;
    class_name: string;
    khoa: string;
    phone: string;
    introduction: string;
    email: string;
    social_link: SocialLink;
    location: string;
    msv: string;
    avatar: string;
    cover_image: string;
}
export interface UserProfileUpdateResponse {
    createAt: string;
    updateAt: string;
}