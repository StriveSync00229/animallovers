import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="pb-16">
      {/* Hero Skeleton */}
      <section className="relative py-20 bg-gradient-to-b from-rose-50 to-white">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <div className="max-w-2xl mb-10 md:mb-0">
              <Skeleton className="w-3/4 h-12 mb-4" />
              <Skeleton className="w-full h-24" />
              <div className="flex mt-6 space-x-4">
                <Skeleton className="w-32 h-10" />
                <Skeleton className="w-32 h-10" />
              </div>
            </div>
            <Skeleton className="w-full h-64 md:w-1/3 rounded-lg" />
          </div>
        </div>
      </section>

      {/* Filters Skeleton */}
      <section className="py-8">
        <div className="container px-4 mx-auto">
          <Skeleton className="w-full h-16 mb-8 rounded-lg" />

          {/* Products Grid Skeleton */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="overflow-hidden bg-white border border-gray-200 rounded-lg">
                  <Skeleton className="w-full h-48" />
                  <div className="p-4">
                    <Skeleton className="w-1/3 h-4 mb-2" />
                    <Skeleton className="w-full h-6 mb-4" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="w-20 h-6" />
                      <Skeleton className="w-20 h-8" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Advantages Skeleton */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <Skeleton className="w-1/3 h-10 mx-auto mb-8" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="p-6 bg-white rounded-lg">
                  <Skeleton className="w-12 h-12 mb-4 rounded-full" />
                  <Skeleton className="w-3/4 h-6 mb-2" />
                  <Skeleton className="w-full h-24" />
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Expert Advice Skeleton */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <Skeleton className="w-1/3 h-10 mx-auto mb-8" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Skeleton className="w-full h-96 rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="w-3/4 h-8" />
              <Skeleton className="w-full h-32" />
              <Skeleton className="w-full h-32" />
              <Skeleton className="w-32 h-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Skeleton */}
      <section className="py-12 bg-rose-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl p-8 mx-auto bg-white rounded-lg">
            <Skeleton className="w-2/3 h-8 mx-auto mb-4" />
            <Skeleton className="w-full h-16 mb-6 mx-auto" />
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              <Skeleton className="flex-grow h-12" />
              <Skeleton className="w-32 h-12" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
