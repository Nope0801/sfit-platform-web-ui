'use client';

import { useState } from 'react';
import {
  NewspaperIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ClockIcon,
  EyeIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';

// Sample news data
const newsArticles = [
  {
    id: 1,
    title: 'Khai mạc cuộc thi lập trình SFIT Code Challenge 2025',
    excerpt: 'Cuộc thi lập trình lớn nhất trong năm của câu lạc bộ chính thức được khởi động với sự tham gia của hơn 200 thí sinh từ các trường đại học trong khu vực...',
    content: 'Nội dung chi tiết về cuộc thi lập trình...',
    author: 'Ban tổ chức SFIT',
    publishedAt: '2025-01-15T10:00:00Z',
    category: 'Cuộc thi',
    image: '/api/placeholder/600/300',
    views: 1250,
    comments: 23,
    tags: ['lập trình', 'cuộc thi', 'sinh viên']
  },
  {
    id: 2,
    title: 'Workshop "AI  bắt đầu"',
    excerpt: 'Thaọc sẽ giúp bạn làm quen với các khái niệm cơ bản trong lĩnh vực trí tuệ nhân tạo...',
    content: 'Nội dung chi tiết về workshop AI...',
    author: 'Thầy Ng',
    publishedAt: '2025-01-14T15:30:00Z',
    category: 'Workshop',
    image: '/api/placeholder/600/300',
    views: 856,
    comments: 15,
    tags: ['AI']
  },
  {
    id: 3,
    title: 'Thông báo lịch nghỉ Tết Nguyên Đán 2025',
    excerpt: 'Câu lạc bộ thông báo lịch nghỉ Tết và các hoạt động trong thời gian này. Tất cả các hoạt động sẽ tạm dừng từ ngày 26/1 đến 2/2/2025...',
    content: 'Nội dung chi tiết về lịch nghỉ Tết...',
    author: 'Ban quản lý CLB',
    publishedAt: '2025-01-13T09:00:00Z',
    category: 'Thông báo',
    image: '/api/placeholder/600/300',
    views: 2100,
    comments: 8,
    tags: ['thông báo', 'nghỉ lễ', 'tết']
  },
  {
    id: 4,
    title: 'Hackathon 48h - Thử thách sáng tạo công nghệ',
    excerpt: 'Sự kiện Hackathon kéo dài 48 giờ với chủ đề "Green Technology for Future". Các đội thi sẽ phát triển giải pháp công nghệ xanh...',
    content: 'Nội dung chi tiết về Hackathon...',
    author: 'CLB Lập trình',
    publishedAt: '2025-01-12T14:20:00Z',
    category: 'Sự kiện',
    image: '/api/placeholder/600/300',
    views: 1890,
    comments: 34,
    tags: ['hackathon', 'công nghệ xanh', 'sáng tạo']
  },
  {
    id: 5,
    title: 'Kết quả cuộc thi thiết kế Logo CLB',
    excerpt: 'Chúc mừng các bạn đã giành giải trong cuộc thi thiết kế Logo mới cho câu lạc bộ. Sau một tháng tổ chức, BTC đã nhận được 89 bài dự thi...',
    content: 'Nội dung chi tiết về kết quả cuộc thi...',
    author: 'Ban sáng tạo',
    publishedAt: '2025-01-11T16:45:00Z',
    category: 'Kết quả',
    image: '/api/placeholder/600/300',
    views: 945,
    comments: 12,
    tags: ['thiết kế', 'logo', 'sáng tạo']
  },
  {
    id: 6,
    title: 'Seminar "Xu hướng phát triển phần mềm 2025"',
    excerpt: 'Tham gia seminar để cập nhật những xu hướng mới nhất trong phát triển phần mềm năm 2025. Các chuyên gia từ các công ty công nghệ hàng đầu sẽ chia sẻ...',
    content: 'Nội dung chi tiết về seminar...',
    author: 'Cô Trần Thị B',
    publishedAt: '2025-01-10T11:15:00Z',
    category: 'Seminar',
    image: '/api/placeholder/600/300',
    views: 1567,
    comments: 28,
    tags: ['seminar', 'phần mềm', 'xu hướng']
  }
];

const categories = ['Tất cả', 'Cuộc thi', 'Workshop', 'Thông báo', 'Sự kiện', 'Seminar', 'Kết quả'];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return 'Hôm qua';
  if (diffDays < 7) return `${diffDays} ngày trước`;
  return date.toLocaleDateString('vi-VN');
}

