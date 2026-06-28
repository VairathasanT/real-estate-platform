export default function PropertyCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-[0_8px_24px_-12px_rgba(15,23,42,0.3)]">
      {/* Image Skeleton */}
      <div className="relative h-40 w-full animate-pulse bg-slate-200" />

      {/* Content Skeleton */}
      <div className="p-4">
        {/* Location skeleton */}
        <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />

        {/* Title skeleton */}
        <div className="mt-1.5 space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
        </div>

        {/* Details skeleton */}
        <div className="mt-3 flex gap-3">
          <div className="h-6 w-20 animate-pulse rounded bg-slate-200" />
          <div className="h-6 w-24 animate-pulse rounded bg-slate-200" />
        </div>

        {/* Footer skeleton */}
        <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
          <div className="space-y-1">
            <div className="h-3 w-12 animate-pulse rounded bg-slate-200" />
            <div className="h-5 w-20 animate-pulse rounded bg-slate-200" />
          </div>
          <div className="h-8 w-16 animate-pulse rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
