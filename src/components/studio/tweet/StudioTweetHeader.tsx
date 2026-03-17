export default function StudioTweetHeader() {
  return (
    <div className="hidden md:grid md:grid-cols-[2fr_1fr_1fr_0.5fr] items-center text-sm font-medium text-neutral-400 border-b border-neutral-800 pb-3">
      <span>Tweet</span>
      <span>Likes</span>
      <span>Date uploaded</span>
      <span className="text-right">Actions</span>
    </div>
  )
}
