'use client';

import { useParams } from 'next/navigation';
import CourseLearningPage from '@/components/CourseLearningPage';

export default function CourseLearning() {
  const { id, lessonId } = useParams();

  const courseId = Array.isArray(id) ? id[0] : id ?? '';
  const currentLessonId = Array.isArray(lessonId) ? lessonId[0] : lessonId ?? '';

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <CourseLearningPage courseId={courseId} lessonId={currentLessonId} />
      </main>
    </div>
  );
}