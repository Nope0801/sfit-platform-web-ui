'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  AcademicCapIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  UserIcon,
  StarIcon,
  BookOpenIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { useCourseService } from '@/hooks/use-course-hooks';
import { Course, CourseRegisterRequest } from '@/types/course';
import { PageListResp } from '@/types/pagination';
import { useTokenPayload } from '@/hooks/token-hooks';
// Sample courses data
// const courses = [
//   {
//     id: 1,
//     title: 'React.js từ cơ bản đến nâng cao',
//     description: 'Khóa học toàn diện về React.js, từ những khái niệm cơ bản đến các kỹ thuật nâng cao như Redux, Context API, và Performance Optimization.',
//     instructor: 'Thầy Nguyễn Văn A',
//     instructorAvatar: '/api/placeholder/50/50',
//     duration: '8 tuần',
//     totalLessons: 20,
//     level: 'Trung cấp',
//     category: 'Frontend',
//     price: 'Miễn phí',
//     rating: 4.8,
//     studentsCount: 156,
//     image: '/api/placeholder/400/250',
//     progress: 75,
//     isEnrolled: true,
//     completedLessons: 15,
//     tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
//     syllabus: [
//       'Giới thiệu về React và JSX',
//       'Components và Props',
//       'State và Lifecycle',
//       'Handling Events',
//       'Hooks (useState, useEffect)',
//       'Context API',
//       'Redux và Redux Toolkit',
//       'Performance Optimization'
//     ]
//   },
//   {
//     id: 2,
//     title: 'Python cho Data Science',
//     description: 'Học cách sử dụng Python để phân tích dữ liệu, xây dựng machine learning models và visualization với các thư viện như Pandas, NumPy, Matplotlib.',
//     instructor: 'Cô Trần Thị B',
//     instructorAvatar: '/api/placeholder/50/50',
//     duration: '10 tuần',
//     totalLessons: 25,
//     level: 'Cơ bản',
//     category: 'Data Science',
//     price: 'Miễn phí',
//     rating: 4.6,
//     studentsCount: 89,
//     image: '/api/placeholder/400/250',
//     progress: 45,
//     isEnrolled: true,
//     completedLessons: 11,
//     tags: ['Python', 'Data Science', 'Machine Learning', 'Analytics'],
//     syllabus: [
//       'Python cơ bản cho Data Science',
//       'NumPy và array operations',
//       'Pandas và data manipulation',
//       'Data visualization với Matplotlib',
//       'Seaborn cho statistical plots',
//       'Machine Learning với Scikit-learn',
//       'Data cleaning và preprocessing',
//       'Final project: End-to-end analysis'
//     ]
//   },
//   {
//     id: 3,
//     title: 'DevOps và Cloud Computing',
//     description: 'Tìm hiểu về DevOps practices, CI/CD pipelines, containerization với Docker, và deployment trên AWS/Azure cloud platforms.',
//     instructor: 'Thầy Lê Văn C',
//     instructorAvatar: '/api/placeholder/50/50',
//     duration: '12 tuần',
//     totalLessons: 30,
//     level: 'Nâng cao',
//     category: 'DevOps',
//     price: 'Miễn phí',
//     rating: 4.9,
//     studentsCount: 67,
//     image: '/api/placeholder/400/250',
//     progress: 20,
//     isEnrolled: true,
//     completedLessons: 6,
//     tags: ['DevOps', 'Docker', 'AWS', 'CI/CD', 'Cloud'],
//     syllabus: [
//       'Introduction to DevOps',
//       'Version Control với Git',
//       'Docker fundamentals',
//       'Kubernetes basics',
//       'CI/CD với Jenkins',
//       'AWS services overview',
//       'Infrastructure as Code',
//       'Monitoring và Logging'
//     ]
//   },
//   {
//     id: 4,
//     title: 'Mobile App Development với Flutter',
//     description: 'Xây dựng ứng dụng mobile cross-platform với Flutter và Dart. Học cách tạo UI đẹp và tích hợp các API.',
//     instructor: 'Thầy Phạm Văn D',
//     instructorAvatar: '/api/placeholder/50/50',
//     duration: '6 tuần',
//     totalLessons: 18,
//     level: 'Trung cấp',
//     category: 'Mobile',
//     price: 'Miễn phí',
//     rating: 4.7,
//     studentsCount: 124,
//     image: '/api/placeholder/400/250',
//     progress: 0,
//     isEnrolled: false,
//     completedLessons: 0,
//     tags: ['Flutter', 'Dart', 'Mobile', 'Cross-platform'],
//     syllabus: [
//       'Dart programming basics',
//       'Flutter widgets và layouts',
//       'Navigation và routing',
//       'State management',
//       'API integration',
//       'Local storage',
//       'Publishing to app stores'
//     ]
//   },
//   {
//     id: 5,
//     title: 'UI/UX Design cơ bản',
//     description: 'Học các nguyên tắc thiết kế UI/UX, sử dụng Figma để tạo mockups và prototypes chuyên nghiệp.',
//     instructor: 'Cô Nguyễn Thị E',
//     instructorAvatar: '/api/placeholder/50/50',
//     duration: '5 tuần',
//     totalLessons: 15,
//     level: 'Cơ bản',
//     category: 'Design',
//     price: 'Miễn phí',
//     rating: 4.5,
//     studentsCount: 203,
//     image: '/api/placeholder/400/250',
//     progress: 0,
//     isEnrolled: false,
//     completedLessons: 0,
//     tags: ['UI', 'UX', 'Design', 'Figma'],
//     syllabus: [
//       'Design thinking process',
//       'Color theory và typography',
//       'Wireframing techniques',
//       'Prototyping với Figma',
//       'User research methods',
//       'Usability testing',
//       'Design system creation'
//     ]
//   },
//   {
//     id: 6,
//     title: 'Blockchain và Smart Contracts',
//     description: 'Tìm hiểu về công nghệ blockchain, cách viết smart contracts với Solidity và phát triển DApps.',
//     instructor: 'Thầy Hoàng Văn F',
//     instructorAvatar: '/api/placeholder/50/50',
//     duration: '8 tuần',
//     totalLessons: 22,
//     level: 'Nâng cao',
//     category: 'Blockchain',
//     price: 'Miễn phí',
//     rating: 4.4,
//     studentsCount: 45,
//     image: '/api/placeholder/400/250',
//     progress: 0,
//     isEnrolled: false,
//     completedLessons: 0,
//     tags: ['Blockchain', 'Smart Contracts', 'Solidity', 'Web3'],
//     syllabus: [
//       'Blockchain fundamentals',
//       'Ethereum và smart contracts',
//       'Solidity programming',
//       'Web3.js integration',
//       'DApp development',
//       'NFT creation',
//       'DeFi protocols',
//       'Security best practices'
//     ]
//   }
// ];

