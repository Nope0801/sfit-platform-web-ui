import { LessonType, Quiz } from "./lesson";
export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export interface CreateCourseRequest {
  title: string;
  description: string;
  type: string;
  targets?: string[];
  requires?: string[];
  teachers?: string[];
  language: string;
  certificate: boolean;
  level: CourseLevel;
  tags?: string[];
}

export interface UpdateCourseRequest {
  title?: string;
  description?: string;
  type?: string;
  targets?: string[];
  requires?: string[];
  teachers?: string[];
  language?: string;
  certificate?: boolean;
  level?: CourseLevel;
  tags?: string[];
}

export interface AddModuleToCourseRequest {
  module_title: string;
}

export interface GetUserProgressInCourseRequest {
  course_id: string;
  user_id: string;
}

export interface SetFavouriteCourseRequest {
  course_id: string;
}

export interface CourseRegisterRequest {
  course_id: string;
  user_ids?: string[];
  msvs?: string[];
  status: string;
}

export interface UsersCoursesRegisterRequest {
  course_id: string;
  user_ids: string[];
  status: string;
}

export interface CourseRateRequest {
  course: string;
  star: number;
  comment?: string;
}

export interface CreateCourseResponse {
  id: string;
  createdAt: string;
}

export interface UpdateCourseResponse {
  updated_at: string;
}

export interface CourseDetailResponse {
  title: string;
  description: string;
  like: boolean;
  type: string;
  level: CourseLevel;
  teachers: string[];
  star: number;
  total_lessons: number;
  tags: string[];
  target: string[];
  require: string[];
  total_time: number;
  total_registered: number;
  updated_at: string;
  language: string;
  course_content: CourseContentResponse[];
  rate: RateResponse[];
}

export interface CourseContentResponse {
  id: string;
  module_title: string;
  lessons: LessonResponse[];
}

export interface AddModuleToCourseResponse {
  module_id: string;
  course_id: string;
  module_title: string;
  created_at: string;
}

export interface GetUserProgressInCourseResponse {
  learned: number;
  total_lesson: number;
}

export interface LessonResponse {
  type: string;
  quizContent: any;
  onlineContent: any;
  offlineContent: any;
  readingContent: string;
  id: string;
  title: string;
  learned: boolean;
  study_time: number;
}

export interface RateResponse {
  name: string;
  comment: string;
  star: number;
  created_at: string;
}

export interface RegisteredUserInfo {
  id: string;
  username: string;
  email: string;
}

export interface RegisteredUsersResponse {
  users: RegisteredUserInfo[];
  total_count: number;
  page: number;
  page_size: number;
}

export interface ModuleInfo {
  id: string;
  module_title: string;
  total_time: number;
  lessons: LessonInfo[];
}

export interface LessonInfo {
  id: string;
  title: string;
  learned: boolean;
  study_time: number;
}

export interface CourseGeneralInformationResponse {
  id: string;
  title: string;
  description: string;
  type: string;
  number_lessons: number;
  teachers: string[];
  time_learn: number;
  rate: number;
  tags: string[];
  learned_lessons: number;
  registed: boolean;
}

export interface CourseQuery {
  title?: string;
  only_registed?: boolean;
  type?: string;
  level?: CourseLevel;
  user_id?: string;
  course_id?: string;
  page: number;
  page_size: number;
}

export interface ApiError {
  message: string;
  code: string;
  details?: any;
}
export interface Course {
  id: string;
  title: string;
  description: string;
  instructors: Instructor[];
  duration: string;
  totalLessons: number;
  completedLessons: number;
  rating: number;
  totalRatings: number;
  enrolled: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  originalPrice?: number;
  thumbnail: string;
  isEnrolled: boolean;
  progress: number;
  category: string;
  tags: string[];
  lastUpdated: string;
  language: string;
  certificate: boolean;
  requirements: string[];
  objectives: string[];
  modules: Module[];
  reviews: Review[];
  type: string;
  target: string[];
  require: string[];
  teachers: string[];
  total_time: number;
  total_lessons: number;
  created_at: string;
  updated_at: string;
}

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
}

export interface Module {
  id: string;
  title: string;
  duration: string;
  isUnlocked: boolean;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "reading" | "quiz" | "assignment" | "Zoom";
  isCompleted: boolean;
  isUnlocked: boolean;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface LessonRequest {
  title: string;
  description?: string;
  duration: number;
  type: LessonType;
  quizContent?: Quiz[];
  videoUrl?: string;
  location?: string;
  date?: string;
  readingContent?: string;
  position?: number;
}
