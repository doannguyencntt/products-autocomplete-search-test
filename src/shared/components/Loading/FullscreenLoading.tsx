type FullscreenLoadingProps = {
  show?: boolean
  text?: string
}

const FullscreenLoading = ({
  show = true,
  text = 'Loading...',
}: FullscreenLoadingProps) => {
  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white" />
        <p className="text-sm font-medium text-white">{text}</p>
      </div>
    </div>
  )
}

export default FullscreenLoading
