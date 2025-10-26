'use client';

import { useState } from 'react';
import {
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

// Sample events data
const events = [
  {
    id: 1,
    title: 'Seminar "Xu hướng công nghệ 2025"',
    description: 'Tham gia seminar để cập nhật những xu hướng mới nhất trong công nghệ thông tin năm 2025. Các chuyên gia từ Google, Microsoft sẽ chia sẻ.',
    date: '2025-02-15',
    time: '19:00',
    endTime: '21:00',
    location: 'Phòng 401, Tòa A',
    organizer: 'CLB Lập trình SFIT',
    category: 'Seminar',
    capacity: 100,
    registered: 67,
    image: '/api/placeholder/400/250',
    status: 'upcoming',
    isRegistered: true,
    tags: ['công nghệ', 'AI', 'blockchain', 'trend'],
    speakers: [
      { name: 'Nguyễn Văn A', title: 'Senior Engineer tại Google' },
      { name: 'Trần Thị B', title: 'AI Researcher tại Microsoft' }
    ],
    agenda: [
      { time: '19:00', topic: 'Khai mạc và giới thiệu' },
      { time: '19:15', topic: 'Xu hướng AI và Machine Learning' },
      { time: '19:45', topic: 'Blockchain và Web3' },
      { time: '20:15', topic: 'Q&A và thảo luận' },
      { time: '20:45', topic: 'Networking và kết thúc' }
    ]
  },
  {
    id: 2,
    title: 'Hackathon Weekend',
    description: 'Cuộc thi lập trình 48 giờ với chủ đề "Green Technology for Future". Các đội thi sẽ phát triển giải pháp công nghệ xanh.',
    date: '2025-02-22',
    time: '08:00',
    endTime: '18:00',
    endDate: '2025-02-23',
    location: 'Lab máy tính, Tầng 3',
    organizer: 'Ban tổ chức SFIT',
    category: 'Cuộc thi',
    capacity: 80,
    registered: 52,
    image: '/api/placeholder/400/250',
    status: 'upcoming',
    isRegistered: false,
    tags: ['hackathon', 'lập trình', 'công nghệ xanh', 'team'],
    prizes: [
      { place: 'Giải nhất', reward: '10,000,000 VNĐ' },
      { place: 'Giải nhì', reward: '5,000,000 VNĐ' },
      { place: 'Giải ba', reward: '2,000,000 VNĐ' }
    ],
    requirements: [
      'Đội thi từ 3-5 người',
      'Ít nhất 1 thành viên có kinh nghiệm frontend',
      'Ít nhất 1 thành viên có kinh nghiệm backend',
      'Laptop cá nhân'
    ]
  },
  {
    id: 3,
    title: 'Team Building CLB',
    description: 'Chuyến team building 2 ngày 1 đêm tại Đà Lạt. Các hoạt động gắn kết, workshop và cắm trại.',
    date: '2025-03-01',
    time: '07:00',
    endTime: '18:00',
    endDate: '2025-03-02',
    location: 'Đà Lạt',
    organizer: 'Ban chủ nhiệm CLB',
    category: 'Team Building',
    capacity: 50,
    registered: 38,
    image: '/api/placeholder/400/250',
    status: 'upcoming',
    isRegistered: true,
    tags: ['team building', 'du lịch', 'gắn kết', 'outdoor'],
    schedule: [
      { day: 'Ngày 1', activities: ['Khởi hành 7:00', 'Tham quan thành phố', 'Workshop teamwork', 'BBQ tối'] },
      { day: 'Ngày 2', activities: ['Cắm trại', 'Games và thử thách', 'Chia sẻ kinh nghiệm', 'Về lại TP.HCM'] }
    ],
    cost: '500,000 VNĐ/người'
  },
  {
    id: 4,
    title: 'Workshop "React Native Development"',
    description: 'Workshop thực hành xây dựng ứng dụng mobile với React Native. Phù hợp cho người đã có kiến thức React cơ bản.',
    date: '2025-02-08',
    time: '14:00',
    endTime: '17:00',
    location: 'Phòng lab 301',
    organizer: 'Nhóm Mobile Development',
    category: 'Workshop',
    capacity: 30,
    registered: 28,
    image: '/api/placeholder/400/250',
    status: 'upcoming',
    isRegistered: false,
    tags: ['react native', 'mobile', 'workshop', 'hands-on'],
    prerequisites: [
      'Kiến thức React cơ bản',
      'JavaScript ES6+',
      'Laptop với Node.js đã cài đặt'
    ],
    outcomes: [
      'Hiểu cơ bản về React Native',
      'Xây dựng được ứng dụng mobile đơn giản',
      'Biết cách debug và test ứng dụng',
      'Hiểu process publish lên App Store/Google Play'
    ]
  },
  {
    id: 5,
    title: 'Meetup "Career Path in Tech"',
    description: 'Gặp gỡ và chia sẻ kinh nghiệm với các alumni đang làm việc tại các công ty công nghệ lớn.',
    date: '2025-01-25',
    time: '18:30',
    endTime: '20:30',
    location: 'Hội trường A',
    organizer: 'Alumni Network',
    category: 'Meetup',
    capacity: 150,
    registered: 89,
    image: '/api/placeholder/400/250',
    status: 'completed',
    isRegistered: true,
    tags: ['career', 'networking', 'alumni', 'experience'],
    speakers: [
      { name: 'Lê Văn C', title: 'Software Engineer tại Facebook', company: 'Meta' },
      { name: 'Phạm Thị D', title: 'Product Manager tại Shopee', company: 'Shopee' },
      { name: 'Hoàng Văn E', title: 'DevOps Engineer tại Grab', company: 'Grab' }
    ]
  },
  {
    id: 6,
    title: 'Code Review Session',
    description: 'Buổi review code cho các dự án cá nhân của thành viên. Nhận feedback từ các senior developers.',
    date: '2025-02-05',
    time: '19:30',
    endTime: '21:30',
    location: 'Online via Zoom',
    organizer: 'Technical Team',
    category: 'Code Review',
    capacity: 20,
    registered: 15,
    image: '/api/placeholder/400/250',
    status: 'upcoming',
    isRegistered: true,
    tags: ['code review', 'mentoring', 'skills', 'online'],
    format: 'Online',
    requirements: [
      'Có dự án cần review (GitHub repo)',
      'Chuẩn bị presentation 10 phút',
      'Cài đặt Zoom trước'
    ]
  }
];

const categories = ['Tất cả', 'Seminar', 'Workshop', 'Cuộc thi', 'Team Building', 'Meetup', 'Code Review'];
const statuses = ['Tất cả', 'upcoming', 'completed', 'cancelled'];

const statusLabels = {
  upcoming: 'Sắp diễn ra',
  completed: 'Đã kết thúc',
  cancelled: 'Đã hủy'
};

const statusColors = {
  upcoming: 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800'
};

function formatDate(dateString: string, timeString?: string) {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  if (timeString) {
    return `${formattedDate} lúc ${timeString}`;
  }
  return formattedDate;
}

export default function EventsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedStatus, setSelectedStatus] = useState('Tất cả');
  const [showRegisteredOnly, setShowRegisteredOnly] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState(events);

  const handleFilter = () => {
    let filtered = events;

    if (selectedCategory !== 'Tất cả') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    if (selectedStatus !== 'Tất cả') {
      filtered = filtered.filter(event => event.status === selectedStatus);
    }

    if (showRegisteredOnly) {
      filtered = filtered.filter(event => event.isRegistered);
    }

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredEvents(filtered);
  };

  useState(() => {
    handleFilter();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <CalendarIcon className="w-8 h-8 text-[#267452] mr-3" />
          Sự kiện câu lạc bộ
        </h1>
        <p className="text-gray-600">
          Tham gia các sự kiện, workshop và cuộc thi để phát triển kỹ năng và kết nối
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm sự kiện..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={handleFilter}
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
              setTimeout(handleFilter, 0);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#267452] focus:border-transparent outline-none"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setTimeout(handleFilter, 0);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#267452] focus:border-transparent outline-none"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'Tất cả' ? 'Tất cả' : statusLabels[status as keyof typeof statusLabels]}
              </option>
            ))}
          </select>

          {/* Registered Only Filter */}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showRegisteredOnly}
              onChange={(e) => {
                setShowRegisteredOnly(e.target.checked);
                setTimeout(handleFilter, 0);
              }}
              className="w-4 h-4 text-[#267452] border-gray-300 rounded focus:ring-[#267452]"
            />
            <span className="text-sm text-gray-700">Chỉ sự kiện đã đăng ký</span>
          </label>
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Không tìm thấy sự kiện nào
          </h3>
          <p className="text-gray-600">
            Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredEvents.map((event) => (
            <div key={event.id} className="card hover:shadow-lg transition-shadow duration-200">
              {/* Event Image */}
              <div className="relative w-full h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-[#267452] to-[#1f5e42] flex items-center justify-center">
                  <CalendarIcon className="w-16 h-16 text-white opacity-50" />
                </div>

                {/* Status Badge */}
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${statusColors[event.status as keyof typeof statusColors]}`}>
                  {statusLabels[event.status as keyof typeof statusLabels]}
                </div>

                {/* Registration Badge */}
                {event.isRegistered && (
                  <div className="absolute top-3 left-3 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium text-[#267452] flex items-center">
                    <CheckCircleIcon className="w-3 h-3 mr-1" />
                    Đã đăng ký
                  </div>
                )}
              </div>

              {/* Event Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    {event.category}
                  </span>
                  {event.capacity && (
                    <span className="text-xs text-gray-500">
                      {event.registered}/{event.capacity} người
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                  {event.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-2 text-[#267452]" />
                    <span>{formatDate(event.date, event.time)}</span>
                  </div>
                  {event.endDate && (
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-2 text-[#267452]" />
                      <span>Kết thúc: {formatDate(event.endDate, event.endTime)}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-2 text-[#267452]" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <UserGroupIcon className="w-4 h-4 mr-2 text-[#267452]" />
                    <span>{event.organizer}</span>
                  </div>
                </div>

                {/* Capacity Warning */}
                {event.capacity && event.registered / event.capacity > 0.9 && event.status === 'upcoming' && (
                  <div className="flex items-center text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                    <ExclamationTriangleIcon className="w-3 h-3 mr-1" />
                    Sắp hết chỗ! Chỉ còn {event.capacity - event.registered} suất
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {event.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                  {event.tags.length > 4 && (
                    <span className="text-xs text-gray-500">+{event.tags.length - 4}</span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-gray-200 flex gap-3">
                  {event.status === 'upcoming' && (
                    <>
                      {event.isRegistered ? (
                        <button className="btn-secondary flex-1">
                          Hủy đăng ký
                        </button>
                      ) : (
                        <button className="btn-primary flex-1">
                          Đăng ký tham gia
                        </button>
                      )}
                    </>
                  )}
                  <button className="btn-secondary">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* My Events Section */}
      {events.some(event => event.isRegistered) && (
        <div className="mt-16">
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircleIcon className="w-6 h-6 text-[#267452] mr-2" />
              Sự kiện đã đăng ký
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events
                .filter(event => event.isRegistered)
                .slice(0, 6)
                .map((event) => (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {event.category}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${statusColors[event.status as keyof typeof statusColors]}`}>
                        {statusLabels[event.status as keyof typeof statusLabels]}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p className="flex items-center">
                        <CalendarIcon className="w-3 h-3 mr-1" />
                        {formatDate(event.date, event.time)}
                      </p>
                      <p className="flex items-center">
                        <MapPinIcon className="w-3 h-3 mr-1" />
                        {event.location}
                      </p>
                    </div>
                    <div className="mt-3">
                      <button className="btn-primary text-xs w-full">
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
