import { Skeleton } from "@/components/ui/skeleton";

export default function CVLoading() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-black/5 bg-background">
        <div className="mx-auto flex h-[80px] max-w-[1400px] items-center justify-between px-5 md:px-10">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-9 w-24" />
        </div>
      </header>

      <main className="mx-auto max-w-[900px] px-5 md:px-10 py-12">
        <div className="mb-10">
          <Skeleton className="h-10 w-48 mb-3" />
          <Skeleton className="h-6 w-80" />
        </div>

        {/* Progress bar skeleton */}
        <div className="mb-8">
          <div className="hidden sm:flex justify-between mb-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-3 w-20" />
            ))}
          </div>
          <Skeleton className="h-1 w-full" />
        </div>

        {/* Form fields skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-7 w-52 mb-4" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-18" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>

        {/* Navigation skeleton */}
        <div className="flex justify-between pt-8 mt-8 border-t border-border">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </main>
    </div>
  );
}
