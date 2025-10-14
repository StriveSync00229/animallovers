import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero skeleton */}
      <div className="w-full h-[300px] rounded-lg mb-8">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Filters skeleton */}
      <div className="w-full h-16 rounded-lg mb-8">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Products grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {Array(8)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="flex flex-col space-y-3">
              <Skeleton className="w-full h-[200px] rounded-lg" />
              <Skeleton className="w-3/4 h-6 rounded-md" />
              <Skeleton className="w-1/2 h-4 rounded-md" />
              <Skeleton className="w-1/4 h-6 rounded-md" />
            </div>
          ))}
      </div>

      {/* Nutrition guide skeleton */}
      <div className="w-full h-[400px] rounded-lg mb-8">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Expert advice skeleton */}
      <div className="w-full h-[300px] rounded-lg mb-8">
        <Skeleton className="w-full h-full" />
      </div>
    </div>
  )
}
