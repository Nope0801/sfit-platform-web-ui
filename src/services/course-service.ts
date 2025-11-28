import apiClient from "@/libs/http";
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
import { Module } from "@/types/module";

class CourseService {
  // POST /courses
  async createCourse(req: CreateCourseRequest): Promise<CreateCourseResponse> {
    const res = await apiClient.post("/courses", req);
    return res.data.data;
  }

  // GET /courses
  async getListCourse(query: CourseQuery): Promise<PageListResp<Course[]>> {
    const res = await apiClient.get("/courses", { params: query });
    return res.data.data;
  }

  // GET /courses/:course_id
  async getCourseDetailByID(
    course_id: string,
    user_id?: string
  ): Promise<CourseDetailResponse> {
    const params = user_id ? { user_id } : undefined;
    const res = await apiClient.get(`/courses/${course_id}`, { params });
    return res.data.data;
  }

  // PUT /courses/:course_id
  async updateCourse(
    course_id: string,
    req: UpdateCourseRequest
  ): Promise<UpdateCourseResponse> {
    const res = await apiClient.put(`/courses/${course_id}`, req);
    return res.data.data;
  }

  // DELETE /courses/:course_id
  async deleteCourse(course_id: string): Promise<void> {
    await apiClient.delete(`/courses/${course_id}`);
  }

  // POST /courses/favourite/:course_id
  async markCourseAsFavourite(course_id: string): Promise<void> {
    await apiClient.post(`/courses/favourite/${course_id}`);
  }
  // DELETE /modules/:module_id
  async deleteModule(moduleId: string): Promise<void> {
    await apiClient.delete(`/courses/modules/${moduleId}`);
  }

  // DELETE /courses/favourite/:course_id
  async unmarkCourseAsFavourite(course_id: string): Promise<void> {
    await apiClient.delete(`/courses/favourite/${course_id}`);
  }

  // POST /courses/:course_id/modules
  async addModuleToCourse(
    course_id: string,
    req: AddModuleToCourseRequest
  ): Promise<AddModuleToCourseResponse> {
    const res = await apiClient.post(`/courses/${course_id}/modules`, req);
    return res.data.data;
  }

  // GET /courses/:course_id/lessons
  async getCourseLessons(
    course_id: string,
    user_id?: string
  ): Promise<LessonInfo[]> {
    const params = user_id ? { user_id } : undefined;
    const res = await apiClient.get(`/courses/${course_id}/lessons`, {
      params,
    });
    return res.data.data;
  }
  // GET /courses/:course_id/modules
  async getModulesByCourse(courseId: string): Promise<Module[]> {
    const response = await apiClient.get(`/courses/${courseId}/modules`);
    return response.data.data;
  }

  // GET /courses/:course_id/registered-users
  // async getRegisteredUsers(
  //   course_id: string,
  //   page = 1,
  //   pageSize = 10,
  //   status?: string
  // ): Promise<RegisteredUsersResponse> {
  //   const res = await apiClient.get(`/courses/${course_id}/users`, {
  //     params: { page, pageSize, status },
  //   });
  //   return res.data.data;
  // }
    // GET /courses/:course_id/registered-users
  async getRegisteredUsers(
    course_id: string,
    page = 1,
    pageSize = 10,
    status?: string // Made status optional
  ): Promise<RegisteredUsersResponse> {
    const params: any = { page, page_size: pageSize };
    if (status) {
      params.status = status; // Add status only if provided
    }
    const res = await apiClient.get(`/courses/${course_id}/users`, {
      params,
    });
    return res.data.data;
  }

  // POST /courses/register
  async registerUserToCourse(req: CourseRegisterRequest): Promise<void> {
    await apiClient.put("/users/courses", req);
  }

  // PUT /users/courses
  async registerUsersToCourse(
    req: UsersCoursesRegisterRequest
  ): Promise<void> {
    await apiClient.put("/users/courses", req);
  }

  // GET /users/:user_id/registered-courses
  async getRegisteredCourses(
    user_id: string,
    page = 1,
    page_size = 10
  ): Promise<PageListResp<CourseGeneralInformationResponse[]>> {
    const res = await apiClient.get(`/users/${user_id}/registered-courses`, {
      params: { page, page_size },
    });
    return res.data.data;
  }

  // POST /courses/:course_id/user-progress/:user_id
  async getUserProgressInCourse(
    course_id: string,
    user_id: string
  ): Promise<GetUserProgressInCourseResponse> {
    const res = await apiClient.get(
      `/courses/${course_id}/user-progress/${user_id}`
    );
    return res.data.data;
  }

  // POST /courses/:course_id/rate/:user_id
  async rateCourse(user_id: string, req: CourseRateRequest): Promise<void> {
    await apiClient.post(`/courses/${req.course}/rate/${user_id}`, req);
  }
}

export const courseService = new CourseService();
