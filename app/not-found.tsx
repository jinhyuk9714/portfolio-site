import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative z-10 flex-1 px-6 py-24 flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-2xl font-bold text-ink-primary">페이지를 찾을 수 없습니다</h1>
      <Link
        href="/"
        className="mt-6 text-sm font-medium text-accent hover:text-accent-muted transition-colors"
      >
        홈으로
      </Link>
    </main>
  );
}
