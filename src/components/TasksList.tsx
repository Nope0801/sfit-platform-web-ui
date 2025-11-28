'use client';

import { useState } from 'react';
import {
  ClipboardDocumentListIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  FunnelIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';

// Sample tasks data
const tasks = [
  {
    id: 1,
    title: 'Hoàn thành bài tập React.js tuần 3',
    description: 'Xây dựng ứng dụng Todo List sử dụng React Hooks và Context API. Yêu cầu có đầy đủ chức năng CRUD và responsive design.',
    dueDate: '2025-01-20',
    dueTime: '23:59',
    priority: 'high',
    status: 'in-progress',
    category: 'Học tập',
    course: 'React.js từ cơ bản đến nâng cao',
    instructor: 'Thầy Nguyễn Văn A',
    estimatedTime: '8 giờ',
    progress: 60,
    tags: ['React', 'JavaScript', 'Assignment'],
    requirements: [
      'Sử dụng React Hooks (useState, useEffect, useContext)',
      'Responsive design cho mobile và desktop',
      'Code clean và có comment',
      'Deploy lên Netlify hoặc Vercel'
    ],
    submissionType: 'GitHub Repository + Live Demo',
    points: 100
  },
  {
    id: 2,
    title: 'Dự án cuối kỳ - DevOps Pipeline',
    description: 'Thiết kế và triển khai một CI/CD pipeline hoàn chỉnh cho ứng dụng web, bao gồm testing, building, và deployment tự động.',
    dueDate: '2025-01-18',
    dueTime: '23:59',
    priority: 'critical',
    status: 'not-started',
    category: 'Dự án',
    course: 'DevOps và Cloud Computing',
    instructor: 'Thầy Lê Văn C',
    estimatedTime: '20 giờ',
    progress: 0,
    tags: ['DevOps', 'CI/CD', 'Docker', 'AWS'],
    requirements: [
      'Sử dụng Jenkins hoặc GitHub Actions',
      'Containerize với Docker',
      'Deploy lên AWS/Azure',
      'Monitoring và logging',
      'Documentation đầy đủ'
    ],
    submissionType: 'GitHub Repository + Demo Video',
    points: 200
  },
  {
    id: 3,
    title: 'Viết báo cáo workshop AI/ML',
    description: 'Tổng kết kiến thức đã học trong workshop AI và Machine Learning, bao gồm lý thuyết và thực hành với các case studies.',
    dueDate: '2025-01-22',
    dueTime: '18:00',
    priority: 'medium',
    status: 'completed',
    category: 'Báo cáo',
    course: 'Workshop AI cho người mới bắt đầu',
    instructor: 'Cô Trần Thị B',
    estimatedTime: '4 giờ',
    progress: 100,
    tags: ['AI', 'Machine Learning', 'Report'],
    requirements: [
      'Tối thiểu 5 trang A4',
      'Bao gồm code examples',
      'Phân tích ít nhất 2 case studies',
      'Tài liệu tham khảo đầy đủ'
    ],
    submissionType: 'PDF Document',
    points: 50,
    submittedAt: '2025-01-15T14:30:00Z',
    grade: 95
  },
  {
    id: 4,
    title: 'Chuẩn bị presentation Hackathon',
    description: 'Tạo slide presentation và demo video cho dự án của team trong Hackathon Weekend. Thời gian trình bày: 10 phút.',
    dueDate: '2025-02-21',
    dueTime: '18:00',
    priority: 'high',
    status: 'in-progress',
    category: 'Presentation',
    course: 'Hackathon Weekend',
    instructor: 'Ban tổ chức',
    estimatedTime: '6 giờ',
    progress: 25,
    tags: ['Presentation', 'Hackathon', 'Team'],
    requirements: [
      'Slide deck tối đa 15 slides',
      'Demo video 3-5 phút',
      'Giải thích technical solution',
      'Business impact và future plans'
    ],
    submissionType: 'Presentation + Demo',
    points: 150,
    teamMembers: ['Bạn', 'Nguyễn Văn X', 'Trần Thị Y', 'Lê Văn Z']
  },
  {
    id: 5,
    title: 'Code review cho junior members',
    description: 'Review code cho 3 bài tập của các thành viên mới, đưa ra feedback constructive và suggestions để cải thiện.',
    dueDate: '2025-01-25',
    dueTime: '20:00',
    priority: 'medium',
    status: 'not-started',
    category: 'Mentoring',
    course: 'Hoạt động CLB',
    instructor: 'Technical Team',
    estimatedTime: '3 giờ',
    progress: 0,
    tags: ['Code Review', 'Mentoring', 'Community'],
    requirements: [
      'Review chi tiết ít nhất 3 pull requests',
      'Viết feedback constructive',
      'Suggest improvements',
      'Schedule 1-on-1 session nếu cần'
    ],
    submissionType: 'GitHub Comments + Report',
    points: 75,
    assignedPullRequests: [
      'Todo App by Nguyễn A',
      'Calculator by Trần B',
      'Weather App by Lê C'
    ]
  },
  {
    id: 6,
    title: 'Thiết kế UI cho ứng dụng CLB',
    description: 'Tạo mockup và prototype cho ứng dụng mobile của câu lạc bộ, bao gồm các màn hình chính và user flow.',
    dueDate: '2025-02-10',
    dueTime: '17:00',
    priority: 'medium',
    status: 'in-progress',
    category: 'Thiết kế',
    course: 'UI/UX Design cơ bản',
    instructor: 'Cô Nguyễn Thị E',
    estimatedTime: '12 giờ',
    progress: 40,
    tags: ['UI/UX', 'Design', 'Mobile', 'Figma'],
    requirements: [
      'Wireframes cho 8-10 screens',
      'High-fidelity mockups',
      'Interactive prototype',
      'Design system guidelines'
    ],
    submissionType: 'Figma File + Presentation',
    points: 120
  },
  {
    id: 7,
    title: 'Tham gia quiz Python weekly',
    description: 'Hoàn thành bài quiz tuần này về Data Structures và Algorithms trong Python. 20 câu hỏi trong 30 phút.',
    dueDate: '2025-01-19',
    dueTime: '21:00',
    priority: 'low',
    status: 'not-started',
    category: 'Quiz',
    course: 'Python cho Data Science',
    instructor: 'Hệ thống tự động',
    estimatedTime: '30 phút',
    progress: 0,
    tags: ['Python', 'Quiz', 'Data Structures'],
    requirements: [
      '20 câu hỏi trắc nghiệm',
      'Thời gian: 30 phút',
      'Điểm tối thiểu: 70%',
      'Chỉ được làm 1 lần'
    ],
    submissionType: 'Online Quiz',
    points: 25,
    attempts: 0,
    maxAttempts: 1
  }
];

const priorities = ['Tất cả', 'low', 'medium', 'high', 'critical'];
const statuses = ['Tất cả', 'not-started', 'in-progress', 'completed', 'overdue'];
const categories = ['Tất cả', 'Học tập', 'Dự án', 'Báo cáo', 'Presentation', 'Mentoring', 'Thiết kế', 'Quiz'];

const priorityLabels = {
  low: 'Thấp',
  medium: 'Trung bình',
  high: 'Cao',
  critical: 'Khẩn cấp'
};

const statusLabels = {
  'not-started': 'Chưa bắt đầu',
  'in-progress': 'Đang thực hiện',
  'completed': 'Hoàn thành',
  'overdue': 'Quá hạn'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-blue-100 text-blue-800',
  high: 'bg-yellow-100 text-yellow-800',
  critical: 'bg-red-100 text-red-800'
};

const statusColors = {
  'not-started': 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  'completed': 'bg-green-100 text-green-800',
  'overdue': 'bg-red-100 text-red-800'
};

function isOverdue(dueDate: string, dueTime: string) {
  const now = new Date();
  const due = new Date(`${dueDate}T${dueTime}`);
  return now > due;
}

function formatTimeLeft(dueDate: string, dueTime: string) {
  const now = new Date();
  const due = new Date(`${dueDate}T${dueTime}`);
  const diffTime = due.getTime() - now.getTime();

  if (diffTime < 0) return 'Đã quá hạn';

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (diffDays > 0) return `Còn ${diffDays} ngày`;
  if (diffHours > 0) return `Còn ${diffHours} giờ`;
  return 'Sắp hết hạn';
}

export default function TasksList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedPriority, setSelectedPriority] = useState('Tất cả');
  const [selectedStatus, setSelectedStatus] = useState('Tất cả');
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const handleFilter = () => {
    let filtered = tasks;

    if (selectedCategory !== 'Tất cả') {
      filtered = filtered.filter(task => task.category === selectedCategory);
    }

    if (selectedPriority !== 'Tất cả') {
      filtered = filtered.filter(task => task.priority === selectedPriority);
    }

    if (selectedStatus !== 'Tất cả') {
      filtered = filtered.filter(task => {
        if (selectedStatus === 'overdue') {
          return task.status !== 'completed' && isOverdue(task.dueDate, task.dueTime);
        }
        return task.status === selectedStatus;
      });
    }

    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredTasks(filtered);
  };

  useState(() => {
    handleFilter();
  });

  const overdueCount = tasks.filter(task =>
    task.status !== 'completed' && isOverdue(task.dueDate, task.dueTime)
  ).length;

  const inProgressCount = tasks.filter(task => task.status === 'in-progress').length;
  const completedCount = tasks.filter(task => task.status === 'completed').length;
  const notStartedCount = tasks.filter(task => task.status === 'not-started').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <ClipboardDocumentListIcon className="w-8 h-8 text-[#267452] mr-3" />
          Nhiệm vụ của tôi
          {overdueCount > 0 && (
            <span className="ml-3 bg-red-500 text-white text-sm px-2 py-1 rounded-full">
              {overdueCount} quá hạn
            </span>
          )}
        </h1>
        <p className="text-gray-600">
          Quản lý và theo dõi tiến độ các nhiệm vụ, bài tập và dự án
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <ClipboardDocumentListIcon className="w-6 h-6 text-gray-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{notStartedCount}</p>
          <p className="text-sm text-gray-600">Chưa bắt đầu</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <PlayIcon className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{inProgressCount}</p>
          <p className="text-sm text-gray-600">Đang thực hiện</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CheckCircleIcon className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
          <p className="text-sm text-gray-600">Hoàn thành</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{overdueCount}</p>
          <p className="text-sm text-gray-600">Quá hạn</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="card sticky top-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <FunnelIcon className="w-5 h-5 mr-2" />
              Bộ lọc
            </h3>

            <div className="space-y-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tìm kiếm
                </label>
                <input
                  type="text"
                  placeholder="Tìm kiếm nhiệm vụ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyUp={handleFilter}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#267452] focus:border-transparent outline-none text-sm"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh mục
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setTimeout(handleFilter, 0);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#267452] focus:border-transparent outline-none text-sm"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Priority Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Độ ưu tiên
                </label>
                <select
                  value={selectedPriority}
                  onChange={(e) => {
                    setSelectedPriority(e.target.value);
                    setTimeout(handleFilter, 0);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#267452] focus:border-transparent outline-none text-sm"
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>
                      {priority === 'Tất cả' ? 'Tất cả' : priorityLabels[priority as keyof typeof priorityLabels]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trạng thái
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setTimeout(handleFilter, 0);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#267452] focus:border-transparent outline-none text-sm"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status === 'Tất cả' ? 'Tất cả' : statusLabels[status as keyof typeof statusLabels]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="lg:col-span-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <ClipboardDocumentListIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Không có nhiệm vụ nào
              </h3>
              <p className="text-gray-600">
                Thử thay đổi bộ lọc để xem thêm nhiệm vụ
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredTasks.map((task) => {
                const isTaskOverdue = task.status !== 'completed' && isOverdue(task.dueDate, task.dueTime);
                const effectiveStatus = isTaskOverdue ? 'overdue' : task.status;

                return (
                  <div
                    key={task.id}
                    className={`card hover:shadow-lg transition-shadow duration-200 border-l-4 ${effectiveStatus === 'overdue' ? 'border-l-red-500' :
                        effectiveStatus === 'completed' ? 'border-l-green-500' :
                          effectiveStatus === 'in-progress' ? 'border-l-blue-500' :
                            'border-l-gray-300'
                      }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{task.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                            {priorityLabels[task.priority as keyof typeof priorityLabels]}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[effectiveStatus as keyof typeof statusColors]}`}>
                            {effectiveStatus === 'overdue' ? 'Quá hạn' : statusLabels[task.status as keyof typeof statusLabels]}
                          </span>
                        </div>

                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {task.description}
                        </p>
                      </div>

                      {task.status === 'completed' && task.grade && (
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Điểm số</p>
                          <p className="text-2xl font-bold text-green-600">{task.grade}%</p>
                        </div>
                      )}
                    </div>

                    {/* Task Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-2 text-[#267452]" />
                        <span>Hạn: {new Date(task.dueDate).toLocaleDateString('vi-VN')} {task.dueTime}</span>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-2 text-[#267452]" />
                        <span>Ước tính: {task.estimatedTime}</span>
                      </div>
                      <div className="flex items-center">
                        <UserIcon className="w-4 h-4 mr-2 text-[#267452]" />
                        <span>{task.instructor}</span>
                      </div>
                    </div>

                    {/* Course and Category */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                          {task.course}
                        </span>
                        <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                          {task.category}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {isTaskOverdue ? 'Đã quá hạn' : formatTimeLeft(task.dueDate, task.dueTime)}
                        </p>
                        <p className="text-xs text-gray-500">{task.points} điểm</p>
                      </div>
                    </div>

                    {/* Progress Bar (for in-progress tasks) */}
                    {task.status === 'in-progress' && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Tiến độ</span>
                          <span>{task.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#267452] h-2 rounded-full"
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {task.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex space-x-3">
                        {task.status === 'not-started' && (
                          <button className="btn-primary text-sm">
                            Bắt đầu
                          </button>
                        )}
                        {task.status === 'in-progress' && (
                          <>
                            <button className="btn-primary text-sm">
                              Tiếp tục
                            </button>
                            <button className="btn-secondary text-sm">
                              Tạm dừng
                            </button>
                          </>
                        )}
                        {task.status === 'completed' && (
                          <button className="btn-secondary text-sm">
                            Xem kết quả
                          </button>
                        )}
                        <button className="btn-secondary text-sm">
                          Chi tiết
                        </button>
                      </div>

                      <span className="text-xs text-gray-500">
                        Nộp bài: {task.submissionType}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
