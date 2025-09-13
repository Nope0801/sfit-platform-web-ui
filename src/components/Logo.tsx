import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-[#267452] rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">SF</span>
      </div>
      <span className="text-xl font-bold text-gray-900">SFIT Club</span>
    </Link>
  );
}
