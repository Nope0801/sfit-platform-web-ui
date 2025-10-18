"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  AcademicCapIcon,
  ClockIcon,
  UserIcon,
  StarIcon,
  BookOpenIcon,
  CheckCircleIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import { useCourseService } from "@/hooks/use-course-hooks";
import { useTokenSubject } from "@/hooks/token-hooks";
import { Course, CourseGeneralInformationResponse } from "@/types/course";
import { PageListResp } from "@/types/pagination";

export default function MyCoursesList() {
  const { getRegisteredCourses, loading } = useCourseService();
  const userId = useTokenSubject();
  const [courses, setCourses] = useState<CourseGeneralInformationResponse[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [classesPerPage] = useState(6);

  const fetchMyCourses = useCallback(async () => {
    if (!userId) {
      console.log("MyCoursesList: No userId found");
      return;
    }

    console.log(
      "MyCoursesList: Fetching registered courses for userId:",
      userId
    );
    console.log("MyCoursesList: Request params:", {
      user_id: userId,
      page: currentPage,
      page_size: classesPerPage,
    });

    const resp = await getRegisteredCourses(
      userId,
      currentPage,
      classesPerPage
    );

    console.log("MyCoursesList: API Response:", resp);

    if (resp) {
      console.log("MyCoursesList: Courses found:", resp.items);
      console.log("MyCoursesList: Total count:", resp.total_count);
      setCourses(resp.items);
      setTotalItems(resp.total_count);
    } else {
      console.log("MyCoursesList: No response from API");
      setCourses([]);
      setTotalItems(0);
    }
  }, [currentPage, classesPerPage, getRegisteredCourses, userId]);

  useEffect(() => {
    console.log("MyCoursesList: Component mounted, fetching courses...");
    fetchMyCourses();
  }, [fetchMyCourses]);

  useEffect(() => {
    console.log("MyCoursesList: Courses state updated:", courses);
    console.log("MyCoursesList: Total items:", totalItems);
  }, [courses, totalItems]);

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} phút`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours}h ${remainingMinutes}p`
      : `${hours}h`;
  };

  const calculateProgress = (course: CourseGeneralInformationResponse) => {
    if (course.number_lessons === 0) return 0;
    return Math.round((course.learned_lessons / course.number_lessons) * 100);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#267452] mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải khóa học của bạn...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Khóa học của tôi
        </h1>
        <p className="text-gray-600">
          Tiếp tục học tập và phát triển kỹ năng của bạn
        </p>
      </div>

      {/* Courses Grid */}
      {(() => {
        console.log("MyCoursesList: Render check - courses:", courses);
        console.log(
          "MyCoursesList: Render check - courses.length:",
          courses?.length
        );
        console.log(
          "MyCoursesList: Render check - show empty state:",
          !courses || courses.length === 0
        );
        return null;
      })()}
      {!courses || courses.length === 0 ? (
        <div className="text-center py-12">
          <AcademicCapIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Bạn chưa đăng ký khóa học nào
          </h3>
          <p className="text-gray-600 mb-6">
            Hãy khám phá và đăng ký các khóa học thú vị
          </p>
          <Link
            href="/courses"
            className="btn-primary inline-flex items-center"
          >
            Khám phá khóa học
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => {
            console.log(`MyCoursesList: Rendering course ${index}:`, course);
            return (
              <div
                key={course.id}
                className="card hover:shadow-lg transition-shadow duration-200"
              >
                {/* Course Image */}
                <div className="relative w-full h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-[#267452] to-[#1f5e42] flex items-center justify-center">
                    <AcademicCapIcon className="w-16 h-16 text-white opacity-50" />
                  </div>
                  <div className="absolute top-3 right-3 bg-[#267452] text-white px-2 py-1 rounded-full text-xs font-medium">
                    Đã đăng ký
                  </div>
                  <div className="absolute top-3 left-3 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium">
                    {course.type}
                  </div>
                </div>

                {/* Course Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {course.type}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tiến độ</span>
                      <span className="font-medium text-[#267452]">
                        {calculateProgress(course)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#267452] h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${calculateProgress(course)}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{course.learned_lessons} bài đã học</span>
                      <span>{course.number_lessons} bài tổng cộng</span>
                    </div>
                  </div>

                  {/* Course Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{formatDuration(course.time_learn)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpenIcon className="w-4 h-4" />
                      <span>{course.number_lessons} bài</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <StarIcon className="w-4 h-4 text-yellow-400" />
                      <span>{course.rate.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Teachers */}
                  <div className="flex items-center space-x-2">
                    <UserIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">
                      {course.teachers?.join(", ") || "Không có giảng viên"}
                    </span>
                  </div>

                  {/* Tags */}
                  {course.tags && course.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {course.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {course.tags.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{course.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-3 space-y-2">
                    <Link
                      href={`/courses/${course.id}`}
                      className="btn-primary w-full text-center block"
                    >
                      Tiếp tục học
                    </Link>
                    <Link
                      href={`/courses/${course.id}`}
                      className="btn-secondary w-full text-center block"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalItems > classesPerPage && (
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Trước
            </button>
            <span className="px-4 py-2 text-sm text-gray-700">
              Trang {currentPage} / {Math.ceil(totalItems / classesPerPage)}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage >= Math.ceil(totalItems / classesPerPage)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
