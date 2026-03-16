export default function StudioPlaylistVideosTableHeader() {
  return (
    <div className="hidden md:grid md:grid-cols-[3fr_1fr_1fr_0.5fr] items-center text-sm font-medium text-neutral-400 border-b border-neutral-800 pb-3">
      <span>Video</span>
      <span>Views</span>
      <span>Date uploaded</span>
      <span className="text-right">Actions</span>
    </div>
  )
}
