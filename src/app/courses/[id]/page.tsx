'use client';

import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import CourseDetailPage from '@/components/CourseDetailPage';

export default function CourseDetail() {
  const { id } = useParams();

  // Ensure `id` is a string or provide a fallback
  const courseId = Array.isArray(id) ? id[0] ?? '' : id ?? '';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <CourseDetailPage courseId={courseId} />
      </main>
    </div>
  );
}