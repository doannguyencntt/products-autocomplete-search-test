export const SkeletonCard = () => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 w-full max-w-sm mx-auto">
      <div className="animate-pulse">
        <div className="h-40 bg-gray-300 rounded mb-4"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  )
}