const categories = ['Tất cả', 'Frontend', 'Data Science', 'DevOps', 'Mobile', 'Design', 'Blockchain'];
const levels = ['Tất cả', 'Cơ bản', 'Trung cấp', 'Nâng cao'];

export default function CoursesList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedLevel, setSelectedLevel] = useState('Tất cả');
  const [showEnrolledOnly, setShowEnrolledOnly] = useState(false);
  const [classesPerPage] = useState(6);
  const { getListCourse, courses, registerUserToCourse, getRegisteredUsers } = useCourseService()
  const [totalItems, setTotalItems] = useState(0);
  const [pageData, setPageData] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  console.log(totalItems);
  console.log(pageData);
  const tokenPayload = useTokenPayload();
  
  // const handleFilter = () => {
  //   let filtered = courses;

  //   if (selectedCategory !== 'Tất cả') {
  //     filtered = filtered.filter(course => course.category === selectedCategory);
  //   }

  //   if (selectedLevel !== 'Tất cả') {
  //     filtered = filtered.filter(course => course.level === selectedLevel);
  //   }

  //   if (showEnrolledOnly) {
  //     filtered = filtered.filter(course => course.isEnrolled);
  //   }

  //   if (searchTerm) {
  //     filtered = filtered.filter(course =>
  //       course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  //     );
  //   }

  //   setFilteredCourses(filtered);
  // };

  // useState(() => {
  //   handleFilter();
  // });

  const fetchCourses = useCallback(async () => {
    const resp: PageListResp<Course[]> | undefined = await getListCourse({
      title: searchTerm || undefined,
      type: selectedCategory !== 'Tất cả' ? selectedCategory : undefined,
      level: selectedLevel !== 'Tất cả' ? (selectedLevel as any) : undefined,
      only_registed: showEnrolledOnly || undefined,
      page: currentPage,
      page_size: classesPerPage,
    });

    if (resp) {
      setTotalPages(Math.ceil(resp.total_count / classesPerPage));
      setPageData(resp.items);
      setTotalItems(resp.total_count);
    } else {
      setPageData([]);
      setTotalItems(0);
    }
  }, [searchTerm, selectedCategory, selectedLevel, showEnrolledOnly, currentPage, classesPerPage, getListCourse]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const handleRegisterCourse = async (courseId: string) => {
    const userId = tokenPayload?.sub;

    if (!userId) {
      alert('Không thể lấy thông tin người dùng. Vui lòng đăng nhập lại.');
      return;
    }

    const request: CourseRegisterRequest = {
      course_id: courseId,
      user_ids: [userId],
      status: "REQUEST"
    };

    const success = await registerUserToCourse(request);
    if (success) {
      alert('Đăng ký khóa học thành công!');
      fetchCourses(); // Làm mới danh sách khóa học
    } else {
      alert('Đăng ký khóa học thất bại. Vui lòng thử lại.');
    }
  };
  // console.log(courses);
  const handleViewCourseDetail = async (courseId: string) => {
    const userId = tokenPayload?.sub;

    if (!userId) {
      alert('Không thể lấy thông tin người dùng. Vui lòng đăng nhập lại.');
      return;
    }

    const registeredUsers = await getRegisteredUsers(courseId, 1, -1, "LEARNED");
    console.log(registeredUsers);
    const isUserRegistered = Array.isArray(registeredUsers?.users) && registeredUsers.users.some(users => users.id === userId);

    if (isUserRegistered) {
      window.location.href = `/courses/${courseId}`;
    } else {
      alert('Bạn không có quyền truy cập vào khóa học này.');
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <AcademicCapIcon className="w-8 h-8 text-[#267452] mr-3" />
          Khóa học
        </h1>
        <p className="text-gray-600">
          Khám phá và tham gia các khóa học chất lượng cao được thiết kế bởi các chuyên gia
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm khóa học..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // onKeyUp={handleFilter}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#267452] focus:border-transparent outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <span className="flex items-center text-sm text-gray-600">
            <FunnelIcon className="w-4 h-4 mr-1" />
            Lọc:
          </span>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              // setTimeout(handleFilter, 0);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#267452] focus:border-transparent outline-none"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Level Filter */}
          <select
            value={selectedLevel}
            onChange={(e) => {
              setSelectedLevel(e.target.value);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#267452] focus:border-transparent outline-none"
          >
            {levels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>

          {/* Enrolled Only Filter */}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showEnrolledOnly}
              onChange={(e) => {
                setShowEnrolledOnly(e.target.checked);
                // setTimeout(handleFilter, 0);
              }}
              className="w-4 h-4 text-[#267452] border-gray-300 rounded focus:ring-[#267452]"
            />
            <span className="text-sm text-gray-700">Chỉ khóa học đã đăng ký</span>
          </label>
        </div>
      </div>

      {/* Courses Grid */}
      {(courses?.length ?? 0) === 0 ? (
        <div className="text-center py-12">
          <AcademicCapIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Không tìm thấy khóa học nào
          </h3>
          <p className="text-gray-600">
            Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="card hover:shadow-lg transition-shadow duration-200">
              {/* Course Image */}
              <div className="relative w-full h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-[#267452] to-[#1f5e42] flex items-center justify-center">
                  <AcademicCapIcon className="w-16 h-16 text-white opacity-50" />
                </div>
                {/* {course.isEnrolled && (
                  <div className="absolute top-3 right-3 bg-[#267452] text-white px-2 py-1 rounded-full text-xs font-medium">
                    Đã đăng ký
                  </div>
                )} */}
                <div className="absolute top-3 left-3 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium">
                  {course.level}
                </div>
              </div>

              {/* Course Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    {course.type}
                  </span>
                  {/* <span className="text-sm font-semibold text-[#267452]">
                    {course.price}
                  </span> */}
                </div>

                <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {course.description}
                </p>

                {/* Instructor */}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-gray-600" />
                  </div>
                  <span className="text-sm text-gray-700">
                    {course.teachers?.join(', ') || 'Không có giảng viên'}
                  </span>
                </div>

                {/* Course Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      {course.total_time}
                    </span>
                    <span className="flex items-center">
                      <BookOpenIcon className="w-4 h-4 mr-1" />
                      {course.total_lessons} bài
                    </span>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                    {/* <span>{course.rating}</span> */}
                  </div>
                </div>

                {/* Progress (if enrolled) */}
                {/* {course.isEnrolled && (
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Tiến độ</span>
                      <span>{course.completedLessons}/{course.totalLessons} bài</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#267452] h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{course.progress}% hoàn thành</p>
                  </div>
                )} */}

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {course.tags?.slice(0, 3).map((tag, index) => (
                    <span
                      key={`${tag}-${index}`} // Ensure the key is unique
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {course.tags && course.tags.length > 3 && (
                    <span className="text-xs text-gray-500">+{course.tags.length - 3}</span>
                  )}
                </div>

                {/* Action Button */}
                <div className="pt-3 border-t border-gray-200">
                  {/* {course.isEnrolled ? (
                    <div className="flex gap-2">
                      <Link
                        href={`/courses/${course.id}/learn/1`}
                        className="btn-primary flex-1 flex items-center justify-center"
                      >
                        <PlayIcon className="w-4 h-4 mr-2" />
                        Tiếp tục học
                      </Link>
                      <Link
                        href={`/courses/${course.id}`}
                        className="btn-secondary"
                      >
                        Chi tiết
                      </Link>
                    </div>
                  ) : ( */}
                  <div className="flex gap-2">
                    <button
                      className="btn-secondary flex-1"
                      onClick={() => handleRegisterCourse(course.id)}>
                      Đăng ký khóa học
                    </button>
                    <button
                      className="btn-secondary"
                      onClick={() => handleViewCourseDetail(course.id)}
                    >
                      Xem chi tiết
                    </button>
                  </div>
                  {/* )} */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* My Learning Progress Section (if user has enrolled courses) */}
      {/* {courses.some(course => course.isEnrolled) && (
        <div className="mt-16">
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircleIcon className="w-6 h-6 text-[#267452] mr-2" />
              Tiến độ học tập của tôi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                .filter(course => course.isEnrolled)
                .map((course) => (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">Giảng viên: {course.instructor}</p>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Tiến độ</span>
                        <span>{course.completedLessons}/{course.totalLessons} bài</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#267452] h-2 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{course.progress}% hoàn thành</p>
                    </div>
                    <Link
                      href={`/courses/${course.id}/learn/1`}
                      className="btn-primary text-sm w-full text-center"
                    >
                      Tiếp tục học
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )} */}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded-lg ${currentPage === 1 ? 'text-gray-400' : 'text-[#267452]'}`}
        >
          Trước
        </button>
        <span className="text-gray-700">
          Trang {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded-lg ${currentPage === totalPages ? 'text-gray-400' : 'text-[#267452]'}`}
        >
          Sau
        </button>
      </div>
    </div >
  );
}
