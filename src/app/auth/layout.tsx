import Header from "@/components/Header";
import Logo from "@/components/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center bg-gray-100">
        <div className="shadow-md border border-gray-300 rounded-xl p-8 w-md">
          <div className="mb-4 flex justify-center">
            <Logo />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
