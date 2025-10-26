'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ClockIcon,
  BookOpenIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon as PendingIcon
} from '@heroicons/react/24/outline';

interface Activity {
  id: string;
  type: 'course' | 'event' | 'task' | 'discussion' | 'news' | 'achievement';
  title: string;
  description: string;
  timestamp: string;
  status?: 'completed' | 'pending' | 'failed';
  relatedId?: string;
  metadata?: Record<string, any>;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'course',
    title: 'Hoàn thành bài học "React Hooks nâng cao"',
    description: 'Bạn đã hoàn thành bài học trong khóa "Frontend Development với React"',
    timestamp: '2024-01-15T10:30:00Z',
    status: 'completed',
    relatedId: 'course-1',
    metadata: { score: 95, duration: '45 phút' }
  },
  {
    id: '2',
    type: 'event',
    title: 'Tham gia Workshop "UI/UX Design Thinking"',
    description: 'Bạn đã đăng ký và tham gia workshop về thiết kế giao diện',
    timestamp: '2024-01-14T14:00:00Z',
    status: 'completed',
    relatedId: 'event-1'
  },
  {
    id: '3',
    type: 'task',
    title: 'Nộp bài tập "Thiết kế Database"',
    description: 'Hoàn thành và nộp bài tập cho dự án nhóm',
    timestamp: '2024-01-13T16:20:00Z',
    status: 'completed',
    relatedId: 'task-1',
    metadata: { grade: 'A', feedback: 'Làm rất tốt!' }
  },
  {
    id: '4',
    type: 'discussion',
    title: 'Tham gia thảo luận "Best Practices in React"',
    description: 'Bạn đã đóng góp 3 bình luận trong cuộc thảo luận',
    timestamp: '2024-01-12T09:15:00Z',
    status: 'completed',
    relatedId: 'discussion-1'
  },
  {
    id: '5',
    type: 'achievement',
    title: 'Đạt thành tích "Học viên xuất sắc"',
    description: 'Bạn đã hoàn thành 10 khóa học với điểm số trên 90%',
    timestamp: '2024-01-11T18:45:00Z',
    status: 'completed',
    relatedId: 'achievement-1'
  },
  {
    id: '6',
    type: 'course',
    title: 'Bắt đầu khóa học "Node.js Backend Development"',
    description: 'Bạn đã đăng ký và bắt đầu khóa học mới',
    timestamp: '2024-01-10T08:00:00Z',
    status: 'pending',
    relatedId: 'course-2'
  },
  {
    id: '7',
    type: 'task',
    title: 'Bỏ lỡ deadline "Báo cáo tiến độ dự án"',
    description: 'Không thể hoàn thành nhiệm vụ trong thời hạn quy định',
    timestamp: '2024-01-09T23:59:00Z',
    status: 'failed',
    relatedId: 'task-2'
  },
  {
    id: '8',
    type: 'news',
    title: 'Đọc bài viết "Xu hướng công nghệ 2024"',
    description: 'Bạn đã đọc và like bài viết mới nhất của câu lạc bộ',
    timestamp: '2024-01-08T20:30:00Z',
    status: 'completed',
    relatedId: 'news-1'
  }
];

const typeIcons = {
  course: BookOpenIcon,
  event: CalendarIcon,
  task: DocumentTextIcon,
  discussion: ChatBubbleLeftRightIcon,
  news: DocumentTextIcon,
  achievement: AcademicCapIcon
};

const typeLabels = {
  course: 'Khóa học',
  event: 'Sự kiện',
  task: 'Nhiệm vụ',
  discussion: 'Thảo luận',
  news: 'Bản tin',
  achievement: 'Thành tích'
};

const statusIcons = {
  completed: CheckCircleIcon,
  pending: PendingIcon,
  failed: XCircleIcon
};

const statusColors = {
  completed: 'text-green-600',
  pending: 'text-yellow-600',
  failed: 'text-red-600'
};

const statusLabels = {
  completed: 'Hoàn thành',
  pending: 'Đang thực hiện',
  failed: 'Thất bại'
};

function formatTimeAgo(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Vừa xong';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} phút trước`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} giờ trước`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ngày trước`;
  }
}

export default function ActivityPage() {
  const [filter, setFilter] = useState<'all' | Activity['type']>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | Activity['status']>('all');

  const filteredActivities = mockActivities.filter((activity) => {
    const typeMatch = filter === 'all' || activity.type === filter;
    const statusMatch = statusFilter === 'all' || activity.status === statusFilter;
    return typeMatch && statusMatch;
  });

  const stats = {
    total: mockActivities.length,
    completed: mockActivities.filter(a => a.status === 'completed').length,
    pending: mockActivities.filter(a => a.status === 'pending').length,
    thisWeek: mockActivities.filter(a => {
      const activityDate = new Date(a.timestamp);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return activityDate >= weekAgo;
    }).length
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Link href="/profile" className="hover:text-primary">
            Hồ sơ
          </Link>
          <span>/</span>
          <span className="text-gray-900">Hoạt động</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Hoạt động của bạn</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <ClockIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tổng hoạt động</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Hoàn thành</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <PendingIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Đang thực hiện</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <CalendarIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tuần này</p>
                <p className="text-2xl font-bold text-gray-900">{stats.thisWeek}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm border mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loại hoạt động
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            >
              <option value="all">Tất cả</option>
              <option value="course">Khóa học</option>
              <option value="event">Sự kiện</option>
              <option value="task">Nhiệm vụ</option>
              <option value="discussion">Thảo luận</option>
              <option value="news">Bản tin</option>
              <option value="achievement">Thành tích</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trạng thái
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            >
              <option value="all">Tất cả</option>
              <option value="completed">Hoàn thành</option>
              <option value="pending">Đang thực hiện</option>
              <option value="failed">Thất bại</option>
            </select>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Lịch sử hoạt động ({filteredActivities.length})
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredActivities.map((activity) => {
            const TypeIcon = typeIcons[activity.type];
            const StatusIcon = activity.status ? statusIcons[activity.status] : null;

            return (
              <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <TypeIcon className="h-5 w-5 text-gray-600" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900 mb-1">
                          {activity.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {activity.description}
                        </p>

                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                            {typeLabels[activity.type]}
                          </span>
                          <span>{formatTimeAgo(activity.timestamp)}</span>

                          {activity.metadata && (
                            <div className="flex items-center gap-2">
                              {activity.metadata.score && (
                                <span className="text-green-600 font-medium">
                                  Điểm: {activity.metadata.score}
                                </span>
                              )}
                              {activity.metadata.duration && (
                                <span>Thời gian: {activity.metadata.duration}</span>
                              )}
                              {activity.metadata.grade && (
                                <span className="text-blue-600 font-medium">
                                  Điểm: {activity.metadata.grade}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {activity.status && StatusIcon && (
                        <div className="flex items-center gap-1 ml-4">
                          <StatusIcon className={`h-4 w-4 ${statusColors[activity.status]}`} />
                          <span className={`text-xs font-medium ${statusColors[activity.status]}`}>
                            {statusLabels[activity.status]}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredActivities.length === 0 && (
            <div className="p-12 text-center">
              <ClockIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Không có hoạt động nào phù hợp với bộ lọc</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
