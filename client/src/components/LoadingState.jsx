function LoadingState() {
  return (
    <div className="min-w-[700px] bg-white">
      <div className="grid grid-cols-[minmax(260px,1fr)_132px_94px_72px] gap-3 border-b border-gray-100 px-5 py-3">
        <div className="h-2 w-12 animate-pulse rounded bg-gray-200" />
        <div className="h-2 w-10 animate-pulse rounded bg-gray-200" />
        <div className="h-2 w-8 animate-pulse rounded bg-gray-200" />
        <div className="h-2 w-10 animate-pulse rounded bg-gray-200" />
      </div>
      {[1, 2, 3, 4].map((row) => (
        <div
          key={row}
          className="grid min-h-[44px] grid-cols-[minmax(260px,1fr)_132px_94px_72px] items-center gap-3 border-b border-gray-100 px-5 py-2"
        >
          <div className="space-y-1.5">
            <div className="h-2 w-8 animate-pulse rounded bg-gray-200" />
            <div className="h-2 w-40 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="h-4 w-16 animate-pulse rounded-full bg-gray-200" />
          <div className="h-4 w-12 animate-pulse rounded-full bg-gray-200" />
          <div className="h-6 w-6 animate-pulse rounded-md bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

export default LoadingState;
