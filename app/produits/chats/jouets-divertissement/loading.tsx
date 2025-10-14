import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero skeleton */}
      <div className="w-full h-[400px] rounded-lg mb-8">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Filters skeleton */}
      <div className="w-full h-16 rounded-lg mb-8">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Products grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="w-full h-[200px] rounded-lg" />
              <Skeleton className="w-3/4 h-4 rounded" />
              <Skeleton className="w-1/2 h-4 rounded" />
              <Skeleton className="w-1/4 h-4 rounded" />
            </div>
          ))}
      </div>

      {/* Content sections skeleton */}
      <div className="space-y-8 mb-12">
        <Skeleton className="w-full h-[300px] rounded-lg" />
        <Skeleton className="w-full h-[250px] rounded-lg" />
        <Skeleton className="w-full h-[200px] rounded-lg" />
      </div>
    </div>
  )
}
