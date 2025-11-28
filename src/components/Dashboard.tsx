import Link from 'next/link';
import {
  NewspaperIcon,
  AcademicCapIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

// Sample data
const quickStats = [
  { label: 'Bản tin mới', value: '12', icon: NewspaperIcon, color: 'text-blue-600' },
  { label: 'Khóa học đang học', value: '3', icon: AcademicCapIcon, color: 'text-green-600' },
  { label: 'Sự kiện sắp tới', value: '5', icon: CalendarIcon, color: 'text-purple-600' },
  { label: 'Nhiệm vụ chờ', value: '8', icon: ClipboardDocumentListIcon, color: 'text-orange-600' },
];

const recentNews = [
  {
    id: 1,
    title: 'Khai mạc cuộc thi lập trình SFIT Code Challenge 2025',
    excerpt: 'Cuộc thi lập trình lớn nhất trong năm của câu lạc bộ chính thức được khởi động...',
    time: '2 giờ trước',
    category: 'Cuộc thi'
  },
  {
    id: 2,
    title: 'Workshop "AI và Machine Learning cho người mới bắt đầu"',
    excerpt: 'Tham gia workshop miễn phí về AI cơ bản dành cho các thành viên mới...',
    time: '5 giờ trước',
    category: 'Workshop'
  },
  {
    id: 3,
    title: 'Thông báo lịch nghỉ Tết Nguyên Đán 2025',
    excerpt: 'Câu lạc bộ thông báo lịch nghỉ Tết và các hoạt động trong thời gian này...',
    time: '1 ngày trước',
    category: 'Thông báo'
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: 'Seminar "Xu hướng công nghệ 2025"',
    date: '15/02/2025',
    time: '19:00',
    location: 'Phòng 401, Tòa A'
  },
  {
    id: 2,
    title: 'Hackathon Weekend',
    date: '22-23/02/2025',
    time: '08:00',
    location: 'Lab máy tính'
  },
  {
    id: 3,
    title: 'Team Building CLB',
    date: '01/03/2025',
    time: '07:00',
    location: 'Đà Lạt'
  }
];

const activeCourses = [
  {
    id: 1,
    title: 'React.js từ cơ bản đến nâng cao',
    progress: 75,
    totalLessons: 20,
    completedLessons: 15,
    instructor: 'Thầy Nguyễn Văn A'
  },
  {
    id: 2,
    title: 'Python cho Data Science',
    progress: 45,
    totalLessons: 25,
    completedLessons: 11,
    instructor: 'Cô Trần Thị B'
  },
  {
    id: 3,
    title: 'DevOps và Cloud Computing',
    progress: 20,
    totalLessons: 30,
    completedLessons: 6,
    instructor: 'Thầy Lê Văn C'
  }
];

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Xin chào, Nguyễn Văn A! 👋
        </h1>
        <p className="text-gray-600">
          Chào mừng bạn quay trở lại với SFIT Club. Hãy xem những gì mới trong hôm nay.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="card hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent News */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <NewspaperIcon className="w-6 h-6 text-[#267452] mr-2" />
                Bản tin mới nhất
              </h2>
              <Link href="/news" className="text-[#267452] hover:text-[#1f5e42] text-sm font-medium">
                Xem tất cả →
              </Link>
            </div>
            <div className="space-y-4">
              {recentNews.map((news) => (
                <div key={news.id} className="border-l-4 border-[#267452] pl-4 hover:bg-gray-50 p-3 rounded-r-lg transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-[#267452] text-white px-2 py-1 rounded-full">
                      {news.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      {news.time}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{news.title}</h3>
                  <p className="text-sm text-gray-600">{news.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <CalendarIcon className="w-6 h-6 text-[#267452] mr-2" />
                Sự kiện sắp tới
              </h2>
              <Link href="/events" className="text-[#267452] hover:text-[#1f5e42] text-sm font-medium">
                Xem tất cả →
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow duration-200">
                  <h3 className="font-semibold text-gray-900 text-sm mb-2">{event.title}</h3>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>📅 {event.date}</p>
                    <p>🕐 {event.time}</p>
                    <p>📍 {event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

         
        </div>
      </div>

      {/* Active Courses */}
      <div className="mt-8">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <AcademicCapIcon className="w-6 h-6 text-[#267452] mr-2" />
              Khóa học đang tham gia
            </h2>
            <Link href="/courses" className="text-[#267452] hover:text-[#1f5e42] text-sm font-medium">
              Xem tất cả →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeCourses.map((course) => (
              <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
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
                <button className="btn-primary text-sm w-full">
                  Tiếp tục học
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