export default function NewsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [filteredNews, setFilteredNews] = useState(newsArticles);

  // Filter news based on search term and category
  const handleFilter = () => {
    let filtered = newsArticles;

    if (selectedCategory !== 'Tất cả') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredNews(filtered);
  };

  // Apply filters when search term or category changes
  useState(() => {
    handleFilter();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <NewspaperIcon className="w-8 h-8 text-[#267452] mr-3" />
          Bản tin & Góc chia sẻ
        </h1>
        <p className="text-gray-600">
          Cập nhật những tin tức mới nhất về hoạt động và sự kiện của SFIT Club
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm bản tin..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={handleFilter}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#267452] focus:border-transparent outline-none"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <span className="flex items-center text-sm text-gray-600 mr-2">
            <FunnelIcon className="w-4 h-4 mr-1" />
            Danh mục:
          </span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setTimeout(handleFilter, 0);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedCategory === category
                  ? 'bg-[#267452] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <NewspaperIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Không tìm thấy bản tin nào
              </h3>
              <p className="text-gray-600">
                Thử thay đổi từ khóa tìm kiếm hoặc danh mục khác
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredNews.map((article) => (
                <article
                  key={article.id}
                  className={`card hover:shadow-lg transition-shadow duration-200 lg:flex lg:space-x-6`}
                >
                  <>
                      <div className="lg:w-1/2">
                        <div className="w-full h-64 bg-gray-200 rounded-lg mb-4 lg:mb-0 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-[#267452] to-[#1f5e42] flex items-center justify-center">
                            <NewspaperIcon className="w-16 h-16 text-white opacity-50" />
                          </div>
                        </div>
                      </div>
                      <div className="lg:w-1/2">
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-xs bg-[#267452] text-white px-2 py-1 rounded-full">
                            {article.category}
                          </span>
                          <span className="text-xs text-gray-500">Nổi bật</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-[#267452] cursor-pointer">
                          {article.title}
                        </h2>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <span>Bởi {article.author}</span>
                            <span className="flex items-center">
                              <ClockIcon className="w-4 h-4 mr-1" />
                              {formatDate(article.publishedAt)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="flex items-center">
                              <EyeIcon className="w-4 h-4 mr-1" />
                              {article.views}
                            </span>
                            <span className="flex items-center">
                              <ChatBubbleLeftIcon className="w-4 h-4 mr-1" />
                              {article.comments}
                            </span>
                          </div>
                        </div>
                       
                      </div>
                      </>

                  {/* Regular Articles */}
                  {/* {index > 0 && (
                    <>
                      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-[#267452] to-[#1f5e42] flex items-center justify-center">
                          <NewspaperIcon className="w-12 h-12 text-white opacity-50" />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          {article.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-[#267452] cursor-pointer">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span>Bởi {article.author}</span>
                          <span className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {formatDate(article.publishedAt)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center">
                            <EyeIcon className="w-4 h-4 mr-1" />
                            {article.views}
                          </span>
                          <span className="flex items-center">
                            <ChatBubbleLeftIcon className="w-4 h-4 mr-1" />
                            {article.comments}
                          </span>
                        </div>
                      </div>
                  
                    </>
                  )} */}
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Popular Posts */}
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Bài viết phổ biến</h3>
            <div className="space-y-4">
              {newsArticles
                .sort((a, b) => b.views - a.views)
                .slice(0, 5)
                .map((article) => (
                  <div key={article.id} className="flex space-x-3 hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-[#267452] to-[#1f5e42] flex items-center justify-center">
                        <NewspaperIcon className="w-6 h-6 text-white opacity-50" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                        {article.title}
                      </h4>
                      <div className="flex items-center text-xs text-gray-500">
                        <EyeIcon className="w-3 h-3 mr-1" />
                        {article.views} lượt xem
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Categories */}
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Danh mục</h3>
            <div className="space-y-2">
              {categories.slice(1).map((category) => {
                const count = newsArticles.filter(article => article.category === category).length;
                return (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setTimeout(handleFilter, 0);
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 text-left"
                  >
                    <span className="text-gray-700">{category}</span>
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tags Cloud */}
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Thẻ phổ biến</h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(newsArticles.flatMap(article => article.tags)))
                .slice(0, 15)
                .map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full hover:bg-[#267452] hover:text-white cursor-pointer transition-colors duration-200"
                  >
                    #{tag}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
