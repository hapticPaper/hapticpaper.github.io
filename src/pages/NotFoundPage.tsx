import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white/60 p-8 text-zinc-900 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/30 dark:text-zinc-100">
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">The page you’re looking for doesn’t exist.</p>
      <div className="mt-6">
        <Link
          to="/"
          className="inline-flex rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900/50"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
