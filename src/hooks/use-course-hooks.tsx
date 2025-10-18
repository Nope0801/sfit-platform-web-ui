import { useState, useCallback } from "react";
import { courseService } from "@/services/course-service";
import {
  Course,
  CreateCourseRequest,
  UpdateCourseRequest,
  AddModuleToCourseRequest,
  CourseQuery,
  CourseDetailResponse,
  CreateCourseResponse,
  UpdateCourseResponse,
  AddModuleToCourseResponse,
  GetUserProgressInCourseResponse,
  RegisteredUsersResponse,
  CourseRateRequest,
  CourseRegisterRequest,
  UsersCoursesRegisterRequest,
  CourseGeneralInformationResponse,
} from "@/types/course";
import { PageListResp } from "@/types/pagination";
import { LessonInfo } from "@/types/course";

export function useCourseService() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseDetail, setCourseDetail] = useState<CourseDetailResponse | null>(
    null
  );
  const [lessons, setLessons] = useState<LessonInfo[]>([]);
  const [userProgress, setUserProgress] =
    useState<GetUserProgressInCourseResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // List courses
  const getListCourse = useCallback(
    async (query: CourseQuery): Promise<PageListResp<Course[]> | undefined> => {
      setLoading(true);
      setError(null);
      try {
        const resp = await courseService.getListCourse(query);
        setCourses(Array.isArray(resp?.items) ? resp.items : []);
        return resp;
      } catch (err: any) {
        setError(err?.message || "Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    },
    []
  );
  // Get course detail
  const getCourseDetailByID = useCallback(
    async (
      course_id: string,
      user_id?: string
    ): Promise<CourseDetailResponse | undefined> => {
      setLoading(true);
      setError(null);
      try {
        const resp = await courseService.getCourseDetailByID(
          course_id,
          user_id
        );
        setCourseDetail(resp);
        return resp;
      } catch (err: any) {
        setError(err?.message || "Failed to fetch course detail");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Create course
  const createCourse = useCallback(
    async (
      req: CreateCourseRequest
    ): Promise<CreateCourseResponse | undefined> => {
      setLoading(true);
      setError(null);
      try {
        return await courseService.createCourse(req);
      } catch (err: any) {
        setError(err?.message || "Failed to create course");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Update course
  const updateCourse = useCallback(
    async (
      course_id: string,
      req: UpdateCourseRequest
    ): Promise<UpdateCourseResponse | undefined> => {
      setLoading(true);
      setError(null);
      try {
        return await courseService.updateCourse(course_id, req);
      } catch (err: any) {
        setError(err?.message || "Failed to update course");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Delete course
  const deleteCourse = useCallback(
    async (course_id: string): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        await courseService.deleteCourse(course_id);
        return true;
      } catch (err: any) {
        setError(err?.message || "Failed to delete course");
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Mark as favourite
  const markCourseAsFavourite = useCallback(
    async (course_id: string): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        await courseService.markCourseAsFavourite(course_id);
        return true;
      } catch (err: any) {
        setError(err?.message || "Failed to mark as favourite");
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Unmark as favourite
  const unmarkCourseAsFavourite = useCallback(
    async (course_id: string): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        await courseService.unmarkCourseAsFavourite(course_id);
        return true;
      } catch (err: any) {
        setError(err?.message || "Failed to unmark as favourite");
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Add module to course
  const addModuleToCourse = useCallback(
    async (
      course_id: string,
      req: AddModuleToCourseRequest
    ): Promise<AddModuleToCourseResponse | undefined> => {
      setLoading(true);
      setError(null);
      try {
        return await courseService.addModuleToCourse(course_id, req);
      } catch (err: any) {
        setError(err?.message || "Failed to add module");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Get course lessons
  const getCourseLessons = useCallback(
    async (
      course_id: string,
      user_id?: string
    ): Promise<LessonInfo[] | undefined> => {
      setLoading(true);
      setError(null);
      try {
        const resp = await courseService.getCourseLessons(course_id, user_id);
        setLessons(resp);
        return resp;
      } catch (err: any) {
        setError(err?.message || "Failed to fetch lessons");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Get registered users
  const getRegisteredUsers = useCallback(
    async (
      course_id: string,
      page = 1,
      pageSize = 10
    ): Promise<RegisteredUsersResponse | undefined> => {
      setLoading(true);
      setError(null);
      try {
        const resp = await courseService.getRegisteredUsers(
          course_id,
          page,
          pageSize
        );
        // setRegisteredUsers(resp);
        return resp;
      } catch (err: any) {
        setError(err?.message || "Failed to fetch registered users");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Register user to course
  const registerUserToCourse = useCallback(
    async (req: CourseRegisterRequest): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        await courseService.registerUserToCourse(req);
        return true;
      } catch (err: any) {
        setError(err?.message || "Failed to register user");
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Register users to course via /users/courses
  const registerUsersToCourse = useCallback(
    async (req: UsersCoursesRegisterRequest): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        await courseService.registerUsersToCourse(req);
        return true;
      } catch (err: any) {
        setError(err?.message || "Failed to register users to course");
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Get registered courses
  const getRegisteredCourses = useCallback(
    async (
      user_id: string,
      page = 1,
      page_size = 10
    ): Promise<
      PageListResp<CourseGeneralInformationResponse[]> | undefined
    > => {
      setLoading(true);
      setError(null);
      try {
        const resp = await courseService.getRegisteredCourses(
          user_id,
          page,
          page_size
        );
        // setRegisteredCourses(resp);
        return resp;
      } catch (err: any) {
        setError(err?.message || "Failed to fetch registered courses");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Get user progress in course
  const getUserProgressInCourse = useCallback(
    async (
      course_id: string,
      user_id: string
    ): Promise<GetUserProgressInCourseResponse | undefined> => {
      setLoading(true);
      setError(null);
      try {
        const resp = await courseService.getUserProgressInCourse(
          course_id,
          user_id
        );
        setUserProgress(resp);
        return resp;
      } catch (err: any) {
        setError(err?.message || "Failed to fetch user progress");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Rate course
  const rateCourse = useCallback(
    async (user_id: string, req: CourseRateRequest): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        await courseService.rateCourse(user_id, req);
        return true;
      } catch (err: any) {
        setError(err?.message || "Failed to rate course");
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );
  const deleteModule = useCallback(
    async (moduleId: string): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        await courseService.deleteModule(moduleId);
        return true;
      } catch (err: any) {
        setError(err?.message || "Failed to delete module");
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );
  return {
    courses,
    courseDetail,
    lessons,
    userProgress,
    loading,
    error,
    getListCourse,
    getCourseDetailByID,
    createCourse,
    deleteModule,
    updateCourse,
    deleteCourse,
    markCourseAsFavourite,
    unmarkCourseAsFavourite,
    addModuleToCourse,
    getCourseLessons,
    getRegisteredUsers,
    registerUserToCourse,
    registerUsersToCourse,
    getRegisteredCourses,
    getUserProgressInCourse,
    rateCourse,
  };
}
