export default function VideoPlayer() {
  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden bg-black">
      <iframe
        className="w-full h-full"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Video Player"
        allowFullScreen
      />
    </div>
  )
}
