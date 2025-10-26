'use client';

import { useState } from 'react';
import {
  BellIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  FunnelIcon,
  EyeIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

// Sample notifications data
const notifications = [
  {
    id: 1,
    title: 'Thông báo hạn nộp bài tập React.js',
    message: 'Bài tập tuần 3 của khóa học "React.js từ cơ bản đến nâng cao" sẽ hết hạn vào 23:59 ngày 20/01/2025. Vui lòng hoàn thành và nộp bài đúng hạn.',
    type: 'warning',
    category: 'Học tập',
    timestamp: '2025-01-15T10:30:00Z',
    isRead: false,
    isImportant: true,
    actionRequired: true,
    relatedLink: '/courses/1/assignments/3',
    sender: 'Hệ thống khóa học'
  },
  {
    id: 2,
    title: 'Kết quả cuộc thi thiết kế Logo đã có!',
    message: 'Chúc mừng bạn! Bài dự thi logo của bạn đã được chọn vào top 10. Hãy xem kết quả chi tiết và nhận phần thưởng.',
    type: 'success',
    category: 'Cuộc thi',
    timestamp: '2025-01-14T16:45:00Z',
    isRead: false,
    isImportant: true,
    actionRequired: false,
    relatedLink: '/contests/logo-design/results',
    sender: 'Ban tổ chức cuộc thi'
  },
  {
    id: 3,
    title: 'Lịch họp CLB thay đổi',
    message: 'Cuộc họp CLB tuần này được chuyển từ thứ 5 sang thứ 6 (17/01) lúc 19:00 tại phòng 401. Vui lòng sắp xếp thời gian tham dự.',
    type: 'info',
    category: 'Họp CLB',
    timestamp: '2025-01-13T14:20:00Z',
    isRead: true,
    isImportant: false,
    actionRequired: false,
    relatedLink: null,
    sender: 'Ban chủ nhiệm CLB'
  },
  {
    id: 4,
    title: 'Hackathon Weekend - Đăng ký mở!',
    message: 'Cuộc thi Hackathon 48h với chủ đề "Green Technology" đã mở đăng ký. Hạn chót: 20/02/2025. Giải thưởng lên đến 10 triệu đồng!',
    type: 'info',
    category: 'Sự kiện',
    timestamp: '2025-01-12T09:15:00Z',
    isRead: true,
    isImportant: true,
    actionRequired: true,
    relatedLink: '/events/hackathon-2025',
    sender: 'Ban tổ chức sự kiện'
  },
  {
    id: 5,
    title: 'Cập nhật điểm danh Workshop AI',
    message: 'Bạn đã được ghi nhận tham dự đầy đủ workshop "AI và Machine Learning cho người mới bắt đầu". Chứng chỉ hoàn thành đã được cấp.',
    type: 'success',
    category: 'Workshop',
    timestamp: '2025-01-11T17:30:00Z',
    isRead: true,
    isImportant: false,
    actionRequired: false,
    relatedLink: '/certificates/ai-workshop-2025',
    sender: 'Hệ thống workshop'
  },
  {
    id: 6,
    title: 'Nhắc nhở: Đóng phí thành viên',
    message: 'Phí thành viên CLB cho kỳ này (100,000 VNĐ) sẽ hết hạn vào 25/01/2025. Vui lòng thanh toán để duy trì quyền lợi thành viên.',
    type: 'warning',
    category: 'Tài chính',
    timestamp: '2025-01-10T08:00:00Z',
    isRead: false,
    isImportant: true,
    actionRequired: true,
    relatedLink: '/payments/membership-fee',
    sender: 'Ban tài chính CLB'
  },
  {
    id: 7,
    title: 'Team Building Đà Lạt - Thông tin chi tiết',
    message: 'Thông tin chi tiết về chuyến team building 2N1Đ tại Đà Lạt đã được cập nhật. Vui lòng xem lịch trình và chuẩn bị đồ dùng cần thiết.',
    type: 'info',
    category: 'Team Building',
    timestamp: '2025-01-09T13:45:00Z',
    isRead: true,
    isImportant: false,
    actionRequired: false,
    relatedLink: '/events/team-building-dalat',
    sender: 'Ban tổ chức team building'
  },
  {
    id: 8,
    title: 'Lỗi hệ thống đã được khắc phục',
    message: 'Sự cố đăng nhập vào hệ thống e-learning trong ngày 08/01 đã được khắc phục hoàn toàn. Bạn có thể tiếp tục học bình thường.',
    type: 'success',
    category: 'Hệ thống',
    timestamp: '2025-01-08T20:15:00Z',
    isRead: true,
    isImportant: false,
    actionRequired: false,
    relatedLink: null,
    sender: 'IT Support Team'
  },
  {
    id: 9,
    title: 'Cảnh báo: Deadline submission dự án cuối kỳ',
    message: 'Chỉ còn 3 ngày để nộp dự án cuối kỳ cho khóa "DevOps và Cloud Computing". Hạn chót: 23:59 ngày 18/01/2025.',
    type: 'error',
    category: 'Học tập',
    timestamp: '2025-01-07T11:00:00Z',
    isRead: false,
    isImportant: true,
    actionRequired: true,
    relatedLink: '/courses/devops/final-project',
    sender: 'Hệ thống khóa học'
  },
  {
    id: 10,
    title: 'Mời tham gia Code Review Session',
    message: 'Bạn được mời tham gia buổi Code Review Session vào thứ 3 (21/01) lúc 19:30. Vui lòng chuẩn bị project cần review.',
    type: 'info',
    category: 'Code Review',
    timestamp: '2025-01-06T15:20:00Z',
    isRead: true,
    isImportant: false,
    actionRequired: true,
    relatedLink: '/events/code-review-session',
    sender: 'Technical Team'
  }
];

const categories = ['Tất cả', 'Học tập', 'Sự kiện', 'Workshop', 'Cuộc thi', 'Họp CLB', 'Team Building', 'Tài chính', 'Hệ thống', 'Code Review'];
const types = ['Tất cả', 'info', 'success', 'warning', 'error'];

const typeLabels = {
  info: 'Thông tin',
  success: 'Thành công',
  warning: 'Cảnh báo',
  error: 'Khẩn cấp'
};

const typeIcons = {
  info: InformationCircleIcon,
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  error: XCircleIcon
};

const typeColors = {
  info: 'text-blue-600 bg-blue-50 border-blue-200',
  success: 'text-green-600 bg-green-50 border-green-200',
  warning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  error: 'text-red-600 bg-red-50 border-red-200'
};

function formatTimeAgo(timestamp: string) {
  const now = new Date();
  const time = new Date(timestamp);
  const diffTime = Math.abs(now.getTime() - time.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.ceil(diffTime / (1000 * 60));

  if (diffMinutes < 60) return `${diffMinutes} phút trước`;
  if (diffHours < 24) return `${diffHours} giờ trước`;
  if (diffDays === 1) return 'Hôm qua';
  if (diffDays < 7) return `${diffDays} ngày trước`;

  return time.toLocaleDateString('vi-VN');
}

export default function NotificationsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedType, setSelectedType] = useState('Tất cả');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [showImportantOnly, setShowImportantOnly] = useState(false);
  const [filteredNotifications, setFilteredNotifications] = useState(notifications);

  const handleFilter = () => {
    let filtered = notifications;

    if (selectedCategory !== 'Tất cả') {
      filtered = filtered.filter(notification => notification.category === selectedCategory);
    }

    if (selectedType !== 'Tất cả') {
      filtered = filtered.filter(notification => notification.type === selectedType);
    }

    if (showUnreadOnly) {
      filtered = filtered.filter(notification => !notification.isRead);
    }

    if (showImportantOnly) {
      filtered = filtered.filter(notification => notification.isImportant);
    }

    if (searchTerm) {
      filtered = filtered.filter(notification =>
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredNotifications(filtered);
  };

  useState(() => {
    handleFilter();
  });

  const markAsRead = (id: number) => {
    // In a real app, this would update the database
    console.log(`Marking notification ${id} as read`);
  };

  const markAllAsRead = () => {
    // In a real app, this would update all notifications
    console.log('Marking all notifications as read');
  };

  const deleteNotification = (id: number) => {
    // In a real app, this would delete from database
    console.log(`Deleting notification ${id}`);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <BellIcon className="w-8 h-8 text-[#267452] mr-3" />
              Thông báo
              {unreadCount > 0 && (
                <span className="ml-3 bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </h1>
            <p className="text-gray-600">
              Theo dõi các thông báo mới nhất từ câu lạc bộ và hệ thống
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="btn-secondary text-sm"
            >
              Đánh dấu tất cả đã đọc
            </button>
          )}
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
                  placeholder="Tìm kiếm thông báo..."
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

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loại thông báo
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    setTimeout(handleFilter, 0);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#267452] focus:border-transparent outline-none text-sm"
                >
                  {types.map(type => (
                    <option key={type} value={type}>
                      {type === 'Tất cả' ? 'Tất cả' : typeLabels[type as keyof typeof typeLabels]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick Filters */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showUnreadOnly}
                    onChange={(e) => {
                      setShowUnreadOnly(e.target.checked);
                      setTimeout(handleFilter, 0);
                    }}
                    className="w-4 h-4 text-[#267452] border-gray-300 rounded focus:ring-[#267452]"
                  />
                  <span className="text-sm text-gray-700">Chỉ chưa đọc</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showImportantOnly}
                    onChange={(e) => {
                      setShowImportantOnly(e.target.checked);
                      setTimeout(handleFilter, 0);
                    }}
                    className="w-4 h-4 text-[#267452] border-gray-300 rounded focus:ring-[#267452]"
                  />
                  <span className="text-sm text-gray-700">Chỉ quan trọng</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="lg:col-span-3">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <BellIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Không có thông báo nào
              </h3>
              <p className="text-gray-600">
                {searchTerm || selectedCategory !== 'Tất cả' || selectedType !== 'Tất cả' || showUnreadOnly || showImportantOnly
                  ? 'Thử thay đổi bộ lọc để xem thêm thông báo'
                  : 'Tất cả thông báo đã được xem'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => {
                const IconComponent = typeIcons[notification.type as keyof typeof typeIcons];

                return (
                  <div
                    key={notification.id}
                    className={`card transition-all duration-200 hover:shadow-md border-l-4 ${!notification.isRead ? 'bg-blue-50 border-l-blue-500' : 'border-l-gray-200'
                      }`}
                  >
                    <div className="flex items-start space-x-4">
                      {/* Type Icon */}
                      <div className={`p-2 rounded-lg ${typeColors[notification.type as keyof typeof typeColors]}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <h3 className={`text-lg font-semibold ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </h3>
                            {notification.isImportant && (
                              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                                Quan trọng
                              </span>
                            )}
                            {notification.actionRequired && (
                              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                                Cần hành động
                              </span>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-2">
                            {!notification.isRead && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-gray-400 hover:text-[#267452] p-1"
                                title="Đánh dấu đã đọc"
                              >
                                <EyeIcon className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="text-gray-400 hover:text-red-500 p-1"
                              title="Xóa thông báo"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {notification.message}
                        </p>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <ClockIcon className="w-4 h-4 mr-1" />
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                              {notification.category}
                            </span>
                            <span className="text-gray-500">
                              Từ: {notification.sender}
                            </span>
                          </div>
                        </div>

                        {/* Action Link */}
                        {notification.relatedLink && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <button className="btn-secondary text-sm">
                              Xem chi tiết
                            </button>
                          </div>
                        )}
                      </div>
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
