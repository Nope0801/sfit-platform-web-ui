import Header from "@/components/Header";
import MyCoursesList from "@/components/MyCoursesList";

export default function MyCoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <MyCoursesList />
      </main>
    </div>
  );
}
