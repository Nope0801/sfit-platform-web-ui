import Header from '@/components/Header';
import CourseDetailPage from '@/components/CourseDetailPage';

export default async function CourseDetail({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <CourseDetailPage courseId={id} />
      </main>
    </div>
  );
}
