import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingPage() {
  return (
    <div>
      {/* Filtres actifs skeleton */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-32 rounded-full" />
        <Skeleton className="h-6 w-28 rounded-full" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="overflow-hidden border rounded-lg">
            <Skeleton className="h-48 w-full" />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <div className="flex gap-1 mb-4">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-8 w-20 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex items-center justify-between mt-8">
        <Skeleton className="h-9 w-24 rounded" />
        <div className="flex items-center gap-1">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
        <Skeleton className="h-9 w-24 rounded" />
      </div>
    </div>
  )
}
