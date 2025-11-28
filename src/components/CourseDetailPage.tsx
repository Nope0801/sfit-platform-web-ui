"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  PlayIcon,
  ClockIcon,
  UserGroupIcon,
  StarIcon,
  BookOpenIcon,
  CheckCircleIcon,
  CalendarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { useCourseService } from '@/hooks/use-course-hooks';
// interface Course {
//   id: string;
//   title: string;
//   description: string;
//   instructors: Instructor[];
//   duration: string;
//   totalLessons: number;
//   completedLessons: number;
//   rating: number;
//   totalRatings: number;
//   enrolled: number;
//   level: 'Beginner' | 'Intermediate' | 'Advanced';
//   price: number;
//   originalPrice?: number;
//   thumbnail: string;
//   isEnrolled: boolean;
//   progress: number;
//   category: string;
//   tags: string[];
//   lastUpdated: string;
//   language: string;
//   certificate: boolean;
//   requirements: string[];
//   objectives: string[];
//   modules: Module[];
//   reviews: Review[];
// }

// interface Instructor {
//   id: string;
//   name: string;
//   avatar: string;
// }

// interface Module {
//   id: string;
//   title: string;
//   lessons: Lesson[];
//   duration: string;
//   isUnlocked: boolean;
// }

// interface Lesson {
//   id: string;
//   title: string;
//   duration: string;
//   type: 'video' | 'reading' | 'quiz' | 'assignment';
//   isCompleted: boolean;
//   isUnlocked: boolean;
//   isFree?: boolean;
// }

// interface Review {
//   id: string;
//   userName: string;
//   userAvatar: string;
//   rating: number;
//   comment: string;
//   date: string;
// }

// const mockCourse: Course = {
//   id: '1',
//   title: 'React.js từ cơ bản đến nâng cao',
//   description: 'Khóa học toàn diện về React.js, bao gồm các khái niệm cơ bản, hooks, context, và các pattern nâng cao. Bạn sẽ xây dựng những ứng dụng thực tế và học cách tối ưu hóa performance.',
//   instructors: [
//     {
//       id: '1',
//       name: 'Nguyễn Văn A',
//       avatar: '/api/placeholder/60/60'
//     },
//     {
//       id: '2',
//       name: 'Trần Thị B',
//       avatar: '/api/placeholder/60/60'
//     }
//   ],
//   duration: '12 giờ',
//   totalLessons: 45,
//   completedLessons: 18,
//   rating: 4.8,
//   totalRatings: 124,
//   enrolled: 1250,
//   level: 'Intermediate',
//   price: 0,
//   thumbnail: '/api/placeholder/800/450',
//   isEnrolled: true,
//   progress: 40,
//   category: 'Lập trình',
//   tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
//   lastUpdated: '2025-01-15',
//   language: 'Tiếng Việt',
//   certificate: true,
//   requirements: [
//     'Kiến thức cơ bản về HTML, CSS',
//     'Hiểu biết về JavaScript ES6+',
//     'Máy tính có thể chạy Node.js'
//   ],
//   objectives: [
//     'Nắm vững các khái niệm cơ bản của React',
//     'Sử dụng thành thạo React Hooks',
//     'Quản lý state với Context API và Redux',
//     'Xây dựng ứng dụng React hoàn chỉnh',
//     'Tối ưu hóa performance của ứng dụng'
//   ],
//   modules: [
//     {
//       id: '1',
//       title: 'Giới thiệu về React',
//       duration: '2.5 giờ',
//       isUnlocked: true,
//       lessons: [
//         {
//           id: '1',
//           title: 'React là gì?',
//           duration: '15 phút',
//           type: 'video',
//           isCompleted: true,
//           isUnlocked: true,
//           isFree: true
//         },
//         {
//           id: '2',
//           title: 'Cài đặt môi trường',
//           duration: '20 phút',
//           type: 'video',
//           isCompleted: true,
//           isUnlocked: true
//         },
//         {
//           id: '3',
//           title: 'JSX và Components',
//           duration: '25 phút',
//           type: 'video',
//           isCompleted: true,
//           isUnlocked: true
//         },
//         {
//           id: '4',
//           title: 'Bài tập: Tạo component đầu tiên',
//           duration: '30 phút',
//           type: 'assignment',
//           isCompleted: false,
//           isUnlocked: true
//         }
//       ]
//     },
//     {
//       id: '2',
//       title: 'React Hooks',
//       duration: '3 giờ',
//       isUnlocked: true,
//       lessons: [
//         {
//           id: '5',
//           title: 'useState Hook',
//           duration: '30 phút',
//           type: 'video',
//           isCompleted: false,
//           isUnlocked: true
//         },
//         {
//           id: '6',
//           title: 'useEffect Hook',
//           duration: '35 phút',
//           type: 'video',
//           isCompleted: false,
//           isUnlocked: true
//         },
//         {
//           id: '7',
//           title: 'Custom Hooks',
//           duration: '40 phút',
//           type: 'video',
//           isCompleted: false,
//           isUnlocked: false
//         }
//       ]
//     },
//     {
//       id: '3',
//       title: 'State Management',
//       duration: '4 giờ',
//       isUnlocked: false,
//       lessons: [
//         {
//           id: '8',
//           title: 'Context API',
//           duration: '45 phút',
//           type: 'video',
//           isCompleted: false,
//           isUnlocked: false
//         },
//         {
//           id: '9',
//           title: 'Redux Toolkit',
//           duration: '60 phút',
//           type: 'video',
//           isCompleted: false,
//           isUnlocked: false
//         }
//       ]
//     }
//   ],
//   reviews: [
//     {
//       id: '1',
//       userName: 'Trần Thị B',
//       userAvatar: '/api/placeholder/40/40',
//       rating: 5,
//       comment: 'Khóa học rất hay và dễ hiểu. Thầy giảng rất tận tình!',
//       date: '2025-01-10'
//     },
//     {
//       id: '2',
//       userName: 'Lê Văn C',
//       userAvatar: '/api/placeholder/40/40',
//       rating: 4,
//       comment: 'Nội dung chi tiết, ví dụ thực tế. Chỉ mong có thêm bài tập.',
//       date: '2025-01-08'
//     }
//   ]
// };

