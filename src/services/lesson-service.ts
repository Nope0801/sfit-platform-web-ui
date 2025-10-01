import apiClient from "@/libs/http";
import { PageListResp } from "@/types/pagination";
import { Lesson, LessonRequest, UpdateStatusLessonAttendanceReq, GetUserAttendanceLessonReq, GetUserAttendanceLessonRp } from "@/types/lesson";
class LessonService {
  async getLessonById(lessonId: string): Promise<Lesson> {
    const { data } = await apiClient.get(`/lessons/${lessonId}`);
    return data.data;
  }

  async createLesson(moduleId: string, lesson: LessonRequest): Promise<Lesson> {
    const { data } = await apiClient.post(`/modules/${moduleId}/lessons/`, lesson);
    return data.data;
  }

  async updateLesson(moduleId: string, lessonId: string, lesson: LessonRequest): Promise<void> {
    await apiClient.put(`/modules/${moduleId}/lessons/${lessonId}`, lesson);
  }

  async deleteLesson(moduleId: string, lessonId: string): Promise<void> {
    await apiClient.delete(`/modules/${moduleId}/lessons/${lessonId}`);
  }

  async updateStatusLessonAttendance(
    userId: string,
    lessonId: string,
    req: UpdateStatusLessonAttendanceReq
  ): Promise<void> {
    await apiClient.put(`/lessons/${lessonId}/users/${userId}/attendance`, req);
  }

  async getUsersByLessonId(
    lessonId: string,
    query: GetUserAttendanceLessonReq
  ): Promise<PageListResp<GetUserAttendanceLessonRp[]>> {
    const { data } = await apiClient.get(`/lessons/${lessonId}/users`, { params: query });
    return data.data;
  }
}

export const lessonService = new LessonService();