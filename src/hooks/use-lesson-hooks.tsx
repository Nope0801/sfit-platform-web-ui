import { useCallback, useState } from "react";
import { lessonService } from "@/services/lesson-service";
import { Lesson, LessonRequest, UpdateStatusLessonAttendanceReq, GetUserAttendanceLessonReq, GetUserAttendanceLessonRp } from "@/types/lesson";
import { PageListResp } from "@/types/pagination";

export function useLessonService() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getLessonById = useCallback(async (lessonId: string, moduleId: string): Promise<Lesson | null> => {
    setLoading(true);
    setError(null);
    try {
      const lesson = await lessonService.getLessonDetail(moduleId,lessonId);
      return lesson;
    } catch (err: any) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createLesson = useCallback(async (moduleId: string, lesson: LessonRequest): Promise<Lesson | null> => {
    setLoading(true);
    setError(null);
    try {
      const newLesson = await lessonService.createLesson(moduleId, lesson);
      return newLesson;
    } catch (err: any) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLesson = useCallback(async (moduleId: string, lessonId: string, lesson: LessonRequest): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await lessonService.updateLesson(moduleId, lessonId, lesson);
      return true;
    } catch (err: any) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteLesson = useCallback(async (moduleId: string, lessonId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await lessonService.deleteLesson(moduleId, lessonId);
      return true;
    } catch (err: any) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStatusLessonAttendance = useCallback(
    async (userId: string, lessonId: string, req: UpdateStatusLessonAttendanceReq): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        await lessonService.updateStatusLessonAttendance(userId, lessonId, req);
        return true;
      } catch (err: any) {
        setError(err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getUsersByLessonId = useCallback(
    async (
      lessonId: string,
      query: GetUserAttendanceLessonReq
    ): Promise<PageListResp<GetUserAttendanceLessonRp[]> | null> => {
      setLoading(true);
      setError(null);
      try {
        const users = await lessonService.getUsersByLessonId(lessonId, query);
        return users;
      } catch (err: any) {
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    error,
    getLessonById,
    createLesson,
    updateLesson,
    deleteLesson,
    updateStatusLessonAttendance,
    getUsersByLessonId,
  };
}