const levelColors = {
  Beginner: "bg-green-100 text-green-800",
  Intermediate: "bg-yellow-100 text-yellow-800",
  Advanced: "bg-red-100 text-red-800",
};

// const typeIcons = {
//   video: PlayIcon,
//   reading: BookOpenIcon,
//   quiz: DocumentTextIcon,
//   assignment: AcademicCapIcon
// };

export default function CourseDetailPage({ courseId }: { courseId: string }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'reviews'>('overview');
  // const course = mockCourse; 
  // In real app, fetch based on courseId
  const { getCourseDetailByID, courseDetail } = useCourseService();
  // const { getLessonById } = useLessonService();
  useEffect(() => {
    getCourseDetailByID(courseId);
  }, [courseId, getCourseDetailByID]);
  console.log(courseDetail);
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => {
      const IconComponent =
        index < Math.floor(rating) ? StarSolidIcon : StarIcon;
      return (
        <IconComponent
          key={index}
          className={`w-4 h-4 ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        />
      );
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-gray-600">Đang tải...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-gray-600">Không tìm thấy khóa học</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link href="/courses" className="hover:text-primary">
          Khóa học
        </Link>
        <span>/</span>
        <span className="text-gray-900">{courseDetail?.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Course Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${levelColors[courseDetail?.level ?? 'Beginner']}`}>
                {courseDetail?.level}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {courseDetail?.type}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{courseDetail?.title}</h1>

            <p className="text-gray-600 mb-6">{courseDetail?.description}</p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {renderStars(courseDetail?.star ?? 0)}
                </div>
                <span className="font-medium">{courseDetail?.star}</span>
                <span className="text-gray-500">  ({Array.isArray(courseDetail?.rate) ? courseDetail.rate.length : 0} đánh giá)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <UserGroupIcon className="w-5 h-5" />
                <span>{courseDetail?.total_registered.toLocaleString()} học viên</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <ClockIcon className="w-5 h-5" />
                <span>{courseDetail?.total_time}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <BookOpenIcon className="w-5 h-5" />
                <span>{courseDetail?.total_lessons} bài học</span>
              </div>
            </div>

            {/* Instructors */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Giảng viên
              </h3>
              <div className="space-y-3">
                {courseDetail?.teachers.map((teachers) => (
                  <div key={teachers} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-primary to-green-600 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {/* {teachers.name.charAt(0)} */}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{teachers}</p>
                      <p className="text-sm text-gray-600">Giảng viên</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {courseDetail?.tags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="">
              <nav className="flex">
                {[
                  { id: "overview", label: "Tổng quan" },
                  { id: "curriculum", label: "Nội dung khóa học" },
                  { id: "reviews", label: "Đánh giá" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* What you'll learn */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Bạn sẽ học được gì
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {courseDetail?.target.map((objective, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{objective}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Yêu cầu
                    </h3>
                    <ul className="space-y-2">
                      {courseDetail?.require.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Course Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Thông tin khóa học
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <CalendarIcon className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Cập nhật</p>
                        <p className="font-medium">
                          {courseDetail?.updated_at
                            ? new Date(courseDetail.updated_at).toLocaleDateString('vi-VN')
                            : ''}
                        </p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <BookOpenIcon className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Ngôn ngữ</p>
                        <p className="font-medium">{courseDetail?.language}</p>
                      </div>
                      {/* <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <TrophyIcon className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Chứng chỉ</p>
                        <p className="font-medium">{course.certificate ? 'Có' : 'Không'}</p>
                      </div> */}
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <ChartBarIcon className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Cấp độ</p>
                        <p className="font-medium">{courseDetail?.level}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Curriculum Tab */}
              {activeTab === "curriculum" && (
                <div className="space-y-4">
                  {Array.isArray(courseDetail?.course_content) && courseDetail.course_content.length > 0 ? (
                    courseDetail.course_content.map((module) => (
                      <div key={module.id} className="border border-gray-200 rounded-lg">
                        {/* Module Header */}
                        <div className="p-4 bg-gray-50 border-b">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-900">{module.module_title}</h4>
                          </div>
                        </div>

                        {/* Lessons */}
                        <div className="divide-y">
                          {Array.isArray(module.lessons) && module.lessons.length > 0 ? (
                            module.lessons.map((lesson) => (
                              <div key={lesson.id} className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div>
                                    <p className="font-medium text-gray-900">{lesson.title}</p>
                                    <p className="text-sm text-gray-600">{Math.ceil(lesson.study_time / 60)} phút</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {lesson.learned ? (
                                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                                  ) : (
                                    <span className="text-gray-500 text-sm">Chưa học</span>
                                  )}
                                  <Link
                                    href={`/courses/${courseId}/learn/${lesson.id}`}
                                    className="text-primary hover:text-primary-dark"
                                  >
                                    {lesson.learned ? 'Xem lại' : 'Học ngay'}
                                  </Link>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="p-4 text-gray-500">Không có bài học nào trong module này.</p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">Không có nội dung khóa học nào được cung cấp.</p>
                  )}
                  {/* {courseDetail?.course_content.map((module) => (
                    <div key={module.id} className="border border-gray-200 rounded-lg">
                      <div className="p-4 bg-gray-50 border-b">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900">{module.module_title}</h4>
                        </div>
                      </div>
                      <div className="divide-y">
                        {module.lessons.map((lesson) => {
                          const IconComponent = typeIcons[lesson.type];
                          return (
                            <div
                              key={lesson.id}
                              className="p-4 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">
                                <IconComponent className="w-5 h-5 text-gray-600" />
                                <div>
                                  <p
                                    className={`font-medium ${
                                      lesson.isUnlocked
                                        ? "text-gray-900"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    {lesson.title}
                                    {lesson.isFree && (
                                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                        Miễn phí
                                      </span>
                                    )}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {lesson.duration}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {lesson.isCompleted && (
                                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                                )}
                                {!lesson.isUnlocked && (
                                  <LockClosedIcon className="w-5 h-5 text-gray-400" />
                                )}
                                {lesson.isUnlocked && (
                                  <Link
                                    href={`/courses/${course.id}/learn/${lesson.id}`}
                                    className="text-primary hover:text-primary-dark"
                                  >
                                    {lesson.isCompleted
                                      ? "Xem lại"
                                      : "Học ngay"}
                                  </Link>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))} */}
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === "reviews" && (
                <div className="space-y-6">
                  {/* Rating Summary */}
                  <div className="flex items-center gap-8 p-6 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-gray-900">{courseDetail?.star}</p>
                      <div className="flex items-center justify-center mt-2">
                        {renderStars(courseDetail?.star ?? 0)}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{Array.isArray(courseDetail?.rate) ? courseDetail.rate.length : 0} đánh giá</p>
                    </div>

                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div
                          key={star}
                          className="flex items-center gap-3 mb-2"
                        >
                          <span className="text-sm text-gray-600 w-8">
                            {star} sao
                          </span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{ width: `${Math.random() * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reviews */}
                  <div className="space-y-6">
                    {courseDetail?.rate?.map((review, index) => (
                      <div key={index} className="border-b pb-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-primary to-green-600 flex items-center justify-center">
                              <span className="text-white text-sm font-medium">
                                {review.name.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <p className="font-medium text-gray-900">{review.name}</p>
                              <div className="flex items-center">{renderStars(review.star)}</div>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* <div className="space-y-6">
                    {course.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-primary to-green-600 flex items-center justify-center">
                              <span className="text-white text-sm font-medium">
                                {review.userName.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <p className="font-medium text-gray-900">
                                {review.userName}
                              </p>
                              <div className="flex items-center">
                                {renderStars(review.rating)}
                              </div>
                              <span className="text-sm text-gray-500">
                                {new Date(review.date).toLocaleDateString(
                                  "vi-VN"
                                )}
                              </span>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div> */}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
            {/* Video Preview */}
            <div className="aspect-video bg-gray-900 rounded-lg mb-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-green-600 flex items-center justify-center">
                <PlayIcon className="w-16 h-16 text-white" />
              </div>
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                {courseDetail?.total_time}
              </div>
            </div>

            {/* Progress */}
            {/* {course.isEnrolled && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Tiến độ học tập
                  </span>
                  <span className="text-sm text-gray-600">
                    {course.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {course.completedLessons}/{course.totalLessons} bài học hoàn
                  thành
                </p>
              </div>
            )} */}

            {/* Price */}
            {/* <div className="mb-6">
              {course.price === 0 ? (
                <p className="text-3xl font-bold text-green-600">Miễn phí</p>
              ) : (
                <div>
                  <p className="text-3xl font-bold text-gray-900">
                    {course.price.toLocaleString('vi-VN')} VNĐ
                  </p>
                  {course.originalPrice && (
                    <p className="text-lg text-gray-500 line-through">
                      {course.originalPrice.toLocaleString("vi-VN")} VNĐ
                    </p>
                  )}
                </div>
              )}
            </div> */}

            {/* Actions */}
            <div className="space-y-3">
              {/* {course.isEnrolled ? (
                <Link
                  href={`/courses/${courseId}/learn/${course.modules[0].lessons[0].id}`}
                  className="btn-primary w-full text-center block"
                >
                  Tiếp tục học
                </Link>
              ) : (
                <button
                  onClick={handleRegister}
                  disabled={isRegistering || !userId}
                  className={`btn-primary w-full ${
                    isRegistering || !userId
                      ? "opacity-60 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isRegistering ? "Đang đăng ký..." : "Đăng ký học"}
                </button>
              )} */}
              <Link
                href={`/courses/${courseId}/learn/1`}
                className="btn-primary w-full text-center block"
              >
                Tiếp tục học
              </Link>

              <button className="btn-secondary w-full">
                Thêm vào yêu thích
              </button>
            </div>

            {/* Course includes */}
            {/* <div className="mt-6 pt-6">
              <h4 className="font-semibold text-gray-900 mb-4">Khóa học bao gồm:</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <PlayIcon className="w-4 h-4 text-gray-600" />
                  <span>{course.duration} video</span>
                </li>
                <li className="flex items-center gap-3">
                  <DocumentTextIcon className="w-4 h-4 text-gray-600" />
                  <span>Tài liệu học tập</span>
                </li>
                <li className="flex items-center gap-3">
                  <TrophyIcon className="w-4 h-4 text-gray-600" />
                  <span>500 exp</span>
                </li>
                <li className="flex items-center gap-3">
                  <ClockIcon className="w-4 h-4 text-gray-600" />
                  <span>Truy cập trọn đời</span>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
