import { Skeleton } from "@/components/ui/skeleton";

export default function GeneratorLoading() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-black/5 bg-background">
        <div className="mx-auto flex h-[80px] max-w-[1400px] items-center justify-between px-5 md:px-10">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-9 w-24" />
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-5 md:px-10 py-12">
        <div className="mb-10">
          <Skeleton className="h-10 w-64 mb-3" />
          <Skeleton className="h-6 w-96" />
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-3">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-[200px] w-full" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-[120px] w-full" />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-12 w-full" />
          </div>

          <div>
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      </main>
    </div>
  );
}
